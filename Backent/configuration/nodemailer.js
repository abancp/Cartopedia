import nodemailer from "nodemailer";

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    port: 3001,
    secure:true,
    logger:true,
    debug:true,
    secureConnection:true,
    auth: {
        user: 'cartopediaa@gmail.com',
        pass: 'qvecxggrvsgqyhwe'
    },
    tls:{
        rejectUnauthorized:true
    }
});

export default mailTransporter;