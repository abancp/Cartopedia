import userRouter from "./user.routes.js";
import verifyCompany from '../middeleware/verifyCompany.js';
import companyRouter from "./company.routes.js";
import sellerRouter from "./seller.routes.js";
import adminRouter from "./admin.routes.js";
import verifyAdmin from '../middeleware/verifyAdmin.js';
import fileUploadingFunctions from '../helpers/fileUploadingHelpers.js'


export default function router(app) {

    // main routes
    app.use("/", userRouter);
    app.use("/admin", verifyAdmin, adminRouter);
    app.use("/company", verifyCompany, companyRouter);
    app.use("/seller", sellerRouter);

    //fileuploading routes
    app.use('/uplaod/user-profile', fileUploadingFunctions.uploadProfile.single('file'), (req, res) => { res.json({ uploaded: true }) })
    app.use('/uplaod/product-display', verifyCompany, fileUploadingFunctions.uplaodProductDisplay.single('file'), (req, res) => { res.json({ uploaded: true }) })
    app.use('/uplaod/cover-photo', verifyAdmin, fileUploadingFunctions.uploadCoverPhoto.single('file'), (req, res) => { res.json({ uploaded: true }) })
    app.use('/uplaod/product-details', verifyCompany, fileUploadingFunctions.uplaodProductDetailed.array('files'), (req, res) => { res.json({ uploaded: true }) })

    app.use((req, res) => res.status(404));

}