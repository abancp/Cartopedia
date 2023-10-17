import db from "../configuration/mongodb.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const login = async (req, res) => {
    let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ email: req.body.email })
    if (user) {
        if (await bcrypt.compare("" + req.body.password, user.password)) {
            let token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 1000000000 })
            let {password,otp,...filterdUser} = user
            res.status(200).json({ auth: true, token, user:filterdUser })
        } else res.json({ auth: false })
    } else res.status(401).json({ auth: false })
}

export default login