import { createConnection, getConnection } from 'typeorm'
import { argv } from './../cli'
import ormConfig from '../ormconfig'

const NODE_ENV = process.env.NODE_ENV || argv.NODE_ENV

export const getTypeORMConn = async () => {
	const connectionOptions: any = ormConfig.find(
		({ name }) => name === NODE_ENV
	)
	return getConnection(connectionOptions.name)
}

export const connectDb = async () => {
	// i use process env because of vscode jest plugin.
	// cli.ts evaluates earlier then jest.js can set NODE_ENV
	const connectionOptions = ormConfig.find(({ name }) => name === NODE_ENV)
	const connection = await createConnection(connectionOptions as any)
	await connection.runMigrations({ transaction: false })
	return connection
}
