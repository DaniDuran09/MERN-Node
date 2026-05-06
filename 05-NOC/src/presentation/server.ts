import {FileSystemDatasource} from '../infrastructure/datasources/file-system.datasource';
import {LogRepositoryImpl} from '../infrastructure/repositories/log.repository.impl';
import {EmailService} from './email/email.service';
import {LogSeverityLevel} from "../domain/entities/log.entity";
import {MongoLogDatasource} from "../infrastructure/datasources/mongo-log.datasource";


const logRepository = new LogRepositoryImpl(
  //new FileSystemDatasource(),
  new MongoLogDatasource(),
);
const emailService = new EmailService();


export class Server {

  public static async start() {

    console.log( 'Server started...' );

    //todo: Mandar email

    // new SendEmailLogs(
    //   emailService, 
    //   fileSystemLogRepository,
    // ).execute(
    //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
    // )
    // emailService.sendEmailWithFileSystemLogs(
    //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
    // );

    const logs = await logRepository.getLogs(LogSeverityLevel.low);
    console.log( logs );

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       logRepository,
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
    //
    //   }
    // );
  }
}


