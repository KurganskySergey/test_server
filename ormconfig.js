const {
	resolve
} = require('path')

module.exports = [{
		name: 'development',
		type: 'sqlite',
		database: './db/db.sqlite',
		logging: ['query', 'schema', 'error'],
		entities: [resolve(__dirname, 'app/entity/**/**{.ts,.js}')],
		migrations: [resolve(__dirname, 'app/migration/**/**{.ts,.js}')],
	},
	{
		name: 'test',
		type: 'sqlite',
		database: ':memory:',
		logging: ['error'],
		dropSchema: true,
		synchronize: true,
		entities: [resolve(__dirname, 'app/entity/**/**{.ts,.js}')],
		migrations: [resolve(__dirname, 'app/migration/**/**{.ts,.js}')],
	},
]