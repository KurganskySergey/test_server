import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableColumn,
	TableForeignKey,
} from 'typeorm'

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

		await queryRunner.createTable(
			new Table({
				name: 'car',
				columns: [
					{
						name: 'id',
						type: 'int',
						isGenerated: true,
						isPrimary: true,
					},
					{
						name: 'make',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'model',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'year',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'vin',
						type: 'varchar',
						isNullable: false,
					},
				],
			}),
			true
		)

		await queryRunner.addColumn(
			'car',
			new TableColumn({
				name: 'clientId',
				type: 'int',
			})
		)

		await queryRunner.createForeignKey(
			'car',
			new TableForeignKey({
				columnNames: ['clientId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'client',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			})
		)

		await queryRunner.query('COMMIT')
	}

	async down(queryRunner: QueryRunner): Promise<any> {
		const table: any = await queryRunner.getTable('car')
		const foreignKey = table.foreignKeys.find(
			(fk: any) => fk.columnNames.indexOf('clientId') !== -1
		)
		await queryRunner.dropForeignKey('car', foreignKey)
		await queryRunner.dropColumn('car', 'clientId')
		await queryRunner.dropTable('car')
		await queryRunner.dropTable('client')
	}
}
