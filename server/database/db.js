import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = "mongodb://user:codeforinterview@ac-rz9pyhy-shard-00-00.ucnlmlq.mongodb.net:27017,ac-rz9pyhy-shard-00-01.ucnlmlq.mongodb.net:27017,ac-rz9pyhy-shard-00-02.ucnlmlq.mongodb.net:27017/?ssl=true&replicaSet=atlas-ez4dow-shard-0&authSource=admin&appName=Cluster0";

const Connection = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log("Database connected successfully");

    } catch (error) {
        console.log("Error while connecting with the database:", error.message);
    }
};

export default Connection;