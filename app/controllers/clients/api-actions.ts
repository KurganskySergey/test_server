import { Client } from '../../entity/client'
import { getTypeORMConn } from '../../db'

export async function saveClient(client: Client) {
	try {
		const c = await getTypeORMConn()
		Client.useConnection(c)
		const cl = await Client.save(client)
		console.log(cl)
		return cl
	} catch (er) {
		debugger
		throw er;
	}
}
