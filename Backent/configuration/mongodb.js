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
