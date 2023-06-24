import express from "express";
import sellRepository from "../repository/sell-repository.js";
import userRepository from "../repository/user-repository.js";
import nodemailer from "nodemailer";
import * as s3Service from "../service/s3-service.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", async (req, res, next) => {
  try {
    const userId = req.query.userId; 
    const order = req.query.order; 
    let posts;
    if (userId) {
      posts = await sellRepository.getPostsByUserId(userId, order);
    } else {
      posts = await sellRepository.getAllPosts(order);
    }
    return res.status(200).send(posts);
  } catch (error) {
    return next({ status: 404, message: error });
  }
});

// Create a new post
router.post("/", upload.single("laptopImage"), async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const user = await userRepository.getUserByEmail(userEmail);
    const newLaptop = req.body;
    await contactEmail(newLaptop,userEmail);
    const laptopImage = req.file;
    const fileName = `zngTech_${uuidv4()}`;
    const laptopImagePath = await s3Service.uploadFile(
      laptopImage.buffer,
      fileName,
      process.env.AWS_BUCKET_NAME
    );
    const newPost = await sellRepository.createSellNow(
      newLaptop,
      user.id,
      laptopImagePath.Location
    );
    return res.send(newPost);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

async function contactEmail(pLaptop, pEmail) {
  const gmailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hylmyl007@gmail.com",
      pass: "uxbnntbrpkpskmkq",
    },
    tls: { rejectUnauthorized: false },
    ignoreTLS: true,
  });

  const info = await gmailTransporter.sendMail({
    from: "hylmyl007@gmail.com",
    to: pEmail,
    subject: "Sell now",
    html: `<h1>Welcome to ZNG Tech </h1> <h3>Brand : ${pLaptop.brand}</h3> <h3> Model :${pLaptop.model}</h3> <h3> Generation : ${pLaptop.generation}</h3>`,
    attachements: [],
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}

export default router;
