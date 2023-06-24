import db from "../configuration/mongodb.js"
import collections from "../configuration/collections.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const login=async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)
    let user = await db.get().collection(collections.USER_COLLECTION).findOne({email:email})
    if(user){
        if(bcrypt.compare(password,user.password)){
            let token =jwt.sign(user,collections.JWT_SECRET,{expiresIn:1000000000});
            res.status(200).send({auth:true,token:token,user});
            console.log(token,user)
        }else{
            res.status(500).send({error:"Password Not Matching"});
            console.log("Password Not Matching")
        }
    }else{
        res.status(500).send({error:"User Not Foud"});
        console.log("User Not Find")
    }
};

export default login;