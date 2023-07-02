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
        if(await bcrypt.compare(""+password,user.password)){
            let token =jwt.sign(user,collections.JWT_SECRET,{expiresIn:1000000000});
            res.status(200).json({auth:true,token:token,user});
            console.log(token,user)
        }else{
            res.json({auth:false});
            console.log("Password Not Matching")
        }
    }else{
        res.json({auth:false});
        console.log("User Not Find")
    }
};

export default login;