import nodemailer from "nodemailer";
import {EMAIL_PASSWORD, EMAIL_USER} from "./env.js";

export const accountEmail = EMAIL_USER;

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
    }
})