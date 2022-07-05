import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeSchema } from 'nexus';
import { loadTypes } from './services/loadTypes';
import { resolve, join } from 'path';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { UserEntity } from './entities/UserEntity';
import { createAccessToken, createRefreshToken } from './services/auth';
import { sendRefreshToken } from './services/sendRefreshToken';
import { graphqlUploadExpress } from 'graphql-upload';

const start = async () => {
	// create database connection

	const session = require('express-session');

	// initiate express instance
	const app = express();

	const cors = require('cors')

	app.use(cors({origin: 'http://localhost:3000', credentials: true}))
	
	var MySQLStore = require('express-mysql-session')(session);

	var options = {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.MYSQL_DB,
		maxQueryExecutionTime: 1000,

	};
	
	var sessionStore = new MySQLStore(options);


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

	app.use(cookieParser());
	
	app.use(graphqlUploadExpress({ maxFileSize: 50000, maxFiles: 2 }));

	app.use(function(req, res, next){
    res.setTimeout(480000, function(){ // 4 minute timeout adjust for larger uploads
        console.log('Request has timed out.');
            res.send(408);
        });

    next();
});
	
	app.get("/", (_req, res) => res.send("hello"));

	app.post('/refresh_token', async (req, res) => {
		const token = req.cookies.jid;

		if(!token) {
			return res.send({ok: false, accessToken: ''})
		}

		let payload: any = null ;
		try {
			payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
		} catch (error) {
			console.log(error);
			return res.send({ok: false, accessToken: ''})
		}

		const user = await UserEntity.findOne({id: payload.userId})

		if(!user) {
			return res.send({ ok: false, accessToken: ''});
		}

		if(user.tokenVersion !== payload.tokenVersion) {
			return res.send({ok: false, accessToken: ''})
		}

		//login successful
		sendRefreshToken(res, createRefreshToken(user))

		return res.send({ok: true, accessToken: createAccessToken(user)})
	});

	await createConnection().catch((error) => console.log('Error while connecting to the database', error));

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
		uploads: false,
		context: ({ req, res }) => {
			return { req, res };
		}
	});

	server.applyMiddleware({ app, cors: false });

	const port = 4000;

	// start server
	app.listen({ port }, () => {
		console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
	}).setTimeout(5 * 60 * 1000);

};

start();



