import express from "express";
import companyFunctions from "../functions/companyFunctions.js";

const router = express.Router();


router.post("/add-product", (req, res) => {
    companyFunctions.addProduct(req.body).then((id)=>{
        res.json({id:id})
    })
})

export default router;