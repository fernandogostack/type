import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1601476075216
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
                  // tabela que será deletada    // coluna que será deletada
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        // provider_id referencia o id da tabela de usuário
        // o usuário cujo id fizer o match com o provider_id será o prestador do serviço
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}