import jwt from "jsonwebtoken";
import collections from "../configuration/collections.js";

const verifyCompany=(req,res,next)=>{
    console.log(req.headers.authorization)
    jwt.verify(req.headers.authorization,collections.JWT_SECRET,(err,decoded)=>{
        if(err){
            console.log(err)
            res.status(400).send({err:err.message});
        }else{
            let {company} = decoded;
            company?next():res.status(401).send({err:err.message});
        };
    });
}

export default verifyCompany;