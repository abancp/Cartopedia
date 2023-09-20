import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import morgan from 'morgan';
import dotenv from 'dotenv'
import path from "path";
import { fileURLToPath } from "url";
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

dotenv.config()

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));
app.use(cors({
    origin: 'https://cartopedia-app.netlify.app'
  }));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'https://cartopedia-app.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/", userRouter);
app.use("/admin", verifyAdmin, adminRouter);
app.use("/company", verifyCompany, companyRouter);
app.use("/seller", sellerRouter);

app.use('/uplaod/user-profile', uploadProfile.single('file'), (req, res) => { res.json({ uploaded: true }) })
app.use('/uplaod/product-display', verifyCompany, uplaodProductDisplay.single('file'), (req, res) => { res.json({ uploaded: true }) })
app.use('/uplaod/cover-photo', verifyAdmin, uploadCoverPhoto.single('file'), (req, res) => { res.json({ uploaded: true }) })
app.use('/uplaod/product-details', verifyCompany, uplaodProductDetailed.array('files'), (req, res) => { res.json({ uploaded: true }) })

app.use((req, res) => res.status(404));



app.listen(process.env.PORT, () => console.log("Server Started : ",process.env.PORT));

export default app;