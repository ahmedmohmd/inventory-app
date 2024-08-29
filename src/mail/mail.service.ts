import { transporter } from "./mail.config";
import { MailOptions } from "./mail.type";

const sendMail = async (mailOptions: MailOptions) => {
	return await transporter.sendMail(mailOptions);
};

export { sendMail };
