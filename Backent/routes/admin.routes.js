import express from "express";
import adminFunctions from "../helpers/adminHelpers.js";
const router = express.Router();

router.get("/",(req,res)=>{
    adminFunctions.getCompanyRequiests().then((requests)=>{
        res.json({requests:requests})
    })
}) 

router.get("/permission-company/:email/:permission",(req,res)=>{
    if(req.params.permission==="true"){
        adminFunctions.allowCompany(req.params.email)
    }else{
        adminFunctions.denieCompany(req.params.email)
    }
    res.json({true:true})
})

export default router;