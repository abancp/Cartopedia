import db from "../configuration/mongodb.js";
import collections from "../configuration/collections.js";

export default {
    getTrendingProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            const cursor = db.get().collection(collections.PRODUCTS_COLLECTION).find().sort({ trend: -1 }).limit(20);
            let pros=[];
            for await (const doc of cursor) {
                console.dir;
                pros.push(doc);
            }
            resolve(pros);
        })
    },
    getUserDetails:(email)=>{
        return new Promise(async(resolve,reject)=>{
            let user=db.get().collection(collections.USER_COLLECTION).findOne({email:email})
            if(user){
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
    requistRegisterCompany: (companyRequest) => {
        let { companyName, website, location, categories, description, email } = companyRequest
        let companyRequestDetails = {
            companyName,
            website,
            location,
            categories,
            description,
            email,
            date: Date.now()
        }
        db.get().collection(collections.COMPANY_REQUIEST_COLLLECTION).insertOne(companyRequestDetails)
        db.get().collection(collections.USER_COLLECTION).updateOne({ email: email }, {
            $set: {
                companyPending: true
            }
        })
    }
};