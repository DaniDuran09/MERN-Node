import { Server } from './presentation/server';
import {LogModel, MongoDatabase} from "./data/mongo";
import {envs} from "./config/plugins/envs.plugin";
import {PrismaClient} from "@prisma/client";


(async() => {
  await main();
})();


async function main() {

  await MongoDatabase.conect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })
  //
  // const newLog = await LogModel.create({
  //   message: 'Test message desde mongo',
  //   origin: 'App.ts',
  //   level: 'low'
  // });
  //
  // await newLog.save();
  //
  // console.log(newLog);

  const prisma = new PrismaClient({
  });
  const newLog = await prisma.logModel.create({
    data:{
      level:'HIGH',
      message: 'test message',
      origin: 'App.ts'
    }
  });

  console.log(newLog);


  //Server.start();
}


