import 'reflect-metadata'
import express, { Express, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { config } from '../config'
import { handleApiRequests } from './controllers/api'
import { connectDb } from './db'
import { NextFunction } from 'connect'

export const createServer = async (cfg: typeof config) => {
	const app = init()
	await connectDb()
	handleAPI(app, cfg)
	handleError(app)
	app.get('/', (req, res) => res.send('Hello World!'))
	return app
}

export const init = () => {
	const app = express()
	app.use(bodyParser.json())
	return app
}

const handleAPI = (app: Express, cfg: typeof config) => {
	handleApiRequests(app)
}

const handleError = (app: Express) => {
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		// log it
		console.error(err.stack)

		// error page
		res.status(500).render('5xx')
	})
}
