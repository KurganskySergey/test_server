import supertest, { SuperTest, Test } from 'supertest'
import { config } from '../../../../config'

import { createServer } from '../../..'
import { getTypeORMConn } from '../../../db'

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
					variables: { id: 1 },
				})
				.set('Accept', 'application/graphql')

			expect(response.body.data).toEqual({ client: null })
		})

		test('should get empty clients', async () => {
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

			expect(response.body.data).toEqual({ clients: [] })
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
		}
		test('should create client', async () => {
			const response = await app
				.post('/graphql')
				.send({
					query: `
						mutation SaveClient($clientData: ClientInp!) {
							saveClient(clientData: $clientData) {
								success
								message
								savedClient {
									id,
									first_name,
									last_name,
									address,
									email,
									birthday,
									phone
								}
							}
						}
					`,
					variables: {
						clientData,
					},
				})
				.set('Accept', 'application/graphql')

			if (response.body.errors) {
				for (const { message } of response.body.errors) {
					console.error(message)
				}
			}

			expect(response.body.data.saveClient).toEqual({
				success: true,
				message: 'Client was saved successfully',
				savedClient: {
					id: '1',
					...clientData,
				},
			})
		})
	})
})
