import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class initDb1567454157960 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query('BEGIN TRANSACTION')
		await queryRunner.createTable(
			new Table({
				name: 'client',
				columns: [
					{
						name: 'id',
						type: 'int',
						isGenerated: true,
						isPrimary: true,
					},
					{
						name: 'first_name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'last_name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'birthday',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'address',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'phone',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'updated_at',
						type: 'int',
						isNullable: false,
					},
				],
			}),
			true
		)
		await queryRunner.query('COMMIT')
	}

	async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropTable('client')
	}
}
