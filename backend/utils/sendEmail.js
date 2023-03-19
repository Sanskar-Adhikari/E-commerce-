const nodemailer=require('nodemailer');


/**/
/*
sendEmail
NAME
    sendEmail - Sends an email using the nodemailer module.
SYNOPSIS
    sendEmail = async (options);
    options -> An object containing the email information such as the recipient's email, the subject of the 
    email and the message to be sent.
DESCRIPTION
    This function is used to send an email using the nodemailer module. It takes in an 
    object containing the necessary information to send an email. The email is sent using the SMTP server from Gmail.
RETURNS
    Nothing.
*/
/**/
const sendEmail = async(options)=>
{
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        service: process.env.RESET_SERVICE,
        auth:{
            user:process.env.RESET_MAIL,
            pass:process.env.RESET_PASSWORD,
        }
    })
    const mailOptions={
        from:process.env.RESET_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }
    await transporter.sendMail(mailOptions);
}
/* sendEmail = async (options); */

module.exports = sendEmail;