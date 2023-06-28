import multer from "multer";
import fs from "fs";

export var storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/user-profiles')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.email + ".jpg")
    }
});
export const uploadProfile = multer({ storage: storageProfile })

export var storageProductDisplay = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/product-displays')
    },
    filename: (req, file, cb) => {
        cb(null, req.body._id + ".jpg")
    }
});
export const uplaodProductDisplay = multer({ storage: storageProductDisplay })

export var storageProductDetailed = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("./public/product-details/"+req.body._id)) {
            fs.mkdirSync("./public/product-details/"+req.body._id);
          }
        cb(null, './public/product-details/'+req.body._id)
    },
    filename: (req, file, cb) => {
        const index = req.body.index
        if(index.length < 1){
            var i = 1
        }else{
            var i = parseInt(index[index.length-1])+1
        }
        cb(null, req.body._id+"("+i+")"+".jpg")
    }
});
export const uplaodProductDetailed = multer({ storage: storageProductDetailed })