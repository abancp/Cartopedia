import db from "../configuration/mongodb.js";
import collections from "../configuration/collections.js";

export default{
    getCompanyRequiests:async()=>{
      return new Promise(async(resolve,reject)=>{
        let companyRequiests= await db.get().collection(collections.COMPANY_REQUIEST_COLLLECTION).find().toArray();
        resolve(companyRequiests)
      })
    },
    allowCompany:(email)=>{
      return new Promise(async(resolve,reject)=>{
        let request = await db.get().collection(collections.COMPANY_REQUIEST_COLLLECTION).findOne({email:email})
        db.get().collection(collections.COMPANY_REQUIEST_COLLLECTION).deleteOne({email:email})
        db.get().collection(collections.USER_COLLECTION).updateOne({email:email},{
          $set: {
            companyPending:false,
            company:true,
            companyDetails:request
        }
        })
      })
    },
    denieCompany:(email)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collections.USER_COLLECTION).updateOne({email:email},{
          $set:{
            companyPending:false,
            company:false
          }
        })
        db.get().collection(collections.COMPANY_REQUIEST_COLLLECTION).deleteOne({email:email})
      })
    }
}