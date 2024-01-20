import jwt from "jsonwebtoken"


const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(401).send({ err: "unotherized requiest" })
        } else {
            next()
        }
    })
}

export default verifyToken