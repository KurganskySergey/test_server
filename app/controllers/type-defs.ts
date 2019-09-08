import { gql } from 'apollo-server-express'
import { Client } from './clients/type-defs'

export const typeDefs = gql(Client)
