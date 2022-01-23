import { Connection } from 'typeorm';

import createDatabaseConnection from '../src/services/createDatabaseConnection';

let connection: Connection;

(async () => {
	connection = await createDatabaseConnection();

	const migrations = await connection.runMigrations();

	console.log(connection.showMigrations);

	// await connection.close();
})()
	.then(async () => {
		console.log('DONE');
		await connection.close();
		process.exit(0);
	})
	.catch(async err => {
		console.error(err);
		await connection.close();
		process.exit(1);
	});
