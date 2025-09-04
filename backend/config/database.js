import mongoose from "mongoose";

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connection successful")
    }
    catch(error){
        console.log("DB connection failed",error)
        process.exit(1)
    }
}

export default connectdb