import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import morgan from 'morgan';
import path from "path";
import { fileURLToPath } from "url";
import db from "./configuration/mongodb.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import companyRouter from "./routes/company.js";
import sellerRouter from "./routes/seller.js";
import verifyCompany from './middeleware/verifyCompany.js';
import verifyAdmin from './middeleware/verifyAdmin.js';
import { uploadProfile, uplaodProductDisplay, uplaodProductDetailed, uploadCoverPhoto } from './functions/fileUploadingFunctions.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));
app.use(cors());

app.use("/", userRouter);
app.use("/admin", verifyAdmin, adminRouter);
app.use("/company", verifyCompany, companyRouter);
app.use("/seller", sellerRouter);

app.use('/uplaod/user-profile', uploadProfile.single('file'), (req, res) => { res.json({ uploaded: true }) })
app.use('/uplaod/product-display', verifyCompany, uplaodProductDisplay.single('file'), (req, res) => { res.json({ uploaded: true }) })
app.use('/uplaod/cover-photo', verifyAdmin, uploadCoverPhoto.single('file'), (req, res) => { res.json({ uploaded: true }) })
app.use('/uplaod/product-details', verifyCompany, uplaodProductDetailed.array('files'), (req, res) => { res.json({ uploaded: true }) })

app.use((req, res) => res.status(404));

db.connect((err) => err ? console.log("Mongo db Not conneted ", err) : console.log("Mongodb Conneted"))

app.listen(3001, () => console.log("Server Started : 3001"));

export default app;