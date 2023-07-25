import jwt from "jsonwebtoken";
import userFunctions from "../functions/userFunctions.js";

const verifyCompany = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
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