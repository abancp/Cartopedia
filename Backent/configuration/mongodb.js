import {MongoClient} from "mongodb"
const state={
    db:null
};
const url = "mongodb://127.0.0.1:27017"
const dbName = "Cartopedia"
const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
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