import { generateResponse } from "../services/ai.service.js"


export const chatController = async (req, res, next) => {
    try {
        const { persona, message } = req.body

        const reply = await generateResponse({
            persona,
            message
        })

        return res.status(200).json({ status: true, message: 'Message generated successfully', reply })

    } catch (error) {
        next(error)
    }
}