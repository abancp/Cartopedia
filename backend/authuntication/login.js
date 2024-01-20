import db from "../configuration/mongodb.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ email: req.body.email })
    if (user) {
        console.log(await bcrypt.compare("" + req.body.password, user.password));
        if (await bcrypt.compare("" + req.body.password, user.password)) {
            let token = jwt.sign({ _id: user._id, email: user.email, signedDate: Date.now() }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 365 })
            let { password, otp, ...filterdUser } = user
            res.cookie('userId',user._id)
            res.cookie('userName',user.userName)
            res.cookie('email',user.email)
            res.status(200).json({ success: true, token, user: filterdUser })
        } else res.json({ success: false, message: "email or password not matching" })
    } else res.json({ success: false, message: "email or password not matching" })
}

export default login