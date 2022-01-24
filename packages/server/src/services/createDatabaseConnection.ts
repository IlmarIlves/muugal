import { createConnection } from 'typeorm';
import { join } from 'path';

import config from '../../config/default';

export default function() {
	return createConnection({
		type: 'mysql',
		host: config.database.host,
		port: config.database.port,
		username: config.database.username,
		password: config.database.password,
		database: config.database.database,
		entities: [join(__dirname, '..', 'entity/**/*.ts')],
		synchronize: false,
		debug: false,
		migrationsTableName: 'migrations-table',
		migrations: [join(__dirname, '..', '..', 'migrations/*.{ts,js}')],
		cli: {
			migrationsDir: 'migrations',
		},
	});
}
