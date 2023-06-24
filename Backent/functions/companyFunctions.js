import db from "../configuration/mongodb.js";
import collections from "../configuration/collections.js";

export default {
    addProduct:(proDetails)=>{
        
        db.get().collection(collections.PRODUCTS_COLLECTION).insertOne(proDetails).then((response)=>{
            db.get().collection(collections.USER_COLLECTION).updateOne(
                {_email:proDetails.comapanyId},
                { $push: { companyProducts : response.insertedId }}
            )
        });
    }
}