const { MongoClient } = require("mongodb");

const DB_URI = "mongodb://user:codeforinterview@ac-rz9pyhy-shard-00-00.ucnlmlq.mongodb.net:27017,ac-rz9pyhy-shard-00-01.ucnlmlq.mongodb.net:27017,ac-rz9pyhy-shard-00-02.ucnlmlq.mongodb.net:27017/?ssl=true&replicaSet=atlas-ez4dow-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(DB_URI);

async function run() {
    try {
        await client.connect();
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
    }
}

run();