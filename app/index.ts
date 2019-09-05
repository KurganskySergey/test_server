import 'reflect-metadata'
import * as bodyParser from 'body-parser'
import express, { Express, NextFunction, Request, Response } from 'express'
import { config } from '../config'
import { handleApiRequests } from './controllers/api'
import { connectDb } from './db'

export const createServer = async (cfg: typeof config) => {
	await connectDb()
	await new Promise(res => setTimeout(res, 2000))
	const app = init()
	handleAPI(app)
	handleError(app)
	app.get('/', (req, res) => res.send('Hello World!'))
	return app
}

export const init = () => {
	const app = express()
	app.use(bodyParser.json())
	return app
}

const handleAPI = (app: Express) => {
	handleApiRequests(app)
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
