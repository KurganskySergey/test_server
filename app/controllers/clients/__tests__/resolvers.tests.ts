import { Connection } from 'typeorm'
import { connectDb } from '../../../db'
import { resolvers } from '../resolver'

describe('resolvers api:', () => {
	let db: Connection
	beforeEach(async done => {
		const _DateNow = Date.now
		const mockTStamp = _DateNow()
		Date.now = jest.fn(() => mockTStamp)
		db = await connectDb().catch(done)
		done()
	})

	afterEach(async () => {
		return db.close()
	})

	describe('create client', () => {
		test('should create client', async () => {
			const car = {
				model: 'Polo',
				make: 'VW',
				year: 2017,
				vin: 'A2SG45FG123AAS',
			}
			const car2 = {
				model: 'Passat',
				make: 'VW',
				year: 2019,
				vin: '1A2S12G45FG1323AAS',
			}
			const client = {
				first_name: 'Anna',
				last_name: 'Kurhanskaya',
				birthday: Date.now(),
				address: 'Minsk, Belarus',
				phone: '+375291111111',
				email: 'example@example.com',
				cars: [car, car2],
			}
			const data = await resolvers.Mutation.saveClient(
				{},
				{
					clientData: client,
				}
			)

			expect(data.savedClient).toEqual({
				created_at: Date.now(),
				id: 1,
				updated_at: Date.now(),
				...client,
				cars: [
					{
						created_at: Date.now(),
						id: 1,
						updated_at: Date.now(),
						...car,
					},
					{
						created_at: Date.now(),
						id: 2,
						updated_at: Date.now(),
						...car2,
					},
				],
			})
		})
	})
})
