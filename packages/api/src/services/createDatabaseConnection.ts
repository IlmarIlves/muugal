import { createConnection } from 'typeorm';
import { join } from 'path';

import config from '../../config/ormconfig.json';

export default function() {
	return createConnection({
		type: 'mysql',
		host: config.host,
		port: config.port,
		username: config.username,
		password: config.password,
		database: config.database,
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
