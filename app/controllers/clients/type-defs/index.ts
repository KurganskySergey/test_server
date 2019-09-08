import { readFileSync } from 'fs-extra'
import { resolve } from 'path'

const clientGraph = resolve(__dirname, './client.graphql')

export const Client = readFileSync(clientGraph, 'utf-8')
