import { ApolloServer } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import express, { Express, NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import { config } from '../config'
import { resolvers } from './controllers/resolvers'
import { typeDefs } from './controllers/type-defs'
import { connectDb } from './db'

export const createServer = async (cfg: typeof config) => {
	await connectDb()
	const app = init()
	handleError(app)
	return app
}

export const init = () => {
	const server = new ApolloServer({
		resolvers,
		typeDefs,
		introspection: true,
		playground: true,
	})
	const app = express()
	app.use(bodyParser.json())
	server.applyMiddleware({ app })
	return app
}

const handleError = (app: Express) => {
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		// log it
		debugger
		console.error(err.stack)

		// error page
		res.status(500).render('5xx')
	})
}
