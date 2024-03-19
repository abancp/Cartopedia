import express from "express";
import adminFunctions from "../helpers/adminHelpers.js";
const router = express.Router();

router.get("/requests/company", (req, res) => {
    adminFunctions.getCompanyRequiests().then((requests) => {
        res.json({ requests: requests })
    })
})

router.post("/permission/company", (req, res) => {
    const { email, permission } = req.body
    if (permission) {
        adminFunctions.allowCompany(email)
    } else {
        adminFunctions.denieCompany(email)
    }
    res.json({ true: true })
})

router.get("/products/all/:skip", (req, res) => {
    const { skip } = req.params
    adminFunctions.getAllProducts(skip).then((products) => {
        res.json({ products })
    })
})

router.delete("/company-product/", (req, res) => {
    const { proId } = req.query
    adminFunctions.deleteCompanyProduct(proId)
    res.status(200)
})

router.post("/permission/category", (req, res) => {
    const { name, permission } = req.body
    if (permission === false) {
        adminFunctions.rejectCategoryReq(name).then((msg) => {
            console.log(msg);
            res.json({ success: true, message: msg })
        })
    } else {
        adminFunctions.acceptCategoryReq(name).then((msg) => {
            console.log(msg);
            res.json({ success: true, message: msg })
        })
    }
})

router.get('/requests/category', (req, res) => {
    adminFunctions.getCategoryReqs().then((reqs) => {
        res.json({ success: true, requests: reqs })
    })
})

export default router;