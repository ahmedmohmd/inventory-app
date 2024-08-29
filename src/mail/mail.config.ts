import nodemailer from "nodemailer";
import { ENV } from "../../config/env";

const transporter = nodemailer.createTransport({
	host: ENV.MAIL_HOST,
	port: Number(ENV.MAIL_PORT),
	secure: false,
	auth: {
		user: ENV.MAIL_USERNAME,
		pass: ENV.MAIL_PASSWORD,
	},
});

export { transporter };
