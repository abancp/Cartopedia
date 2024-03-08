import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
const state = {
    db: null
};
dotenv.config()
const url = process.env.MONGO_URL
const dbName = "Cartopedia"
const client = new MongoClient(url);
const connect = async (cb) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        state.db = db;
        return cb();
    } catch (err) {
        return cb(err);
    }
};
const get = () => state.db;
export default {
    connect,
    get,
    categoryRequests : client.db(dbName).collection("category-requests"),
    categories : client.db(dbName).collection("category-requests"),
    carts : client.db(dbName).collection("carts"),
    orders : client.db(dbName).collection("orders"),
    products : client.db(dbName).collection("products"),
};
