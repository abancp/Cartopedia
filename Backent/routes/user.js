import express from "express";
import register,{checkEmailExist, checkUserNameExist} from "../auth/register.js";
import login from "../auth/login.js";
import getUserDetails from "../auth/getUserDetails.js";

const router = express.Router();

router.get("/",(req,res)=>{
    res.json({"String":"Welcome to cartopedia"})
});

router.post("/register",register);

router.post("/login",login);

router.post("/check-email-availablility",(req,res)=>{
    console.log(req.body.email);
    checkEmailExist(req.body.email).then((emailResponse)=>{
        checkUserNameExist(req.body.userName).then((userNameResponse)=>{
            res.json({email:emailResponse,userName:userNameResponse})
        })
    })
})

router.post("/getUserDetails",getUserDetails)

router.patch("/add-to-cart",(req,res)=>{

});

router.get('/get-prduct-details/:proId',(req,res)=>{
    
});

export default router;