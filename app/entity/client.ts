import {
	BaseEntity,
	Column,
	Entity,
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

	@Column({
		type: 'int',
	})
	public created_at: number

	@Column({
		type: 'int',
	})
	public updated_at: number
}

	// @OneToMany(type => Car, car => car.owner)
	// cars: Car[];