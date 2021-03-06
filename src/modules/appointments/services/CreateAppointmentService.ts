
// cada service deve ter apenas um método execute
// em síntese o service faz a validação dos dados antes de passar para o repositório

    // instancia a classe AppointmentsRepository
   // public async execute({ date, provider_id }: Request): Promise<Appointment> {
    //  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  // passa o método instanciado como argumento do constructor
  
  // aqui aplica a inversão de dependência criando um constructor para o service e passando a 
  // interface IAppointmentsRepository como typo do repositório. IAppointmentsRepository vai definir os métodos e o tipo dos dados do método create por meio de um DTO
  // a finalidade de tudo isso é tornar service e repositórios independente do typeorm, que pode vir a mudar
   
  
  //  injeção de dependências estudar
  //constructor(private appointmentsRepository: IAppointmentsRepository) {}
  
  import { startOfHour, isBefore, getHours } from 'date-fns';
  import {format} from 'date-fns-tz'
  import { injectable, inject } from 'tsyringe';
  
  import AppError from '@shared/errors/AppError';
  
  
  import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
  import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
  import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
  
  import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
  
  /**
   * [x] Recebimento das informações
   * [x] Tratativa de erros/excessões
   * [x] Acesso ao repositório
   */
  
  /**
   * Dependency Inversion (SOLID)
   */
  
  interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
  }
  
  @injectable()
  class CreateAppointmentService {
    constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppoitmentsRepository,
  
      @inject('NotificationsRepository')
      private notificationsRepository: INotificationsRepository,
  
      @inject('CacheProvider')
      private cacheProvider: ICacheProvider,
    ) {}
  
    public async execute({
      date,
      provider_id,
      user_id,
    }: IRequest): Promise<Appointment> {
      const appointmentDate = startOfHour(date);
  
      if (isBefore(appointmentDate, Date.now())) {
        throw new AppError("You cant't create an appointment on past date");
      }
  
      if (user_id === provider_id) {
        throw new AppError("You can't create an appointment with yourself");
      }
  
      if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
        throw new AppError(
          'You can only create appointments between 8am and 5pm',
        );
      }
  
      const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
        {
          date: appointmentDate,
          provider_id,
        },
      );
  
      if (findAppointmentInSameDate) {
        throw new AppError('This appointment is already booked');
      }
  
      const appointment = await this.appointmentsRepository.create({
        user_id,
        provider_id,
        date: appointmentDate,
      });
  
      const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
  
      await this.notificationsRepository.create({
        recipient_id: provider_id,
        content: `Novo agendamento para dia ${dateFormated}.`,
      });
  
      await this.cacheProvider.invalidate(
        `provider-appointments:${provider_id}:${format(
          appointmentDate,
          'yyyy-M-d',
        )}`,
      );
  
      return appointment;
    }
  }
  
  export default CreateAppointmentService;