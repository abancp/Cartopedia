import express from "express";
import register, { checkEmailExist, checkPhoneExist, checkUserNameExist } from "../authuntication/register.js";
import login from "../authuntication/login.js";
import getUserDetails from "../authuntication/getUserDetails.js";
import userFunctions from "../helpers/userHelpers.js";
import verifyToken from "../middeleware/verifytoken.js";
import fs from 'fs';

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ "String": "Welcome to cartopedia Server " })
});

router.post("/register", register);

router.post("/login", login);


router.get("/check-email-availability/:email",(req,res)=>{
    checkEmailExist(req.params.email).then((emailResponse)=>{
        res.json({email:emailResponse})
    })
})

router.get("/check-phone-availability/:phone",(req,res)=>{
    checkPhoneExist(req.params.phone).then((phoneResponse)=>{
        res.json({phone:phoneResponse})
    })
})

router.get("/check-username-availability/:username",(req,res)=>{
    console.log(req.params.username)
    checkUserNameExist(req.params.username).then((userNameResponse)=>{
        res.json({username:userNameResponse})
    })
})

router.post("/get-user-details", getUserDetails)

router.get("/get-cover-photo",(req,res)=>{
    userFunctions.getRandomCoverPicture().then(coverPhotoName=>{
        res.json({coverPhotoName})
    }).catch(err=>res.status(500).json({err}))
})

router.get("/get-indrested-item/:email",(req,res)=>{
    userFunctions.getUserindrestedItem(req.params.email).then((indrestedItem)=>res.json({indrestedItem:indrestedItem}))
})

router.get("/get-trending-products", ((req, res) => {
    userFunctions.getTrendingProducts().then((response) => {
        res.status(200).json({ products: response })
    })
}))

router.post("/check-companyname-availablility", verifyToken, (req, res) => {
    userFunctions.checkCompanyNameExist(req.body.companyName).then((companynameResponose) => {
        userFunctions.checkWebsiteExist(req.body.website).then((websiteResponse) => {
            res.status(200).json({ companyName: companynameResponose, website: websiteResponse })
        })
    })
})

router.post("/get-otp-email", (req, res) => {
    let otp = Math.floor(100000 + Math.random() * 900000)
    let { email } = req.body;
    userFunctions.getEmailOtp(email, otp);
    res.json({ true: true })
})

router.post("/add-company-temparerly", (req, res) => {
    userFunctions.requestAddDetailsToOtp(req.body).then((email) => {
        res.json({ true: true })
    })
})

router.post("/requset-add-company", (req, res) => {
    userFunctions.requistRegisterCompany(req.body);
    res.json({ true: true })
})

router.post("/submit-otp", (req, res) => {
    console.log("wefiohoqwfqwqwefqweqwwe")
    let { email, otp } = req.body
    userFunctions.submitEmailOtp(email, otp).then((response)=>{
        res.json({verify:response})
    }).catch((err)=>{
        console.log(err)
        res.json({err})
    })
})

router.get("/search/:searchedLine/:email",(req,res)=>{
    userFunctions.searchProduct(req.params.searchedLine,req.params.email).then((result)=>{
        console.log(result)
        res.json(result)
    })
})

router.get("/product/:id",(req,res)=>{
    userFunctions.getProduct(req.params.id).then((product)=>{
        res.json(product)
    })
})

router.get("product-details/folder-size/:id",(req,res)=>{
    fs.readdir("./public/product-details/"+req.params.id, (err, files) => res.json({folderSize:files.length}))
})



export default router;
