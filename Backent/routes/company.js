import express from "express";
import companyFunctions from "../functions/companyFunctions.js";

const router = express.Router();


router.post("/add-company-product", (req, res) => {
    companyFunctions.addProduct(req.body).then((id)=>{
        res.json({id:id})
    })
})

router.get("/all-categories",(req,res)=>{
    companyFunctions.getAllCategories().then((categories)=>{
        res.json({categories})
    })
})

export default router;