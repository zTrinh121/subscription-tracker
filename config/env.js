import { config} from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

export const {
    PORT,
    SERVER_URL,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_TOKEN,
    QSTASH_URL,
    EMAIL_PASSWORD,
    EMAIL_USER
} = process.env;