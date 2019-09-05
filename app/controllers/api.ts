import { Express } from 'express'
import { clientApiConfig } from './clients/api'
// import * as carsApi from './cars/api'
// import * as odersApi from './oders/api'

export const handleApiRequests = (app: Express) => {
    for (const { method, uri, handler } of clientApiConfig) {
        app[method](uri, handler);
    }
}
