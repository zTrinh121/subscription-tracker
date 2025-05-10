import {emailTemplates} from "./email-template.js";
import dayjs from "dayjs";
import {accountEmail, transporter} from "../config/nodemailer.js";

export const sendReminerEmail = async ({to, type, subscription}) => {
    if(!to || !type) throw new Error('Missing required params');

    const template = emailTemplates.find(t => t.label === type);

    if(!template) throw new Error('Invalid email template');

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.log(error, 'Error sending email');
        console.log('Email sent: ' + info.response)
    })
};