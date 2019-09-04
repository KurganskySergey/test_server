import { Express } from 'express'
import { userApiConfig } from './users/api'
// import * as carsApi from './cars/api'
// import * as odersApi from './oders/api'

export const handleApiRequests = (app: Express) => {
    for (const { method, uri, handler } of userApiConfig) {
        app[method](uri, handler);
    }
}
