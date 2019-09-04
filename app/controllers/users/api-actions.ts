import { getTypeORMConn } from '../../db'
import { Client } from '../../entity/client'

export async function saveUser(client: Client) {
	const connection = await getTypeORMConn()
	const clientRep = await connection.getRepository(Client)
	return clientRep.save(client)
}
