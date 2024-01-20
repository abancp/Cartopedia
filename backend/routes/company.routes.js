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
export default router;