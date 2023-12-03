<<<<<<< HEAD
import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://abancpchengani:1%402%40Abancp@cartopedia.j9zt4kz.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(connectionString);

let connection;

try {
    connection = await client.connect();
    console.log("MongoDB Connected")
} catch (e) {
    console.error("MongoDB Not Connected", e);
}

export default  connection.db("Cartopedia");
=======
import {MongoClient} from "mongodb"
const state={
    db:null
};
const url = "mongodb://127.0.0.1:27017/"
const dbName = "Cartopedia"
const client = new MongoClient(url);
const connect = async (cb) => {
    try {
        await client.connect();
        const db=client.db(dbName);
        state.db=db;
        return cb();
    }catch(err){
        return cb(err);
    }
};
const get=()=>state.db;
export default {
    connect,
    get,
};
>>>>>>> update
