import db from "../configuration/mongodb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register=async(req,res)=>{
    const { firstName,userName,lastName,phone,email,password } = req.body;
    const user={ 
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        phone:phone,
        email:email,
        password:await bcrypt.hash(""+password,10),
        company:false,
        companyPending:false,
        admin:false,
        companyProducts:[],
        verifyEmail:false,
        lastFiveSearchs:[],
        indrestedItems:[],
        date:Date.now()
    };
    db.collection(process.env.USER_COLLECTION).insertOne(user).then((response)=>{
        let token =jwt.sign(user,process.env.JWT_SECRET,{expiresIn:1000000000});
        res.json({register:true,token:token,user})
    });
};

export const checkEmailExist=(email)=>{
    return new Promise((resolve,reject)=>{
        db.collection(process.env.USER_COLLECTION).findOne({email:email}).then((user)=>{
        if(user){
            resolve(true);
        }else{
            resolve(false);
        };
        });
    });
};

export const checkUserNameExist=(userName)=>{
    return new Promise((resolve,reject)=>{
        db.collection(process.env.USER_COLLECTION).findOne({userName:userName}).then((user)=>{
            if(user){
                resolve(true);
            }else{
                resolve(false);
            };
        });
    });
};

export const checkPhoneExist=(phone)=>{
    return new Promise((resolve,reject)=>{
        db.collection(process.env.USER_COLLECTION).findOne({phone:phone}).then((user)=>{
            if(user){
                resolve(true);
            }else{
                resolve(false);
            };
        });
    });
};

export default register;