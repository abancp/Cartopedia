import multer from "multer";
import fs from "fs";

const uploadProfile = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/user-profiles'),
    filename: (req, file, cb) => cb(null, req.body.email + ".jpg")
}) })

const uplaodProductDisplay = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/product-displays'),
    filename: (req, file, cb) => cb(null, req.body._id + ".jpg")
}) })

const uplaodProductDetailed = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("./public/product-details/" + req.body._id)) {
            fs.mkdirSync("./public/product-details/" + req.body._id);
        }
        cb(null, './public/product-details/' + req.body._id)
    },
    filename: (req, file, cb) => {
        const index = req.body.index
        if (index.length < 1) {
            var i = 1
        } else {
            var i = parseInt(index[index.length - 1]) + 1
        }
        cb(null, req.body._id + "(" + i + ")" + ".jpg")
    }
}) })

const uploadCoverPhoto = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, './public/cover-photos'),
        filename: (req, file, cb) => cb(null, req.body.photoname + ".jpg")
    })
})

export default {
    uploadProfile,
    uploadProfile,
    uplaodProductDisplay,
    uplaodProductDetailed,
    uploadCoverPhoto
}