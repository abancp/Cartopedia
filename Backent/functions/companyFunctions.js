import db from "../configuration/mongodb.js"

export default {
    addProduct: (proDetails) => {
        return new Promise((resolve, reject) => {
            db.get.collection(process.env.PRODUCTS_COLLECTION).insertOne(proDetails).then((response) => {
                db.get.collection(process.env.USER_COLLECTION).updateOne(
                    { email: proDetails.comapanyId },
                    { $push: { companyProducts: response.insertedId } }
                )
                resolve(response.insertedId)
            })
        })
    }
}