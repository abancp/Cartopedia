import jwt from "jsonwebtoken";
import collections from "../configuration/collections";
const verifyToken=(req,res,next)=>{
    let authHeader = req.header.authorization;
    if(authHeader){
        let token = authHeader.split(" ")[1];
        jwt.verify(token,collections.JWT_SECRET,(err,decoded)=>{
            if(err){
                res.staus(401).send({err:"Authonticaton failed"});
            }else{
                res.send(decoded);
                next();
            };
        });
    }else{
        res.staus(401).send({err:"no token provided"});
    };
};
export default verifyToken;