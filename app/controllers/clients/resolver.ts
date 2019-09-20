import { map } from 'lodash'
import { Client } from './../../entity/client'
import { Car } from './../../entity/car'
import { getTypeORMConn } from '../../db'

interface IFetchClientArgs {
	skip: number
	take: number
}

export const resolvers = {
	Query: {
		async clients(_: any, { skip, take }: IFetchClientArgs) {
			Client.useConnection(await getTypeORMConn())
			return (await Client.find({ skip, take })) || []
		},

		async client(_: any, { id }: { id: string }) {
			Client.useConnection(await getTypeORMConn())
			return Client.findOne(id, { relations: ['cars'] })
		},
	},

	Mutation: {
		async saveClient(parent: {}, { clientData }: any) {
			Client.useConnection(await getTypeORMConn())
			clientData.cars = map(clientData.cars, car => new Car(car))
			const savedClient = await Client.save({
				...clientData,
				...(!clientData.id
					? { created_at: Date.now(), updated_at: Date.now() }
					: { updated_at: Date.now() }),
			})

			return {
				success: true,
				message: `Client was ${
					clientData.id ? 'updated' : 'saved'
				} successfully`,
				savedClient,
			}
		},
	},
}
