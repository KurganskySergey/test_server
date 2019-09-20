import supertest, { SuperTest, Test } from 'supertest'
import { config } from '../../../../config'

import { createServer } from '../../..'
import { getTypeORMConn } from '../../../db'

const requestClient = async (app: any, id?: number) => {
	const response = await app
		.post('/graphql')
		.send({
			query: `
			query GetClient($id: ID!){
				client(id: $id) {
					id,
				}
			}
			`,
			variables: { id },
		})
		.set('Accept', 'application/graphql')

	return response.body.data
}

const getAllClients = async (app: any) => {
	const response = await app
		.post('/graphql')
		.send({
			query: `
					{
						clients {
							id,
						}
					}
					`,
			variables: {},
		})
		.set('Accept', 'application/graphql')

	return response.body.data
}

const saveClient = async (app: any, clientData: any) => {
	const response = await app
		.post('/graphql')
		.send({
			query: `
						mutation SaveClient($clientData: ClientInp!) {
							saveClient(clientData: $clientData) {
								success
								message
								savedClient {
									id
									cars {
										id
									}
								}
							}
						}
					`,
			variables: {
				clientData,
			},
		})
		.set('Accept', 'application/graphql')

	if (response.ok) {
		return response.body.data
	} else {
		throw response.error
	}
}

describe('Clients api:', () => {
	let app: SuperTest<Test>
	beforeEach(async done => {
		app = supertest(await createServer(config).catch(done))
		done()
	})

	afterEach(async () => {
		const db = await getTypeORMConn()
		return db.close()
	})

	describe('Query clients', () => {
		test('should get empty client', async () => {
			const data = await requestClient(app, 1)

			expect(data).toEqual({ client: null })
		})

		test('should get empty clients', async () => {
			const data = await getAllClients(app)

			expect(data).toEqual({ clients: [] })
		})
	})

	describe('Mutaion clients', () => {
		const clientData = {
			first_name: 'Anna',
			last_name: 'Kurhanskaya',
			birthday: Date.now(),
			address: 'Minsk, Belarus',
			phone: '+375291111111',
			email: 'example@example.com',
			cars: [
				{
					model: 'Polo',
					make: 'VW',
					year: 2017,
					vin: 'A2SG45FG123AAS',
				},
			],
		}

		test('should create client', async () => {
			const data = await saveClient(app, clientData)

			expect(data.saveClient).toEqual({
				success: true,
				message: 'Client was saved successfully',
				savedClient: {
					id: '1',
					cars: [{ id: '1' }],
				},
			})

			const { client } = await requestClient(app, 1)

			expect(client).toEqual({ id: '1' })
		})
	})
})
