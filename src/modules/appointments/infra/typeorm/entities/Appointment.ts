// DTO mode de transferência de dados por meio de objeto.
// passou os argumentos em chaves para poder desestruturar usou Omit para poder omitir um dado, no caso o id
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')

class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column()
  // prestador do serviço
  provider_id: string;
  // muitos appointments poderão ter apenas um provider ("User")
  @ManyToOne(() => User)

  // nome da chave estrangeira (provider_id) coluna na classe appointmentes que deverá fazer o match
  // com a coluna id da tabela de usuários(User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
}

export default Appointment;