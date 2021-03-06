import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailprovider';



export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}