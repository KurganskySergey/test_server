import supertest, { SuperTest, Test } from 'supertest'
import { config } from '../../../../config'

import { createServer } from '../../..'

describe('Clients api:', () => {
	let app: SuperTest<Test>

	describe('GET Hello World', () => {
		test('should return Hello World!', async () => {
			return app.get('/').expect(200, 'Hello World!')
		})
	})

	describe('POST /clients/add', () => {
		beforeEach(async done => {
			try {
				app = await createServer(config)
				app = supertest(app)
				done()
			} catch (e) {
				console.error(e)
				debugger
				done(e)
			}
		})
		const userData = {
			first_name: 'Anna',
			last_name: '',
			birthday: Date.now(),
			address: 'Minsk, Belarus',
			phone: '+375291111111',
			email: 'example@example.com',
		}
		test('should create client', async () => {
			const response = await app
				.post('/clients/add')
				.send(userData)
				.set('Accept', 'application/json')

			debugger

			expect(response.statusCode).toBe(200)
		}, 20000)
	})
})
