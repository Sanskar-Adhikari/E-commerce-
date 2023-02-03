const nodemailer=require('nodemailer');

const sendEmail = async(options)=>
{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
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

module.exports = sendEmail;