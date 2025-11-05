import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
export const MONGO_URI = process.env.MONGO_URI

async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(MONGO_URI!);
        console.log('************* ->Db okkke');

    } catch (error) {
        console.log('*********** -> Db nooook!!!', error)
    }
}
export default connectDB;