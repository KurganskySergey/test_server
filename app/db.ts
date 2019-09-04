import { createConnection, getConnection, getConnectionOptions } from 'typeorm'
import { argv } from './../cli'

export const getTypeORMConn = async () => {
	const connectionOptions = await getConnectionOptions(argv.NODE_ENV)
	return getConnection(connectionOptions.name)
}

export const createTypeORMConn = async () => {
	const connectionOptions = await getConnectionOptions(argv.NODE_ENV)
	return createConnection(
		connectionOptions
	)
}

export const connectDb = async () => {
	const connection = await createTypeORMConn()

	console.log(`database is${!connection.isConnected ? ' not' : ''} connected
connectionName is ${connection.name}`)
}
