import express from "express";
import companyFunctions from "../helpers/companyHelpers.js";

const router = express.Router();


router.post("/add-company-product", (req, res) => {
    companyFunctions.addProduct(req.body).then((id) => {
        res.json({ id: id })
    })
})

router.get("/all-categories", (req, res) => {
    companyFunctions.getAllCategories().then((categories) => {
        res.json({ categories })
    })
})

router.post("/check-company-product", (req, res) => {
    companyFunctions.checkCompayProduct(req.body).then((errors) => {
        console.log(errors)
        if (errors.productNameErr.length || errors.productPriceErr.length || errors.productMrpErr.length || errors.productCategoryErr.length || errors.productTagsErr.length || errors.productStockErr.length || errors.productDescriptionErr.length) {
            res.json(errors)
        }
        else {
            res.json({ CompanyProductCompleteOk: true })
        }
    })
})

router.post('/add-category',(req,res)=>{
    console.log(req.body);
    let {categoryName,companyName} = req.body
    companyFunctions.createCategoryReq(categoryName,companyName).then((msg)=>{
        res.json({success:true,message:msg})
    }).catch((err)=>{
        res.status(403).json({success:false,message:err})
    })
})

export default router;