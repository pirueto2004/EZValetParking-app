const nodemailer = require('nodemailer');
const crypt = require('../../models/crypt');
const emailDB = require("../../models/Users");
const encryptedPassword = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
var emailList = [];

function pullEmails () {
    emailList.push(emailDB.findmany({ users: ("email") }))
}

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ezvalet2019@gmail.com',
        pass: crypt.decrypt(encryptedPassword),
    },
});
module.exports = function sendEmail() {
    pullEmails();
    const mailOptions = {
        from: 'ezvalet2019@gmail.com',
        to: emailList,
        subject: "SC Kitchen has a new listing!",
        html: "message",
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
        // console.log(`Message sent: ${info.response}`);
    });
};

