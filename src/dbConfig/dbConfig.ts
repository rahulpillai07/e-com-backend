import mongoose, { mongo } from "mongoose";

let connection=false;

const connect=async():Promise<void>=>{
    try{
    if(connection) return console.log("MongoDB is already connected.");
    const connectionInstance=await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log('connection to db failed',error);
        process.exit(1);
    }
}

export default connect;