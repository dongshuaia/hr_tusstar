const nodemailer = require("nodemailer");

const config = {
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: "dongshuai0331@163.com",
        pass: "AVIGHTZYNSINDXZX"
    }
};

const transporter = nodemailer.createTransport(config);

module.exports = function (mail) {
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        }
        console.log("mail sent:", info.response);
    });
};

