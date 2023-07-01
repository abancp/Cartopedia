import express from "express";
import register, { checkEmailExist, checkUserNameExist } from "../auth/register.js";
import login from "../auth/login.js";
import getUserDetails from "../auth/getUserDetails.js";
import userFunctions from "../functions/userFunctions.js";
import verifyToken from "../middeleware/verifytoken.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ "String": "Welcome to cartopedia" })
});

router.post("/register", register);

router.post("/login", login);

router.post("/check-email-availablility", (req, res) => {
    console.log(req.body.email);
    checkEmailExist(req.body.email).then((emailResponse) => {
        checkUserNameExist(req.body.userName).then((userNameResponse) => {
            res.json({ email: emailResponse, userName: userNameResponse })
        })
    })
})

router.post("/getUserDetails", getUserDetails)


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
    let { email, otp } = req.body
    userFunctions.submitEmailOtp(email, otp).then(()=>{

    }).catch(()=>{
        
    })
})


export default router;