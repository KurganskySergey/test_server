import { Request, Response, NextFunction } from 'express'

export type ApiMethod = 'get' | 'post' | 'put' | 'delete'
export type uriType = string
export type apiHandler = (
	req: Request,
	res: Response,
	next?: NextFunction
) => void

export interface IApiConfig {
	method: ApiMethod
	uri: uriType
	handler: apiHandler
}
