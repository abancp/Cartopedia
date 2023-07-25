import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ err: err.message });
        } else {
            next();
        };
    });
}

export default verifyToken;