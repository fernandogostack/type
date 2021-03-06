"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// verifica se as informações enviadas na rota post satisfazem uma condição;
// satisfeita a condição passa os enviados como argumento para o construtor da classe("model", "entities")
// Instancia antes a classe AppointmentsRepository que por sua vez instancia a classe "model"
//import { parseISO } from 'date-fns';
//import { container } from 'tsyringe';
// foi tirado por causa da injeção de dependência import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
//import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
// instancia o repositório para poder devolver os appointments.
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//  return response.json(appointments);
//});
//appointmentsRouter.post('/', async (request, response) => {
// const { provider_id, date } = request.body;
//  const parsedDate = parseISO(date);
// comentado por causa da injeção de dependência
//const appointmentsRepository = new AppointmentsRepository();
// instancia o service para poder passar as informações de validação para ele.
// const createAppointment = new CreateAppointmentService(
//  appointmentsRepository,
// );
//const createAppointment = container.resolve(CreateAppointmentService);
// const appointment = await createAppointment.execute({
//   date: parsedDate,
//   provider_id,
//  });
// return response.json(appointment);
//});
const appointmentsRouter = (0, _express.Router)();
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmentsRouter.use(_ensureAuthenticated.default);
appointmentsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date().required()
  }
}), appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);
var _default = appointmentsRouter;
exports.default = _default;