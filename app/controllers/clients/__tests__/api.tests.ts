import supertest, { SuperTest, Test } from 'supertest'
import { config } from '../../../../config'

import { createServer } from '../../..'
import { getTypeORMConn } from '../../../db'

describe('Clients api:', () => {
	let app: SuperTest<Test>
	beforeEach(async done => {
		app = supertest(await createServer(config))
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
		// const userData = {
		// 	first_name: 'Anna',
		// 	last_name: '',
		// 	birthday: Date.now(),
		// 	address: 'Minsk, Belarus',
		// 	phone: '+375291111111',
		// 	email: 'example@example.com',
		// }
		test('should create client', async () => {
			const response = await app
				.post('/graphql')
				.send({
					query: `
					query {
						hello
					}
					`,
					variables: {},
				})
				.set('Accept', 'application/graphql')

			debugger

			expect(response.body.data).toEqual({ hello: 'Hello world!' })
		})
	})
})
