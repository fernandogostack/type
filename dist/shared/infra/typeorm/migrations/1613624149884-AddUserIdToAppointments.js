"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddUserIdToAppointments1613624149884 = void 0;

var _typeorm = require("typeorm");

class AddUserIdToAppointments1613624149884 {
  async up(queryRunner) {
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'user_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');
    await queryRunner.dropColumn('appointments', 'user_id');
  }

}

exports.AddUserIdToAppointments1613624149884 = AddUserIdToAppointments1613624149884;