import { MongoClient } from "mongodb";
import express from 'express'
const app = express()
app.use(express.json())
const connectionString = "mongodb+srv://abancpchengani:1%402%40Abancp@cartopedia.j9zt4kz.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(connectionString);

let connection;
try {
  connection = await client.connect();
  console.log("MongoDB Connected")
} catch(e) {
  console.error("MongoDB Not Connected",e);
}

let db = connection.db("Cartopedia");
app.get('/',async(req,res)=>{
  let array =await db.collection("user").find().toArray()
  res.json({array})
});

app.listen(4)
console.log("started")