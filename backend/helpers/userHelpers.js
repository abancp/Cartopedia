import fs from "fs";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import levenshtein from "fast-levenshtein";
import db from "../configuration/mongodb.js";
import mailer from "../configuration/nodemailer.js";
import instance from "../configuration/razorpay.js";
import { nanoid } from "nanoid";

export default {
  getRandomCoverPicture: () => {
    return new Promise((resolve, reject) =>
      fs.readdir("./public/cover-photos", (err, files) =>
        err
          ? reject(err)
          : resolve(files[Math.round(Math.random() * (files.length - 1))])
      )
    );
  },
  getUserIndrestedItem: (email) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(process.env.USER_COLLECTION)
        .findOne({ email: email });
      if (user) {
        let itemId = await user.indrestedItems[Math.round(Math.random() * 2)];
        if (itemId === null || itemId === undefined) {
          for (let i = 0; i < 8; i++) {
            itemId = await user.indrestedItems[Math.round(Math.random() * 2)];
            if (itemId !== null && itemId !== undefined) {
              let item = await db
                .get()
                .collection(process.env.PRODUCTS_COLLECTION)
                .findOne({ _id: itemId });
              resolve(item);
            }
          }
          resolve({ err: "the specified user not have indrested item now!" });
        } else {
          let item = await db
            .get()
            .collection(process.env.PRODUCTS_COLLECTION)
            .findOne({ _id: itemId });
          resolve(item);
        }
      } else {
        resolve({ err: "user not found" });
      }
    });
  },
  getTrendingProducts: () => {
    return new Promise(async (resolve, reject) => {
      const cursor = await db
        .get()
        .collection(process.env.PRODUCTS_COLLECTION)
        .find()
        .sort({ trend: -1 })
        .limit(20);
      let pros = [];
      for await (const doc of cursor) {
        pros.push(doc);
      }
      resolve(pros);
    });
  },
  getUserDetails: (email) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(process.env.USER_COLLECTION)
        .findOne({ email: email });
      if (user) resolve(user);
    });
  },
  checkCompanyNameExist: (companyName) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(process.env.USER_COLLECTION)
        .findOne({ companyDetails: { companyName: companyName } })
        .then((company) => {
          company ? resolve(true) : resolve(false);
        });
    });
  },
  checkWebsiteExist: (website) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(process.env.USER_COLLECTION)
        .findOne({ companyDetails: { website: website } })
        .then((company) => {
          if (company) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  },
  requestAddDetailsToOtp: (companyDetails) => {
    console.log(companyDetails);
    return new Promise(async (resolve, reject) => {
      let { companyName, website, location, categories, description, email } =
        companyDetails;
      db.users.updateOne(
        { email: email },
        {
          $set: {
            companyRequestDetails: {
              companyName,
              website,
              location,
              categories,
              description,
              email,
              date: Date.now(),
            },
          },
        }
      );
      await db
        .get()
        .collection(process.env.DASHBOARD_COLLECTION)
        .updateOne({ item: "dashboard" }, { $inc: { "company.companies": 1 } });
      resolve(email);
    });
  },
  getEmailOtp: async (email, otp) => {
    console.log(otp)
    let mailDetails = {
      from: "cartopediaa@gmail.com",
      to: email,
      subject: "Email Verification Code from Cartopedia",
      html: `<div style="border:solid white 1px">   
            <h1 style="text-align:center;color:darkcyan;padding-top:1rem">Catopedia Email Verification</h1>
            <p style="margin:1rem">Hi<br/>We received a request to verify your email <span style="color:blue">${email}</span>.your email verification code is:</p>
            <h2 style="text-align:center;font-size:30px;font-weight:700">${otp}</h2>
            <p style="margin:1rem">if you dod not request this code,it is possible that someone else is trying to register your email <span style="color:blue">${email}</span> as a company in Cartopedia.Do not forward or give this code to anyone.</p>
            <p style="margin:1rem">sincerely yours,</p>
            <p style="margin-left:1rem">Cartopedia team</p>
          </div>`,
    };

    mailer.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    db.get()
      .collection(process.env.USER_COLLECTION)
      .updateOne(
        { email: email },
        {
          $set: {
            emailOtp: await bcrypt.hash("" + otp, 10),
            emailOtpDate: Date.now(),
            emailOtpExpareDate: Date.now() + 60000,
          },
        }
      );
  },
  submitEmailOtp: (email, otp) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(process.env.USER_COLLECTION)
        .findOne({ email: email });
      if (user.emailOtpExpareDate > Date.now()) {
        if (await bcrypt.compare("" + otp, user.emailOtp)) {
          db.users
            .updateOne(
              { email: email },
              {
                $set: {
                  verifyEmail: true,
                  companyPending: true,
                  companyRequestDetails: {},
                },
              }
            );
          let tempCompany = user.companyRequestDetails;
          db.get()
            .collection(process.env.COMPANY_REQUEST_COLLECTION)
            .insertOne(tempCompany);
          resolve(true);
        } else {
          console.log("otp incorrect");
          reject("otpErr");
        }
      } else {
        console.log("otp time out");
        reject("timeError");
      }
    });
  },
  searchProduct: (searchedLine, email) => {
    let keywords = searchedLine.split(" ");
    return new Promise(async (resolve, reject) => {
      let startTime = Date.now()
      let result = {
        categories: [],
        companies: [],
        products: null,
        time: 0
      };
      let tempProducts = [];
      let companies = await db.get().collection(process.env.USER_COLLECTION).aggregate([
        { $unwind: "$companyDetails" },
        { $match: { "companyDetails.companyName": searchedLine } },
        {
          $project: {
            "companyDetails.companyName": 1,
            _id: 1,
            "companyDetails.website": 1,
            "companyDetails.email": 1,
            "companyDetails.description": 1,
          },
        },
      ]).toArray();
      result.companies.push(companies);
      let totalCategories = await db.get().collection(process.env.CATEGORIES_COLLECTION).find({}).toArray();
      console.log(totalCategories);
      totalCategories.forEach((category) => {
        for (let i = 0; i < keywords.length; i++) {
          if (parseFloat(Number((100 - (levenshtein.get(category.name, keywords[i].toLowerCase()) / keywords[i].length) * 100) / 100.0).toFixed(3)) > 0.85) {
            result.categories.push(keywords[i])
          }
        }
      });
      let products = await db.get().collection(process.env.PRODUCTS_COLLECTION).aggregate([
        {
          $project: {
            name: 1,
            tags: 1,
            price: 1,
            category: 1,
            description: 1,
            date: 1,
            trend: 1,
            comapanyId: 1,
            companyName: 1,
            stock: 1,
            mrp: 1,
            displayUrl: 1
          },
        }
      ]).toArray();
      let final = {
        length: 0,
        diff: 0,
      };
      products.forEach((product) => {
        final.length = product.name.length;
        final.diff = levenshtein.get(searchedLine, product.name);
        product.priority = parseFloat(
          Number((100 - (final.diff / final.length) * 100) / 100.0).toFixed(3)
        );
        product.tags.forEach((tag) => {
          let tagDiff = parseFloat(Number((100 - (levenshtein.get(searchedLine, tag) / tag.length) * 100) / 100.0).toFixed(3));
          switch (true) {
            case tagDiff >= 0.95:
              product.priority = product.priority + 1;
              break;
            case tagDiff >= 0.8:
              product.priority = product.priority + 0.9;
              break;
            case tagDiff >= 0.65:
              product.priority = product.priority + 0.85;
              break;
            case tagDiff >= 0.5:
              product.priority = product.priority + 0.8;
              break;
            case tagDiff >= 0.45:
              product.priority = product.priority + 0.7;
              break;
            default:
              break;
          }
        });
        switch (true) {
          case product.priority >= 0.3:
            if (product.priority > 1) {
              product.priority = 1;
            }
            tempProducts.push(product);
            break;
          case product.priority <= 0:
            product.priority = 0;
          default:
            break;
        }
      });
      tempProducts.sort((a, b) => b.priority - a.priority);
      result.products = tempProducts;
      if (email !== undefined && email !== null) {
        switch (true) {
          case tempProducts.length > 2:
            db.get().collection(process.env.USER_COLLECTION).updateOne(
              { email: email },
              {
                $set: {
                  indrestedItems: [
                    tempProducts[0]._id,
                    tempProducts[1]._id,
                    tempProducts[2]._id,
                  ],
                },
              }
            );
            break;
          case tempProducts.length > 1:
            db.get().collection(process.env.USER_COLLECTION).updateOne(
              { email: email },
              {
                $set: {
                  indrestedItems: [tempProducts[0]._id, tempProducts[1]._id],
                },
              }
            );
            break;
          case tempProducts.length > 0:
            db.get().collection(process.env.USER_COLLECTION).updateOne(
              { email: email },
              {
                $set: { indrestedItems: [tempProducts[0]._id] },
              }
            );
            break;
          default:
            break;
        }
      }
      result.time = Date.now() - startTime
      resolve(result);
    });
  },
  getProduct: (id) => {
    return new Promise((resolve, reject) => {
      try {
        var objId = new ObjectId(id);
      } catch (BSONError) {
        resolve("Not a valid Product Id");
      }
      db.get().collection(process.env.PRODUCTS_COLLECTION).findOne(objId).then((product) => {
        resolve(product);
      });
    });
  },
  addToCart: (proId, count, userId) => {
    count = Number(count);
    return new Promise(async (resolve, reject) => {
      let cart = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId });
      const product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(proId) });
      const price = Number(product.price);
      let productCount;
      const key = "cartItems." + proId;
      const setingObj = {};
      if (!cart) {
        await db.get().collection(process.env.CART_COLLECTION).insertOne({ userId, cartItems: {}, totalPrice: 0 });
        cart = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId });
      }
      const totalPrice = price * count;
      if (cart.totalPrice + totalPrice > 499_999) {
        reject({ cartPriceLimitErr: true });
      } else {
        if (cart.cartItems) productCount = cart.cartItems[proId];
        console.log(productCount)
        if (productCount) {
          setingObj[key] = productCount + count;
        } else {
          setingObj[key] = count;
        }
        db.get().collection(process.env.CART_COLLECTION).updateOne(
          { userId },
          {
            $set: setingObj,
            $inc: { totalPrice: Number(totalPrice) },
          }
        );
        //TODO: seting indrested category from addToCart
        resolve({ ok: "ok" });
      }
    });
  },
  getCartProducts: (userId) => {
    return new Promise(async (resolve, reject) => {
      const cart = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId });
      var products;
      var totalPrice = cart?.totalPrice;
      if (cart) {
        const productIds = Object.keys(cart.cartItems);
        products = [];
        for (var i = 0; i < productIds.length; i++) {
          let product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(productIds[i]) });
          let resProduct = product
            ? product
            : { _id: productIds[i], deleted: true, price: 0 };
          resProduct.count = cart.cartItems[resProduct._id];
          products.push(resProduct);
        }
      } else {
        resolve([[], 0]);
      }
      resolve([products, totalPrice]);
    });
  },
  removeCartProduct: (userId, proId) => {
    return new Promise(async (resolve, reject) => {
      let key = "cartItems." + proId;
      let product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(proId) });
      let { cartItems } = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId });
      let count = cartItems[proId];
      let price = product?.price * count;
      db.get().collection(process.env.CART_COLLECTION).updateOne(
        { userId },
        {
          $unset: { [key]: 1 },
          $inc: { totalPrice: -price },
        }
      );
      resolve()
    })
  },
  placeOrderCart: (userId, address, pay) => {
    return new Promise(async (resolve, reject) => {
      let cart = await db.get().collection(process.env.CART_COLLECTION).findOne({ userId });
      if (cart) {
        db.get().collection(process.env.ORDER_COLLECTION)
          .insertOne({
            userId,
            products: cart.cartItems,
            totalPrice: Number(cart.totalPrice),
            orderDate: Date.now(),
            payment: "pending",
            address: address,
            delivery: "not started",
          })
          .then((res) => {
            if (pay !== "COD") {
              let options = {
                amount: cart.totalPrice * 100,
                currency: "INR",
                receipt: "" + res.insertedId,
              };
              instance.orders.create(options, function (err, order) {
                db.get()
                  .collection(process.env.ORDER_COLLECTION)
                  .updateOne(
                    { _id: new ObjectId(res.insertedId) },
                    {
                      $set: { orderId: order.id },
                    }
                  );
                resolve({
                  orderId: order.id,
                  price: Number(cart.totalPrice) * 100,
                });
              });
            } else {
              let orderId = "cod" + nanoid(9);
              db.get()
                .collection(process.env.ORDER_COLLECTION)
                .updateOne(
                  { _id: new ObjectId(res.insertedId) },
                  {
                    $set: { orderId: orderId },
                  }
                );
              resolve({ orderId, price: Number(cart.totalPrice) * 100 });
            }
          });
      }
    });
  },
  paymentSuccess: (orderId) => {
    return new Promise((resolve, reject) => {
      db.get().collection(process.env.ORDER_COLLECTION).updateOne(
        { orderId },
        {
          $set: { payment: "success" },
        }
      );
      resolve();
    });
  },
  clearCart: (userId) => {
    return new Promise((resolve, reject) => {
      db.get().collection(process.env.CART_COLLECTION).deleteOne({ userId });
    });
  },
  getOrders: (userId) => {
    return new Promise(async (resolve, reject) => {
      const orders = await db.get().collection(process.env.ORDER_COLLECTION).find({ userId }).sort({ _id: 1 }).toArray();
      var orderProducts = [];
      for (var j = 0; j < orders.length; j++) {
        var products;
        const productIds = Object.keys(orders[j].products);
        products = [];
        for (var i = 0; i < productIds.length; i++) {
          let product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(productIds[i]) });
          let resProduct = product
          resProduct.count = orders[j].products[resProduct._id];
          products.push(resProduct);
        }
        orderProducts.push(products);
      }
      resolve([orders, orderProducts]);
    });
  },
  rateProduct: (proId, rate, userId) => {
    //TODO : same user cant rate more than one time
    rate = Number(rate);
    return new Promise(async (resolve, reject) => {
      const product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(proId) });
      if (!product.rating) {
        db.get().collection(process.env.PRODUCTS_COLLECTION).updateOne({ _id: new ObjectId(proId) }, {
          $set: {
            "rating": {
              "rate": 0,
              "totalRatings": 0,
              "rates": [0, 0, 0, 0, 0]
            }
          }
        })
      }
      const rates = product.rating.rates;
      var newRating;
      var totalValueSum = 0;
      rates[5 - rate]++;
      product.rating.rates = rates;
      product.rating.totalRatings++;
      for (var i = 5; i > 0; i--) {
        totalValueSum += rates[5 - i] * i;
      }
      const newRate = totalValueSum / product.rating.totalRatings;
      newRating = {
        rate: newRate,
        totalRatings: product.rating.totalRatings,
        rates,
      };
      db.get().collection(process.env.PRODUCTS_COLLECTION)
        .updateOne(
          { _id: new ObjectId(proId) },
          {
            $set: { rating: newRating },
          }
        );
      resolve(newRating);
    });
  },
  arangeCategoryWithCart: async (userId) => {
    let earlyOrders = await db.orders.find({ userId }).limit(10).toArray();
    var categories = {};

    for (const order of earlyOrders) {
      for (const productId of Object.keys(order.products)) {
        let product = await db.products.findOne({ _id: new ObjectId(productId) });
        if (!categories[product.category]) {
          categories[product.category] = product.category;
        }
      }
    }
    // if (Object.keys(categories).length > 1){
    //   // db.categories.updateOne({})
    // }
  },
  getRecommentedRatedProducts: (userId) => {
    return new Promise(async (resolve, reject) => {
      if (userId) {
        const user = await db.get().collection(process.env.USER_COLLECTION).findOne({ _id: new ObjectId(userId) });
        const product = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(user.indrestedItems[0]) });
        const relatedProducts = await db.get().collection(process.env.PRODUCTS_COLLECTION).find({ "rating.rate": { $gt: 0 }, category: product?.category }).limit(4).toArray();
        while (relatedProducts.length < 4) {
          break
          let checkedCategories = {}
          //TODO: resolving minimum 4 products
        }
        resolve(relatedProducts);
      } else {
        //TODO: recomended products without userId
      }
    });
  },
  getRecommentedCategories: (userId) => {
    console.log(userId);
    return new Promise(async (resolve, reject) => {
      let categories = {}
      if (userId) {
        const user = await db.get().collection(process.env.USER_COLLECTION).findOne({ _id: new ObjectId(userId) })
        if (user.indrestedItems) {
          user.indrestedItems?.forEach(async (itemId) => {
            const item = await db.get().collection(process.env.PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(itemId) })
            if (!item.category in categories) {
              categories[item.category] = item.category
            }
          })
          let categoriesList = Object.keys(categories)
          console.log(categoriesList)
          if (categoriesList.length >= 4) {
            if (categoriesList.length > 4) {
              resolve(categoriesList.slice(0, 3))
            } else {
              resolve(categoriesList)
            }
          } else {
            while (categoriesList.length < 4) {
              break
            }
            resolve(categoriesList)
          }
        } else {
          //TODO: recomented categories without indrested items
        }
      } else {
        //TODO: recomented categories without userId
      }
    })
  }
};
