import {
	Entity,
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	// OneToMany,
	// JoinColumn,
} from 'typeorm'
// import { Car } from '../cars'

@Entity('client')
export class Client extends BaseEntity {
	@PrimaryGeneratedColumn()
	public id: number

	@Column({
		type: 'varchar',
	})
	public first_name: string

	@Column({
		type: 'varchar',
	})
	public last_name: string

	@Column({
		type: 'integer',
	})
	public birthday: number

	@Column({
		type: 'varchar',
	})
	public address: string

	@Column({
		type: 'varchar',
	})
	public phone: string

	@Column({
		type: 'varchar',
	})
	public email: string
}

	// @OneToMany(type => Car, car => car.owner)
	// cars: Car[];