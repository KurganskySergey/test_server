import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	// OneToMany,
	// JoinColumn,
} from 'typeorm'
import { Client } from './client'

@Entity('car')
export class Car extends BaseEntity {
	constructor(props: Car = {} as Car) {
		super()
		this.id = props.id
		this.make = props.make
		this.model = props.model
		this.vin = props.vin
		this.year = props.year
		this.created_at = props.id ? props.created_at : Date.now()
		this.updated_at = Date.now()
	}

	@PrimaryGeneratedColumn()
	public id: number

	@Column({
		type: 'varchar',
	})
	public make: string

	@Column({
		type: 'varchar',
	})
	public model: string

	@Column({
		type: 'varchar',
	})
	public vin: string

	@Column({
		type: 'int',
	})
	public year: string

	@Column({
		type: 'int',
	})
	public created_at: number

	@Column({
		type: 'int',
	})
	public updated_at: number

	@ManyToOne(type => Client, client => client.cars)
	public client: Client
}
