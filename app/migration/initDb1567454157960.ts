import { MigrationInterface, QueryRunner } from 'typeorm'

export class initDb1567454157960 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query('BEGIN TRANSACTION')
		await queryRunner.query(
			'CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "birthday" integer NOT NULL, "address" varchar NOT NULL, "phone" varchar NOT NULL, email" varchar NOT NULL)'
		)
		await queryRunner.query('COMMIT')
	}

	async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropTable("user");
	}
}
