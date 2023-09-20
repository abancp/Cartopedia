import db from "../configuration/mongodb.js";

export default{
    getCompanyRequiests:async()=>{
      return new Promise(async(resolve,reject)=>{
        let companyRequiests= await db.collection(process.env.COMPANY_REQUIEST_COLLLECTION).find().toArray();
        resolve(companyRequiests)
      })
    },
    allowCompany:async(email)=>{
        let request = await db.collection(process.env.COMPANY_REQUIEST_COLLLECTION).findOne({email:email})
        db.collection(process.env.COMPANY_REQUIEST_COLLLECTION).deleteOne({email:email})
        db.collection(process.env.USER_COLLECTION).updateOne({email:email},{
          $set: {
            companyPending:false,
            company:true,
            companyDetails:request
        }
        })
    },
    denieCompany:(email)=>{
        db.collection(process.env.USER_COLLECTION).updateOne({email:email},{
          $set:{
            companyPending:false,
            company:false
          }
        })
        db.collection(process.env.COMPANY_REQUIEST_COLLLECTION).deleteOne({email:email})
    }
}