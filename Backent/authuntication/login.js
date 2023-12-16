import db from "../configuration/mongodb.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ email: req.body.email })
    if (user) {
        if (await bcrypt.compare("" + req.body.password, user.password)) {
            let token = jwt.sign({ _id: user._id, email: user.email, signedDate: Date.now() }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 365 })
            let { password, otp, ...filterdUser } = user
            res.status(200).json({ auth: true, token, user: filterdUser })
        } else res.json({ auth: false })
    } else res.json({ auth: false })
}

export default login