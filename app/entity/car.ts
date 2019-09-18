import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
    ManyToOne,
	// OneToMany,
	// JoinColumn,
} from 'typeorm'
import { Client } from './client';

@Entity('car')
export class Car extends BaseEntity {
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
	public owner: Client;
}
