const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer")

router.post("/", auth, async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'info.ephemeralmind@gmail.com',
          pass: 'Calgary1234!' 
        }
      });

      let confirmation = await transporter.sendMail({
        from: '"Ephemeral Mind" <info@ephemeralmind.ca>', // sender address
        to: req.user.email, // list of receivers
        subject: "Ephemeral Mind: Thank you for the feature request", // Subject line
        text: `We've successfully received your service request for: ${req.body.feature.request}. Our developers will be reaching out should they have any questions - requests take about 2 weeks to complete. As some requests may be more challenging and time consuming than others, we cannot guarantee that we will be able to handle all requests.`, // plain text body
        html: `We've successfully received your service request for: ${req.body.feature.request}. Our developers will be reaching out should they have any questions - requests take about 2 weeks to complete. As some requests may be more challenging and time consuming than others, we cannot guarantee that we will be able to handle all requests.`, // html body
      });

      let ticket = await transporter.sendMail({
        from: '"Feature Request Service" <info@ephemeralmind.ca>', // sender address
        to: "cervantes.jfa@gmail.com", // list of receivers
        subject: "Ephemeral Mind: New Feature Request Received", // Subject line
        text: `A new feature request has been received from ${req.user.email}: ${req.body.feature.request}`, // plain text body
        html: `A new feature request has been received from ${req.user.email}: ${req.body.feature.request}`, // html body
      });

      console.log("Message sent: %s", req.body.feature.request);


      res.send({confirmation, ticket})

});


module.exports = router;