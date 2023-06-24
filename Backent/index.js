import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import morgan from 'morgan';
import path from "path";
import { fileURLToPath } from "url";
import db from "./configuration/mongodb.js"
import userRouter from "./routes/user.js";
import companyRouter from "./routes/company.js";
import sellerRouter from "./routes/seller.js";
import verifyCompany from './middeleware/verifyCompany.js';
import multer from 'multer';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", userRouter);
app.use("/company", companyRouter);
app.use("/seller", sellerRouter);

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/user-profiles')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.email + ".jpg")
    }
});
const upload = multer({ storage: storage })

app.use('/uplaod/user-profile', upload.single('file'), (req, res) => { res.json({ uploaded: true }) })

app.use((req, res) => res.status(404));

db.connect((err) => {
    if (err) {
        console.log("Mongodb is not connected", err)
    } else {
        console.log("Mongodb Connected")
    }
})
app.listen(3001, () => console.log("Server Started : 3001"));

export default app;