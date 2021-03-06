"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAppointments1611701092961 = void 0;

var _typeorm = require("typeorm");

class CreateAppointments1611701092961 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'appointments',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        //prestador do serviço
        name: 'provider',
        type: 'varchar'
      }, {
        name: 'date',
        type: 'timestamp with time zone'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('appointments');
  }

}

exports.CreateAppointments1611701092961 = CreateAppointments1611701092961;