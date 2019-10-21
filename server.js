const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const colors = require("colors");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");
const flash = require('connect-flash');
// const sendEmail = require('./models/sendEmail');
//const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_ACCOUNT_TOKEN
);

//**************************************************************************** */
require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // TODO: your gmail account
        pass: process.env.PASSWORD  // TODO: your gmail password
    }
});
//**************************************************************************** */
//twilio receive mgs starts
const http = require('http');
// const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
// const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(pino);

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  
  // var msgR='Ready';
  // if (req.body.Body == msgR.trim()) {
  
  if (((req.body.Body).trim().toLowerCase()) == 'ready') {

    // Step 2
    let mailOptions = {
      from: '"EZ Valet" <belljulio66@gmail.com>',
      to: ["belljulio66@gmail.com"],
      subject: "New Customer Message - Ready",
      text: "From: "+req.body.From
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
          return log('Error occurs');
      }
      return log('Email sent!!!');
    });
    twiml.message('Your vehicle will be ready for pickup within 5 minutes. If you need more time simply reply "Wait". You will receive a text notification once your vehicle is ready for pickup.');
  } else if (((req.body.Body).trim().toLowerCase()) == 'wait') {
    // Step 2
    let mailOptions = {
      from: '"EZ Valet" <belljulio66@gmail.com>',
      to: ["belljulio66@gmail.com"],
      subject: "New Customer message - Wait",
      text: "From: "+req.body.From
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
          return log('Error occurs');
      }
      return log('Email sent!!!');
    });
    twiml.message('No worries! Please reply "Ready" to this message again when ever you are ready to pick up your car. Thank you! 😊');
  } else {
    twiml.message(
      'Please only reply with either "Ready" or "Wait" to get the response from us. Thanks! 😊'
    );
  }

//   twiml.message('Your vehicle will be ready to pick up in 5 minutes. Please see us at the valet desk!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server for twilio is listening on port 1337');
});
//twilio receive mgs ends
//**************************************************************************** */
//**************************************************************************** */
//twilio send mgs starts
// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
      console.log("notification sent");
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});
//twilio send msg ends
//**************************************************************************** */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(flash())
app.use(express.static("public"));
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

function sendNotification(message) {
        sendEmail('belljulio66@gmail.com, belljulio66@gmail.com', 'test  notification', message);
        console.log('Email sent');
    }


// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Pro3_db_dev", { useNewUrlParser: true }, function(err) {
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/EZvalpark_db_dev", { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log(`mongoose connection successful`.yellow);
    app.listen(PORT, (err)=> {
        if (err) throw err;
        console.log(`connected on port ${PORT}`.cyan)
    });
});

