import db from "../configuration/mongodb.js"

export default {
    addProduct: (proDetails) => {
        return new Promise((resolve, reject) => {
            proDetails["trend"] = 0
            proDetails["rating"] = {
                rate: 0,
                totalRatings: 0,
                rates: [0, 0, 0, 0, 0]
            }
            db.get().collection(process.env.PRODUCTS_COLLECTION).insertOne(proDetails).then(async (response) => {
                db.get().collection(process.env.USER_COLLECTION).updateOne(
                    { email: proDetails.comapanyId },
                    { $push: { companyProducts: response.insertedId } }
                )
                let key = 'products.' + proDetails.category
                db.get().collection(process.env.DASHBOARD_COLLECTION).updateOne({ item: "dashboard" }, { $inc: { "company.products": 1 } })
                resolve(response.insertedId)
            })
        })
    },
    createCategoryReq: async (name, companyId) => {

        let category = await db.categories.findOne({ name })

        if (!category) {
            db.categoryRequests.insertOne({ name, companyId })
            return "Requested Successfully"
        } else {
            return "Category already exist"
        }
    },
    acceptCategoryReq: async (name) => {

        const indexInfo = await db.categories.indexInformation()
        const indexKeys = Object.keys(indexInfo)
        if (indexKeys.includes('location_2d')) {
            db.categories.insertOne({
                name,
                products: [],
                location: {
                    type: 'Point',
                    coordinates: [0, 0]
                }
            })
        } else {
            await categoriesCollection.createIndex({ location: '2d' })
            db.categories.insertOne({
                name,
                products: [],
                location: {
                    type: 'Point',
                    coordinates: [0, 0]
                }
            })
        }

        db.categoryRequests.deleteOne({ name })
        return "Request Accepted"
    },
    getAllCategories: () => {
        return new Promise(async (resolve, reject) => {
            let categories = db.categories.aggregate([{$project:{name:1}}])
            resolve(categories)
        })
    },
    checkCompayProduct: (product) => {
        console.log(product)
        return new Promise(async (resolve, reject) => {
            let productNameErr = []
            if (product.productName.length > 100) productNameErr.push(" More than 50 charectors ")
            if (await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ name: product.productName })) productNameErr.push("  This product allready registerd  ")

            let productPriceErr = []
            if (product.prodctPrice > 500_000) productPriceErr.push(" Maximum 500,000 ₹ ")
            if (!/^\d*$/.test(product.productPrice)) productPriceErr.push(" Invalid Price ")
            let productMrpErr = []

            if (product.productMrp > 500_000) productMrpErr.push(" Maximum 500,000 ₹ ")
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