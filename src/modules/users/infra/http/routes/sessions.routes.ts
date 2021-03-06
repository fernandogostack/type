import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
//import { container } from 'tsyringe';
//import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';
// comentado injeção import UsersRepository from '../../typeorm/repositories/UsersRepository';
const sessionsRouter = Router();
const sessionsController = new SessionsController();

/*sessionsRouter.post('/', async (request, response) => {
  // injeção const usersRepository = new UsersRepository();

  const { email, password } = request.body;

  // injeção const authenticateUser = new AuthenticateUserService(usersRepository);
  const authenticateUser = container.resolve(AuthenticateUserService);
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ user: userWithoutPassword, token });
});
*/
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);
export default sessionsRouter;