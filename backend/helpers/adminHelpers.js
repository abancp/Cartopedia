import { ObjectId } from "mongodb";
import db from "../configuration/mongodb.js";
import fs from 'fs'

export default {
  getCompanyRequiests: async () => {
    return new Promise(async (resolve, reject) => {
      let companyRequiests = await db.get().collection(process.env.COMPANY_REQUIEST_COLLLECTION).find().toArray();
      resolve(companyRequiests)
    })
  },
  allowCompany: async (email) => {
    let request = await db.get().collection(process.env.COMPANY_REQUIEST_COLLLECTION).findOne({ email: email })
    db.get().collection(process.env.COMPANY_REQUIEST_COLLLECTION).deleteOne({ email: email })
    db.get().collection(process.env.USER_COLLECTION).updateOne({ email: email }, {
      $set: {
        companyPending: false,
        company: true,
        companyDetails: request
      }
    })
  },
  denieCompany: async (email) => {
    await db.get().collection(process.env.USER_COLLECTION).updateOne({ email: email }, {
      $set: {
        companyPending: false,
        company: false
      }
    })
    await db.get().collection(process.env.COMPANY_REQUIEST_COLLLECTION).deleteOne({ email: email })
  },
  getAllProducts: (skip) => {
    return new Promise(async (resolve, reject) => {
      let products = await db.get().collection(process.env.PRODUCTS_COLLECTION).find().sort({ _id: 1 }).skip(Number(skip)).limit(20).toArray()
      resolve(products)
    })
  },
  deleteCompanyProduct: (proId) => {
    //FIXME : deleting company poducts from company database
    db.get().collection(process.env.PRODUCTS_COLLECTION).deleteOne({ _id: new ObjectId(proId) })
    fs.unlink('./public/product-displays/' + proId + ".jpg", (err) => {
      if (err) {
        console.log('specified file not excist')
      }
    })
  },
  getCategoryReqs:()=>{
    return new Promise((resolve,reject)=>{
      let reqs = db.categoryRequests.find().toArray()
      resolve(reqs)
    })
  },
  acceptCategoryReq: (name) => {
    return new Promise(async (resolve, reject) => {
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
      resolve("Request Accepted")
    })
  },
  rejectCategoryReq: (name) => {
    return new Promise((resolve,reject)=>{
      db.categoryRequests.deleteOne({ name })
      resolve("Rejected Successfully")
    })
  },
}