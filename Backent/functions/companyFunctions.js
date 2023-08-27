import db from "../configuration/mongodb.js"

export default {
    addProduct: (proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(process.env.PRODUCTS_COLLECTION).insertOne(proDetails).then((response) => {
                db.get().collection(process.env.USER_COLLECTION).updateOne(
                    { email: proDetails.comapanyId },
                    { $push: { companyProducts: response.insertedId } }
                )
                resolve(response.insertedId)
            })
        })
    },
    getAllCategories: ()=>{
        return new Promise(async(resolve,reject)=>{
            let categoryDoc = await db.get().collection(process.env.CATEGORIES_COLLECTION).find().toArray()
            resolve(categoryDoc[0].categories)
        })
    }
}