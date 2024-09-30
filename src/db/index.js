import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectionString = process.env.MONGODB_URI;
        const connectionInstance = await mongoose.connect(connectionString);
        console.log("MongoDB Connection Host: ", connectionInstance.connection.host);
    }
    catch(error){
        console.error("Error while connecting MongoDB.\n", error);
    }
}

export default connectDB;