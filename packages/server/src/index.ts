import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeSchema } from 'nexus';
import { loadTypes } from './services/loadTypes';
import { resolve, join } from 'path';
import { createConnection } from 'typeorm';
import session from 'express-session';

const start = async () => {
	// create database connection
	await createConnection().catch((error) => console.log('Error while connecting to the database', error));

	// initiate express instance
	const app = express();

	app.use(
		session({
		secret: 'sdasd342klk', 
		resave: false, 
		saveUninitialized: true,
	}))

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
		schema,
		context: ({req}) => ({req})
	});

	server.applyMiddleware({ app });

	const port = 4000;

	// start server
	app.listen({ port }, () => {
		console.log(`Server ready at http://localhost:${port} ${server.graphqlPath}`);
	});
};

start();
