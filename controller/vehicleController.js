require('dotenv').config();
const ObjectId = require('mongoose').Types.ObjectId;
const db = require("../models");
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
});
//Twilio code to send text starts
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const client = require('twilio')(accountSid, authToken);
// Defining methods for the vehiclesController
module.exports = {
  findAll: function (req, res) {
    db.Vehicle
      .find(req.query)
      .sort({ createdAt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Vehicle
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("here's the create function")
    // pullEmails();
    const mailOptions = {
      from: '"EZ Valet" <belljulio66@gmail.com>',
      to: ["belljulio66@gmail.com"],
      subject: "EZ Valet- New vehicle registration!",
      text: "A new vehicle "+req.body.vehicleinfo+" ("+" id # "+req.body.customerId+") "+"has been succussfully registered. "
      +"Registered Phone is "+req.body.pocphone+" ."
    };
    transport.sendMail(mailOptions, function (error, info) {
      console.log("transport is sending Mail.")
      if (error) {
        return console.log(error);
      }
      //twilio create message starts
        client.messages
        .create({
          body: 'Thank you for parking your vehicle with us. Your e-ticket # is '+req.body.customerId+'. You will need this e-ticket # when you are ready to pickup your vehicle back. You can simply reply "Ready" to this message and we will have your car ready for pickup within 5 minutes.',        from: process.env.TWILIO_PHONE_NUMBER,
        mediaUrl: [req.body.mediaUrl],
        to:[req.body.pocphone]
      })
      .then(message => console.log("twilio message sent"+message.sid));
      console.log('Email message sent: ' + info.response);
      //twilio create message ends
    });
    db.Vehicle
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log(req.body)
    db.Vehicle
      .findOneAndUpdate({ _id: new ObjectId(req.params.id) }, req.body)
      .then(dbModel => {
        console.log("updated model")
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Vehicle
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  ,
  statsByWeek: function (req, res) {
    let now = new Date();
    let sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 15)
    console.log('now', now)
    console.log('sevenDaysAgo', sevenDaysAgo)
    db.Vehicle
      .aggregate([
        { $match: { createdAt: { $gt: sevenDaysAgo } } },
        {
          $group: {
            _id: {
              year: { $year: { date :"$createdAt", timezone: "America/New_York"}},
              month: { $month: { date :"$createdAt", timezone: "America/New_York"}},
              day: { $dayOfMonth: { date:"$createdAt", timezone: "America/New_York"}},
            },
            count: { $sum: 1 }
          }
        }
      ]).then(results => {
        console.log('results', results)
        let response = { data: [], labels: [] };
        let grouped = results.map(e => {
          let { year, month, day } = e._id;
          let key = year + "-" + month + "-" + day;
          let value = e.count;
          return { key, value }
        });
        response.labels = grouped.map(e => e.key)
        response.data = grouped.map(e => e.value)
        console.log('grouped', grouped)
        console.log('response', response)
        res.status(200).json(response);
      });
  }
};