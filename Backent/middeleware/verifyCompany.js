import jwt from "jsonwebtoken";
import collections from "../configuration/collections.js";
import userFunctions from "../functions/userFunctions.js";

const verifyCompany = (req, res, next) => {
    jwt.verify(req.headers.authorization, collections.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ err: err.message });
        } else {
            let { email } = decoded;
            userFunctions.getUserDetails(email).then((user) => {

                user.company ? next() : res.status(401)
            })
        };
    });
}

export default verifyCompany;