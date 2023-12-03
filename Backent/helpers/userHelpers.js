import fs from "fs";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import levenshtein from "fast-levenshtein";
import db from "../configuration/mongodb.js";
import mailer from "../configuration/nodemailer.js";
import instance from '../configuration/razorpay.js';
import { nanoid } from 'nanoid';

export default {
    getRandomCoverPicture: () => {
        return new Promise((resolve, reject) => fs.readdir("./public/cover-photos", (err, files) => err ? reject(err) : resolve(files[Math.round(Math.random() * (files.length - 1))])))
    },
    getUserindrestedItem: (email) => {
        return new Promise(async (resolve, reject) => {
            console.log(email)
            let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ email: email })
            if (user) {
                let itemId = await user.indrestedItems[Math.round(Math.random() * 2)]
                if (itemId === null || itemId === undefined) {
                    for (let i = 0; i < 8; i++) {
                        itemId = await user.indrestedItems[Math.round(Math.random() * 2)]
                        if (itemId !== null && itemId !== undefined) {
                            let item = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: itemId })
                            resolve(item)
                        }
                    }
                    resolve({ err: "the specified user not have indrested item now!" })
                } else {
                    let item = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: itemId })
                    resolve(item)
                }
            } else {
                resolve({ err: "user not found" })
            }
        })
    },
    getTrendingProducts: () => {
        return new Promise(async (resolve, reject) => {
            const cursor = db.get().collection(process.env.PRODUCTS_COLLECTION).find().sort({ trend: -1 }).limit(20)
            let pros = []
            for await (const doc of cursor) {
                console.dir
                pros.push(doc)
            }
            resolve(pros)
        })
    },
    getUserDetails: (email) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ email: email })
            if (user) resolve(user)
        })
    },
    checkCompanyNameExist: (companyName) => {
        return new Promise((resolve, reject) => {
            db.get().collection(process.env.USER_COLLECTION).findOne({ companyDetails: { companyName: companyName } }).then((company) => {
                company ? resolve(true) : resolve(false)
            })
        })
    },
    checkWebsiteExist: (website) => {
        return new Promise((resolve, reject) => {
            db.get().collection(process.env.USER_COLLECTION).findOne({ companyDetails: { website: website } }).then((company) => {
                if (company) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
    requestAddDetailsToOtp: (companyDetails) => {
        return new Promise(async (resolve, reject) => {
            let { companyName, website, location, categories, description, email } = companyDetails
            db.get().collection(process.env.USER_COLLECTION).updateOne({ email: email }, {
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
            await db.get().collection(process.env.DASHBOARD_COLLECTION).updateOne({ item: "dashboard" }, { $inc: { "company.companies": 1 } })
            resolve(email)
        })
    },
    getEmailOtp: async (email, otp) => {
        console.log("otp-", otp)
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
        db.get().collection(process.env.USER_COLLECTION).updateOne({ email: email }, {
            $set: {
                emailOtp: await bcrypt.hash("" + otp, 10),
                emailOtpDate: Date.now(),
                emailOtpExpareDate: Date.now() + 60000
            }
        })
    },
    submitEmailOtp: (email, otp) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ email: email })
            console.log(await bcrypt.compare("" + otp, user.emailOtp))
            if (user.emailOtpExpareDate > Date.now()) {
                if (await bcrypt.compare("" + otp, user.emailOtp)) {
                    db.get().collection(process.env.USER_COLLECTION).updateOne({ email: email }, {
                        $set: {
                            verifyEmail: true,
                            companyPending: true,
                            companyRequestDetails: {}
                        }
                    })
                    let tempCompany = user.companyRequestDetails
                    db.get().collection(process.env.COMPANY_REQUIEST_COLLLECTION).insertOne(tempCompany)
                    resolve(true)
                } else {
                    console.log("otp incorrect")
                    reject("otpErr")
                }
            } else {
                console.log("otp time out")
                reject("timeError")
            }
        })
    },
    searchProduct: (searchedLine, email) => {
        let keywords = searchedLine.split(" ")
        return new Promise(async (resolve, reject) => {
            let result = {
                categories: [],
                companies: [],
                products: null
            }
            let tempProducts = []
            let companies = await db.get().collection(process.env.USER_COLLECTION).aggregate([
                { "$unwind": "$companyDetails" },
                { "$match": { "companyDetails.companyName": searchedLine } },
                {
                    "$project": {
                        "companyDetails.companyName": 1,
                        "_id": 1,
                        "companyDetails.website": 1,
                        "companyDetails.email": 1,
                        "companyDetails.description": 1,
                    }
                }
            ]).toArray()
            result.companies.push(companies)
            let totalCategories = await db.get().collection(process.env.CATEGORIES_COLLECTION).find({}).toArray()
            totalCategories[0].categories.forEach(category => {
                for (let i = 0; i < keywords.length; i++) {
                    if ((parseFloat(Number((100 - ((levenshtein.get(category, keywords[i].toLowerCase()) / keywords[i].length) * 100)) / 100.00).toFixed(3))) > 0.85) {
                        result.categories.push(keywords[i])
                    }
                }
            })
            let products = await db.get().collection(process.env.PRODUCTS_COLLECTION).aggregate([
                {
                    $project: {
                        "name": 1,
                        "tags": 1,
                        "price": 1,
                        "category": 1,
                        "description": 1,
                        "date": 1,
                        "trend": 1,
                        "comapanyId": 1,
                        "companyName": 1,
                        "stock": 1,
                        "mrp": 1
                    }
                }
            ]).toArray()
            let final = {
                length: 0,
                diff: 0,
            }
            products.forEach((product) => {
                final.length = product.name.length
                final.diff = levenshtein.get(searchedLine, product.name)
                product.priority = (parseFloat(Number((100 - ((final.diff / final.length) * 100)) / 100.00).toFixed(3)))
                product.tags.forEach((tag) => {
                    let tagDiff = ((parseFloat(Number((100 - ((levenshtein.get(searchedLine, tag) / tag.length) * 100)) / 100.00).toFixed(3))))
                    switch (true) {
                        case tagDiff >= 0.95:
                            product.priority = product.priority + 0.80
                            break;
                        case tagDiff >= 0.9:
                            product.priority = product.priority + 0.70
                            break;
                        case tagDiff >= 0.8:
                            product.priority = product.priority + 0.50
                            break;
                        case tagDiff >= 0.7:
                            product.priority = product.priority + 0.30
                            break;
                        case tagDiff >= 0.6:
                            product.priority = product.priority + 0.10
                            break;
                        default:
                            break;
                    }
                });
                switch (true) {
                    case product.priority >= 0.30:
                        if (product.priority > 1) {
                            product.priority = 1
                        }
                        tempProducts.push(product)
                        break;
                    case product.priority <= 0:
                        product.priority = 0
                    default:
                        break;
                }
            })
            tempProducts.sort((a, b) => b.priority - a.priority)
            result.products = tempProducts
            if (email !== undefined && email !== null) {
                console.log(email)
                switch (true) {
                    case tempProducts.length > 2:
                        db.get().collection(process.env.USER_COLLECTION).updateOne({ email: email }, {
                            $set: { indrestedItems: [tempProducts[0]._id, tempProducts[1]._id, tempProducts[2]._id] }
                        })
                        break
                    case tempProducts.length > 1:
                        db.get().collection(process.env.USER_COLLECTION).updateOne({ email: email }, {
                            $set: { indrestedItems: [tempProducts[0]._id, tempProducts[1]._id] }
                        })
                        break
                    case tempProducts.length > 0:
                        db.get().collection(process.env.USER_COLLECTION).updateOne({ email: email }, {
                            $set: { indrestedItems: [tempProducts[0]._id] }
                        })
                        break
                    default:
                        break
                }
            }
            resolve(result)
        })
    },
    getProduct: (id) => {
        return new Promise((resolve, reject) => {
            try {
                var objId = new ObjectId(id)
            } catch (BSONError) {
                resolve('Not a valid Product Id')
            }
            db.get().collection(process.env.PRODUCTS_COLLECTION).findOne(objId).then((product) => {
                resolve(product)
            })
        })
    },
    addToCart: (proId, count, userId) => {
        count = Number(count)
        return new Promise(async (resolve, reject) => {
            let cart = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId })
            const product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(proId) })
            const price = Number(product.price)
            let productCount
            const key = "cartItems." + proId
            const setingObj = {}
            if (!cart) {
                await db.get().collection(process.env.CART_COLLECTION).insertOne({ userId, cartItems: {}, totalPrice: 0 })
                cart = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId })
            }
            const totalPrice = (price * count)
            if (cart.totalPrice + totalPrice > 499_999) {
                reject({ cartPriceLimitErr: true })
            } else {
                if (cart.cartItems) productCount = cart.cartItems[proId]
                if (productCount) {
                    setingObj[key] = productCount + count
                } else {
                    setingObj[key] = count
                }
                db.get().collection(process.env.CART_COLLECTION).updateOne({ userId }, {
                    $set: setingObj,
                    $inc: { "totalPrice": Number(totalPrice) }
                })
                resolve({ ok: 'ok' })
            }
        })
    },
    getCartProducts: (userId) => {
        return new Promise(async (resolve, reject) => {
            const cart = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId })
            var products;
            var totalPrice = cart?.totalPrice;
            if (cart) {
                const productIds = Object.keys(cart.cartItems)
                products = []
                for (var i = 0; i < productIds.length; i++) {
                    let product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(productIds[i]) })
                    let resProduct = product ? product : { _id: productIds[i], deleted: true, price: 0 }
                    resProduct.count = cart.cartItems[resProduct._id]
                    products.push(resProduct)
                }
            } else {
                resolve([[], 0])
            }
            resolve([products, totalPrice])
        })
    },
    removeCartProduct: async (userId, proId) => {
        let key = "cartItems." + proId
        let product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(proId) })
        let { cartItems } = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId })
        let count = cartItems[proId]
        let price = product?.price * count
        db.get().collection(process.env.CART_COLLECTION).updateOne({ userId }, {
            "$unset": { [key]: 1 },
            "$inc": { totalPrice: -price }
        })



    },
    placeOrderCart: (userId, address, pay) => {
        return new Promise(async (resolve, reject) => {
            let cart = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId })
            if (cart) {
                db.get().collection(process.env.ORDER_COLLECTION).insertOne({
                    userId,
                    products: cart.cartItems,
                    totalPrice: Number(cart.totalPrice),
                    orderDate: Date.now(),
                    payment: "pending",
                    address: address,
                    delivery: 'not started'
                }).then((res) => {
                    if (pay !== 'COD') {
                        let options = {
                            amount: cart.totalPrice * 100,
                            currency: "INR",
                            receipt: "" + res.insertedId
                        }
                        instance.orders.create(options, function (err, order) {
                            db.get().collection(process.env.ORDER_COLLECTION).updateOne({ _id: new ObjectId(res.insertedId) }, {
                                $set: { orderId: order.id }
                            })
                            resolve({ orderId: order.id, price: Number(cart.totalPrice) * 100 })
                        })
                    } else {
                        let orderId = 'cod' + nanoid(9)
                        db.get().collection(process.env.ORDER_COLLECTION).updateOne({ _id: new ObjectId(res.insertedId) }, {
                            $set: { 'orderId': orderId }
                        })
                        resolve({ orderId, price: Number(cart.totalPrice) * 100 })
                    }
                })

            }
        })
    },
    paymentSuccess: (orderId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(process.env.ORDER_COLLECTION).updateOne({ orderId }, {
                $set: { payment: 'success' }
            })
            resolve()
        })
    },
    clearCart: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(process.env.CART_COLLECTION).deleteOne({ userId })
        })
    },
    getOrders: (userId) => {
        return new Promise(async (resolve, reject) => {
            const orders = await db.get().collection(process.env.ORDER_COLLECTION).find({ userId }).sort({ _id: 1 }).limit(10).toArray()
            var orderProducts = []
            for (var j = 0; j < orders.length; j++) {
                var products;
                const productIds = Object.keys(orders[j].products)
                products = []
                for (var i = 0; i < productIds.length; i++) {
                    let product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(productIds[i]) })
                    let resProduct = product ? product : { _id: productIds[i], deleted: true, price: 0 }
                    resProduct.count = orders[j].products[resProduct._id]
                    products.push(resProduct)
                }
                orderProducts.push(products)
            }
            resolve([orders, orderProducts])
        })
    }
}