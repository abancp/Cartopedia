import db from "../configuration/mongodb.js";
import collections from "../configuration/collections.js";
import mailer from "../configuration/nodemailer.js";
import bcrypt from "bcrypt";

export default {
    getTrendingProducts: () => {
        return new Promise(async (resolve, reject) => {
            const cursor = db.get().collection(collections.PRODUCTS_COLLECTION).find().sort({ trend: -1 }).limit(20);
            let pros = [];
            for await (const doc of cursor) {
                console.dir;
                pros.push(doc);
            }
            resolve(pros);
        })
    },
    getUserDetails: (email) => {
        return new Promise(async (resolve, reject) => {
            let user = db.get().collection(collections.USER_COLLECTION).findOne({ email: email })
            if (user) {
                resolve(user)
            }
        })
    },
    checkCompanyNameExist: (companyName) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.USER_COLLECTION).findOne({ companyDetails: { companyName: companyName } }).then((company) => {
                if (company) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
    checkWebsiteExist: (website) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.USER_COLLECTION).findOne({ companyDetails: { website: website } }).then((company) => {
                if (company) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
    requestAddDetailsToOtp: (companyDetails) => {
        return new Promise((resolve, reject) => {
            let { companyName, website, location, categories, description, email } = companyDetails
            db.get().collection(collections.USER_COLLECTION).updateOne({ email: email }, {
                $set: {
                    companyRequestDetails: {
                        companyName,
                        website,
                        location,
                        categories,
                        description,
                        email,
                        date: Date.now()
                    }
                }
            })
            resolve(email)
        })
    },
    getEmailOtp: async (email, otp) => {
        let mailDetails = {
            from: 'cartopediaa@gmail.com',
            to: email,
            subject: 'Email Verification Code from Cartopedia',
            html: `<div style="border:solid white 1px">   
            <h1 style="text-align:center;color:darkcyan;padding-top:1rem">Catopedia Email Verification</h1>
            <p style="margin:1rem">Hi<br/>We received a request to verify your email <span style="color:blue">${email}</span>.your email verification code is:</p>
            <h2 style="text-align:center;font-size:30px;font-weight:700">${otp}</h2>
            <p style="margin:1rem">if you dod not request this code,it is possible that someone else is trying to register your email <span style="color:blue">${email}</span> as a company in Cartopedia.Do not forward or give this code to anyone.</p>
            <p style="margin:1rem">sincerely yours,</p>
            <p style="margin-left:1rem">Cartopedia team</p>
          </div>`
        };

        mailer.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        db.get().collection(collections.USER_COLLECTION).updateOne({ email: email }, {
            $set: {
                emailOtp: await bcrypt.hash("" + otp, 10),
                emailOtpDate: Date.now(),
                emailOtpExpareDate: Date.now() + 30000
            }
        })
    },
    submitEmailOtp:  (email, otp) => {
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({ email: email })
        if (user.emailOtpExpareDate > Date.now()) {
            if (bcrypt.compare(otp, user.emailOtp)) {
                db.get().collection(collections.USER_COLLECTION).updateOne({ email: email }, {
                    $set: {
                        verifyEmail: true,
                        companyPending: true,
                        companyRequestDetails:{}
                    }
                })
                let tempCompany = user.companyRequestDetails
                db.get().collection(collections.COMPANY_REQUIEST_COLLLECTION).insertOne(tempCompany)
                resolve("otp is correct")
            } else {
                console.log("otp incorrect")
                reject("otp is incorrect")
            }
        } else {
            console.log("otp time out")
            reject("otp time out")
        }
        })
    }
};