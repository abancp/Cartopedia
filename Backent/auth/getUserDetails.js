import jwt from "jsonwebtoken";
import collections from "../configuration/collections.js";

const getUserDetails=(req,res)=>{
jwt.verify(req.body.token,collections.JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(401).send({err:err.message});
        }else{
            let user={
                email:decoded.email,
                firstName:decoded.firstName,
                lastName:decoded.lastName,
                phone:decoded.phone,
                userId:decoded._id,
                userName:decoded.userName,
                company:decoded.company,
            }
            console.log(decoded);
            res.send(user);
        };
    });
};
export default getUserDetails;