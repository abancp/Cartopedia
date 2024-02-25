import express from "express";
import register, {
  checkEmailExist,
  checkPhoneExist,
  checkUserNameExist,
} from "../authuntication/register.js";
import login from "../authuntication/login.js";
import getUserDetails from "../authuntication/getUserDetails.js";
import userFunctions from "../helpers/userHelpers.js";
import verifyToken from "../middeleware/verifytoken.js";
import fs from "fs";
import { createHmac } from "crypto";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ string: " Welcome to cartopedia Server " });
});

router.post("/register", register);

router.post("/login", login);

router.get("/check-email-availability/:email", (req, res) => {
  checkEmailExist(req.params.email).then((emailResponse) => {
    res.json({ email: emailResponse });
  });
});

router.get("/check-phone-availability/:phone", (req, res) => {
  checkPhoneExist(req.params.phone).then((phoneResponse) => {
    res.json({ phone: phoneResponse });
  });
});

router.get("/check-username-availability/:username", (req, res) => {
  checkUserNameExist(req.params.username).then((userNameResponse) => {
    res.json({ username: userNameResponse });
  });
});

router.post("/get-user-details", getUserDetails);

router.get("/get-cover-photo", (req, res) => {
  userFunctions
    .getRandomCoverPicture()
    .then((coverPhotoName) => {
      res.json({ coverPhotoName });
    })
    .catch((err) => res.status(500).json({ err }));
});

router.get("/get-indrested-item", (req, res) => {
  const { email } = req.cookies
  userFunctions.getUserIndrestedItem(email).then((indrestedItem) => {
    res.json({ indrestedItem: indrestedItem });
  });
});

router.get("/get-trending-products", (req, res) => {
  userFunctions.getTrendingProducts().then((response) => {
    res.status(200).json({ products: response });
  });
});

router.post("/check-companyname-availablility", verifyToken, (req, res) => {
  userFunctions
    .checkCompanyNameExist(req.body.companyName)
    .then((companynameResponose) => {
      userFunctions
        .checkWebsiteExist(req.body.website)
        .then((websiteResponse) => {
          res.status(200).json({
            companyName: companynameResponose,
            website: websiteResponse,
          });
        });
    });
});

router.post("/get-otp-email", (req, res) => {
  let otp = Math.floor(100000 + Math.random() * 900000);
  let { email } = req.body;
  userFunctions.getEmailOtp(email, otp);
  res.json({ true: true });
});

router.post("/add-company-temparerly", (req, res) => {
  userFunctions.requestAddDetailsToOtp(req.body).then((email) => {
    res.json({ true: true });
  });
});

router.post("/requset-add-company", (req, res) => {
  userFunctions.requistRegisterCompany(req.body);
  res.json({ true: true });
});

router.post("/submit-otp", (req, res) => {
  let { email, otp } = req.body;
  userFunctions
    .submitEmailOtp(email, otp)
    .then((response) => {
      res.json({ verify: response });
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.get("/search/:searchedLine", (req, res) => {
  const { email } = req.cookies
  const startTime = Date.now()
  userFunctions
    .searchProduct(req.params.searchedLine, email)
    .then((result) => {
      res.json(result);
    });
});

router.get("/product/:id", (req, res) => {
  userFunctions.getProduct(req.params.id).then((product) => {
    res.json(product);
  });
});

router.get("/product-details/folder-size/:id", (req, res) => {
  fs.readdir("./public/product-details/" + req.params.id, (err, files) => {
    res.json({
      folderSize: files.length,
    });
  });
});

router.get("/cart-items", (req, res) => {
  const { userId } = req.cookies
  console.log(req.cookies)
  if (userId) {
    userFunctions.getCartProducts(userId).then(([products, totalPrice]) => {
      res.json({ products, totalPrice });
    });
  } else {
    res.json({ products: [{ useridnotPrvided: "undefined" }] });
  }
});

router.patch("/add-to-cart/:proId/:count", (req, res) => {
  const { proId, count } = req.params
  console.log(req.params)
  const { userId } = req.cookies
  userFunctions
    .addToCart(proId, count, userId)
    .then((ok) => {
      res.json(ok);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/cart-product", async (req, res) => {
  const { proId } = req.query
  const { userId } = req.cookies
  await userFunctions.removeCartProduct(userId, proId);
  res.json({ ok: "ok" });
});

router.post("/place-order/cart", (req, res) => {
  const { address, payMethode } = req.body;
  const { userId } = req.cookies
  userFunctions.placeOrderCart(userId, address, payMethode).then((order) => {
    userFunctions.clearCart(userId);
    res.json({ orderId: order.orderId, totalPrice: order.price });
  });
});

router.post("/verify-payment", (req, res) => {
  const { payment } = req.body;
  let hmac = createHmac("sha256", "EYKX7BDf58oQBqEjreQYuUPD");
  hmac.update(payment.razorpay_order_id + "|" + payment.razorpay_payment_id);
  hmac = hmac.digest("hex");
  if (hmac === payment.razorpay_signature) {
    userFunctions.paymentSuccess(payment.razorpay_order_id);
    res.status(200);
  } else {
    res.status(402).json({ error: "payment_failed" });
  }
});

router.get("/orders", (req, res) => {
  const { userId } = req.query;
  userFunctions.getOrders(userId).then(([orders, products]) => {
    res.json({ orders, products });
  });
});

router.patch("/rate-product", (req, res) => {
  const { proId, rate, userId } = req.query;
  userFunctions.rateProduct(proId, rate, userId).then((rating) => {
    res.json({ rating });
  });
});

router.get("/recommented", (req, res) => {
  const { userId } = req.cookies
  userFunctions.getRecommentedRatedProducts(userId).then((products) => {
    res.json({ products });
  });
});

export default router;
