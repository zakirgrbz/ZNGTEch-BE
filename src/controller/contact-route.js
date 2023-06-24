import express from 'express';
import contactRepository from '../repository/contact-repository.js';
import nodemailer from "nodemailer";

const router = express.Router();


router.post('/', async (req, res, next) => {
   try {
      const  emailContent  = req.body;
      const content = await contactRepository.createEmail(emailContent);
      await contactEmail(emailContent);
      return res.send(content);
   } catch (error) {
      return next({ status: 500, message: error.message });
   }
});

async function contactEmail(pEmailContent) {
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
      to: pEmailContent.email,
      subject: "Contact Email",
      html: `<h1>Welcome to ZNG Tech </h1> <h3>${pEmailContent.message}</h3> <h4>from : ${pEmailContent.name}</h4>`,
      attachements: [],
    });
  
    console.log("Message sent: %s", info.messageId);
    return info;
  }

export default router;
