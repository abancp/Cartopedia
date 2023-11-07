import db from "../configuration/mongodb.js"

export default {
    addProduct: (proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(process.env.PRODUCTS_COLLECTION).insertOne(proDetails).then(async (response) => {
                db.get().collection(process.env.USER_COLLECTION).updateOne(
                    { email: proDetails.comapanyId },
                    { $push: { companyProducts: response.insertedId } }
                )
                await db.get().collection(process.env.DASHBOARD_COLLECTION).updateOne({ item: "dashboard" }, { $inc: { "company.products": 1 } })
                resolve(response.insertedId)
            })
        })
    },
    getAllCategories: () => {
        return new Promise(async (resolve, reject) => {
            let categoryDoc = await db.get().collection(process.env.CATEGORIES_COLLECTION).find().toArray()
            resolve(categoryDoc[0].categories)
        })
    },
    checkCompayProduct: (product) => {
        console.log(product)
        return new Promise(async (resolve, reject) => {
            let productNameErr = []
            if (product.productName.length > 100) productNameErr.push(" More than 50 charectors ")
            if (await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ name: product.productName })) productNameErr.push("  This product allready registerd  ")

            let productPriceErr = []
            if (product.prodctPrice > 1000000) productPriceErr.push(" Maximum 1,000,000 ₹ ")
            if (!/^\d*$/.test(product.productPrice)) productPriceErr.push(" Invalid Price ")
            let productMrpErr = []

            if (product.productMrp > 1000000) productMrpErr.push(" Maximum 1,000,000 ₹ ")
            if (!/^\d*$/.test(product.productMrp)) productMrpErr.push(" Invalid Price ")
            if (parseInt(product.productMrp) < parseInt(product.productPrice)) productMrpErr.push(" Mrp must be greater than your price ")

            let productCategoryErr = []
            if (product.productCategory == 0) productCategoryErr.push(" Select a Category ")
            const categoryDoc = await db.get().collection(process.env.CATEGORIES_COLLECTION).find().toArray()
            const categories = categoryDoc[0].categories
            if (!categories.includes(product.productCategory)) productCategoryErr.push(" Not a valid category ")

            let productTagsErr = []
            product.productTags.forEach((tag) => {

            });
            if (product.productTags.length < 15) productTagsErr.push(" Minimum 15 tags ")

            let productStockErr = []
            if (product.productStock < 1) productStockErr.push(" Enter a valid stock ")
            if (!/^\d*$/.test(product.productStock)) productStockErr.push(" Not a valid stock ")

            let productDescriptionErr = []
            if (product.productDescription.length < 20) productDescriptionErr.push(" Description need minimum 20 charectors ")

            const errors = { productNameErr, productPriceErr, productMrpErr, productCategoryErr, productTagsErr, productStockErr, productDescriptionErr }
            resolve(errors)
        })
    }
}