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
        user: 'belljulio66@gmail.com',
        pass: crypt.decrypt(encryptedPassword),
    },
});
module.exports = function sendEmail() {
    pullEmails();
    const mailOptions = {
        from: 'belljulio66@gmail.com',
        to: emailList,
        subject: "A new vehicle has been registered!",
        html: "message",
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
        // console.log(`Message sent: ${info.response}`);
    });
};

