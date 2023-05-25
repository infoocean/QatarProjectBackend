const nodemailer = require("nodemailer");
const sendPDFEmails = (emailTo, emailSub, emailMsg, title) => {
  //nodemailer start//
  async function main() {
    const nodemailer = require("nodemailer");
    const mailOptions = {
      from: process.env.SMTP_FROM_NAME_EMAIL, // sender address
      to: emailTo, // list of receivers
      subject: emailSub, // Subject line
      // text: emailMsg, // plain text body
      html: emailMsg, // html body
      attachments:
        title === "monthlyReport"
          ? [
              {
                filename: "document.pdf",
                path: "./document.pdf",
                contentType: "application/pdf",
              },
            ]
          : [
              {
                filename: "invoicereceipt.pdf",
                path: "./invoicereceipt.pdf",
                contentType: "application/pdf",
              },
            ],
    };
    // let dispatcher = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.SMTP_AUTH_USER,
    //     pass: process.env.SMTP_AUTH_PASS,
    //   },
    // });
    const dispatcher = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS,
      },
    });
    await dispatcher
      .sendMail(mailOptions)
      .then((info) => {
        console.log("Email sent: " + info.response);
        sentDataEmail = info.response;
      })
      .catch((error) => {
        sentDataEmail = "error";
      });
    return sentDataEmail;
  }
  main().catch(" smtp error ---- ", console.error);
};
module.exports = sendPDFEmails;
