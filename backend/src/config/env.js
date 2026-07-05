import dotenv from 'dotenv'

dotenv.config()

export const env = {
    PORT: process.env.PORT || 5500,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MODEL: process.env.MODEL
}