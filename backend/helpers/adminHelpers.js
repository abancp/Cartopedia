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
  }
}