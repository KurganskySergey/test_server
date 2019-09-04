import supertest from 'supertest'
import { config } from '../../../../config'

import { createServer } from '../../..'

const userData = {
	first_name: 'Anna',
	last_name: '',
	birthday: Date.now(),
	address: 'Minsk, Belarus',
	phone: '+375291111111',
	email: 'example@example.com',
}

describe('Test users api:', () => {
	test('It should create user', async () => {
		const app = await createServer(config)
		// app.listen(3000, () => {
		// 	console.log('started');
		// });
		const response = supertest(app)
			.post('/users/add')
			.send(userData)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)

		expect(response.statusCode).toBe(200)
	}, 20000)
})
