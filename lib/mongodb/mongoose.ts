import mongoose, { Mongoose } from 'mongoose';
import { handleError } from '../utils';
import dotenv from 'dotenv';

dotenv.config();

const mongodb_uri=process.env.NEXT_MONGODB_URI || 'mongodb+srv://samsonzacharia1973:M3hI4p8SuSuLAc79@youtubesum.qqmgt.mongodb.net/';


interface MongooseConnection{
    conn:Mongoose|null,
    promise:Promise<Mongoose>|null
}

let cached:MongooseConnection=(global as any).mongoose
if(!cached){
    cached=(global as any).mongoose={
        conn:null,
        promise:null
    }
}

export const connecttodatabase=async()=>{
    if(cached.conn) return cached.conn;
    if(!mongodb_uri) return handleError("Error","Missing mongodb_uri");

    cached.promise=mongoose.connect(mongodb_uri,{
        dbName:'youtubesum',
        bufferCommands:false
    });
    console.log('connected to database')
    cached.conn=await cached.promise;
    return cached.conn;
}