import express from 'express';
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";
import { ApolloServer } from 'apollo-server-express';
import { makeSchema } from 'nexus';
import { buildSchema } from "type-graphql";
import { loadTypes } from './services/loadTypes';
import { resolve, join } from 'path';
import { createConnection } from 'typeorm';
import { AuthResolver } from './resolvers/auth-resolver';

const SQLiteStore = connectSqlite3(session);

const start = async () => {
	// create database connection
	await createConnection().catch((error) => console.log('Error while connecting to the database', error));

	// initiate express instance
	const app = express();

	app.use(
		session({
		  store: new SQLiteStore({
			db: "database.sqlite",
			concurrentDB: true
		  }),
		  name: "qid",
		  secret: process.env.SESSION_SECRET || "aslkdfjoiq12312",
		  resave: false,
		  saveUninitialized: false,
		  cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
		  }
		})
	  );

	// load schema definitions
	const types = await loadTypes([join(__dirname, './schema', '**', '*.ts')]);

	// redirect to graphql
	app.get('/', (_req, res) => {
		res.redirect('/graphql');
	});

	// construct graphql schema
	const schema: any = makeSchema({
		types,
		outputs: {
			schema: resolve(__dirname, './generated/schema.graphql'),
			typegen: resolve(__dirname, './generated/schema-types.d.ts'),
		},

	});

	// initiate graphql server
	const server = new ApolloServer({
		
		schema: await buildSchema({
		  resolvers: [AuthResolver],
		  validate: false
		}),
		context: ({ req, res }) => ({ req, res }),
		playground: {
		  settings: {
			"request.credentials": "include"
		  }
		}
	  });

	server.applyMiddleware({ app });

	const port = 4000;

	// start server
	app.listen({ port }, () => {
		console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
	});
};

start();
