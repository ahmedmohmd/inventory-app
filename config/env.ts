import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const MAX_PORT_RANGE = 65536;
const envSchema = z.object({
	PORT: z
		.string()
		.refine(
			(value) => {
				const port = parseInt(value);

				const isPortNumber = !isNaN(port);
				const isValidPortRange = port > 0 && port < MAX_PORT_RANGE;

				return isPortNumber && isValidPortRange;
			},
			{
				message: "Port is Invalid.",
			}
		)
		.optional(),
	JWT_SECRET: z.string(),
	DB_URL: z.string(),
	MAIL_USERNAME: z.string().email(),
	MAIL_PASSWORD: z.string(),
	MAIL_PORT: z.string().refine(
		(value) => {
			const port = parseInt(value);

			const isPortNumber = !isNaN(port);
			const GMAIL_PORT = 587;
			const isValidPortRange = port === GMAIL_PORT;

			return isPortNumber && isValidPortRange;
		},
		{
			message: "Mail Port is Invalid.",
		}
	),
	MAIL_HOST: z.string(),
	SENDER_EMAIL: z.string().email(),

	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
	REDIS_URL: z.string(),
	ELASTIC_SEARCH_URL: z.string(),
	ELASTIC_SEARCH_API_KEY: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);
