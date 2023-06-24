import express from "express";
import companyFunctions from "../functions/companyFunctions.js";

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Admin is here")
})

router.post("/add-product",(req,res)=>{
    
})

export default router;