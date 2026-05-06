import mongoose from 'mongoose';

interface ConectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async conect( options : ConectionOptions){
        const { mongoUrl, dbName } = options;
        try {

            await mongoose.connect(mongoUrl,{
                dbName: dbName,
            });

            console.log( 'MongoDB Connected!' );

        }catch (e){
            console.log("Mongo conection error");
            throw e;
        }
    }
}