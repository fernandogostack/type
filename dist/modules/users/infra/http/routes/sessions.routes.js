"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _SessionsController = _interopRequireDefault(require("../controllers/SessionsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { container } from 'tsyringe';
//import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// comentado injeção import UsersRepository from '../../typeorm/repositories/UsersRepository';
const sessionsRouter = (0, _express.Router)();
const sessionsController = new _SessionsController.default();
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

sessionsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), sessionsController.create);
var _default = sessionsRouter;
exports.default = _default;