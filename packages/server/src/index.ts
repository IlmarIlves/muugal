import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeSchema } from 'nexus';
import { loadTypes } from './services/loadTypes';
import { resolve, join } from 'path';
import { createConnection } from 'typeorm';
import axios from 'axios';
import bodyParser from 'body-parser';

const start = async () => {
	// create database connection
	await createConnection().catch((error) => console.log('Error while connecting to the database', error));

	const session = require('express-session');

	// initiate express instance
	const app = express();

	const cors = require('cors')

	var MySQLStore = require('express-mysql-session')(session);

	var options = {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.MYSQL_DB,
	};
	
	var sessionStore = new MySQLStore(options);

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json())

	app.use(bodyParser.json());
	app.use(cors());

	app.use(
		session({
		name: 'muugal_session',
		resave: false, 
		saveUninitialized: false,
		store: sessionStore,
		secret: 'sdasd342klk', 
		cookie: {
			httpOnly: true,
			secure: "true",
		  },
		  
	}))

	// load schema definitions
	const types = await loadTypes([join(__dirname, './schema', '**', '*.ts')]);

	// redirect to graphql
	app.get('/', (req, res, next) => {
		res.json({user: 'CORS enabled'})
		console.log("res");
		console.log(res);
		console.log(req.session.userId);
		// res.redirect('/graphql');
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
		schema,
		context: ({ req, res }) => {
			          res.header(
			              "Access-Control-Allow-Origin",
			              "http://localhost:4000/graphql",
			          );
			          res.header("Access-Control-Allow-Credentials", "true");
			
						return { req, res };
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



