import { IApiConfig, ApiMethod, uriType, apiHandler } from '../types'
import { Request, Response } from 'express'

import { saveUser } from './api-actions'

const createApiHandler = (
	method: ApiMethod,
	uri: uriType,
	handler: apiHandler
) => ({ method, uri, handler })

export const userApiConfig: IApiConfig[] = [
	createApiHandler('get', '/users', (req: Request, res: Response) => {
		// here we will have logic to return all users
	}),

	createApiHandler('get', '/users/:id', (req: Request, res: Response) => {
		// here we will have logic to return all users
	}),

	createApiHandler(
		'post',
		'/users/add',
		async (req: Request, res: Response) => {
			const user = await saveUser(req.body)
			res.send(user)
		}
	),

	createApiHandler(
		'put',
		'/users/:id',
		async (req: Request, res: Response) => {
			const user = await saveUser(req.body)
			res.send(user)
		}
	),

	createApiHandler('delete', '/users/:id', (req: Request, res: Response) => {
		// here we will have logic to return all users
	}),
]
