import jwt from "jsonwebtoken";
import collections from "../configuration/collections.js";
import userFunctions from "../functions/userFunctions.js";

const getUserDetails=(req,res)=>{
jwt.verify(req.body.token,collections.JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(401).send({err:err.message});
        }else{
            let {email} =decoded;
            userFunctions.getUserDetails(email).then((user)=>{
                res.send(user)
                return(user)
            })
        };
    });
};
export default getUserDetails;