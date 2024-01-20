import jwt from "jsonwebtoken";
import userFunctions from "../helpers/userHelpers.js";

const verifyAdmin = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ err: err.message });
        } else {
            let { email } = decoded;
            console.log(email)
            userFunctions.getUserDetails(email).then((user) => {
                console.log(user)
                user.admin ? next() : res.status(401)
            })
        };
    });
}

export default verifyAdmin;