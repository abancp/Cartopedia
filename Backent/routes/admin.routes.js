import express from "express";
import adminFunctions from "../helpers/adminHelpers.js";
const router = express.Router();

router.get("/company-requiests",(req,res)=>{
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

router.get("/products/all/:skip",(req,res)=>{
    const {skip} = req.params.skip
    adminFunctions.getAllProducts(skip).then((products)=>{
        res.json({products})
    })
})

export default router;