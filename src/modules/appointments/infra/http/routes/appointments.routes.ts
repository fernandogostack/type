
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
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

import ensureAuthenticade from '@modules/users/infra/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticade);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;