import { IApiConfig, ApiMethod, uriType, apiHandler } from '../types'
import { Request, Response } from 'express'

import { saveClient } from './api-actions'

const createApiHandler = (
	method: ApiMethod,
	uri: uriType,
	handler: apiHandler
) => ({ method, uri, handler })

export const clientApiConfig: IApiConfig[] = [
	createApiHandler('get', '/clients', (req: Request, res: Response) => {
		// here we will have logic to return all users
	}),

	createApiHandler('get', '/clients/:id', (req: Request, res: Response) => {
		// here we will have logic to return all users
	}),

	createApiHandler(
		'post',
		'/clients/add',
		async (req: Request, res: Response) => {
			const user = await saveClient(req.body)
			res.send({
				...user,
				saved: true,
			})
		}
	),

	createApiHandler(
		'put',
		'/users/:id',
		async (req: Request, res: Response) => {
			const user = await saveClient(req.body)
			res.send(user)
		}
	),

	createApiHandler('delete', '/users/:id', (req: Request, res: Response) => {
		// here we will have logic to return all users
	}),
]
