import { argv } from './cli'
const port = argv.port || 3000

export const config = {
	port,
}
