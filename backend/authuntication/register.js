import db from "../configuration/mongodb.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const register = async (req, res) => {

    const { firstName, userName, lastName, phone, email, password } = req.body

    const user = {
        firstName,
        lastName,
        userName,
        phone,
        email,
        password: await bcrypt.hash("" + password, 10),
        theme: 'dark',
        company: false,
        companyPending: false,
        admin: false,
        companyProducts: [],
        verifyEmail: false,
        indrestedItems: [],
        indrestedCategories: [],
        date: Date.now()
    }

    db.get().collection(process.env.USER_COLLECTION).insertOne(user).then(async (response) => {
        await db.get().collection(process.env.DASHBOARD_COLLECTION).updateOne({ item: "dashboard" }, { $inc: { users: 1 } })
        let token = jwt.sign({ _id: response.insertedId, email, signedDate: Date.now() }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 365 })
        let { password, otp, ...filterdUser } = user
        res.json({ sucsess: true, token: token, user: filterdUser })
    })

}

export const checkEmailExist = (email) => {
    return new Promise((resolve, reject) => {
        db.get().collection(process.env.USER_COLLECTION).findOne({ email: email }).then(user => user ? resolve(true) : resolve(false))
    })
}

export const checkUserNameExist = (userName) => {
    return new Promise((resolve, reject) => {
        db.get().collection(process.env.USER_COLLECTION).findOne({ userName: userName }).then(user => user ? resolve(true) : resolve(false))
    })
}

export const checkPhoneExist = (phone) => {
    return new Promise((resolve, reject) => {
        db.get().collection(process.env.USER_COLLECTION).findOne({ phone: phone }).then(user => user ? resolve(true) : resolve(false))
    })
}

export default register