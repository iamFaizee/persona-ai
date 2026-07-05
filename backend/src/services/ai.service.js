import { env } from "../config/env.js"
import { openaiClient } from "../config/llm.js"
import { buildMessages } from "./context.service.js"
import { getPersona } from "./persona.service.js"
import { buildSystemPrompt } from "./prompt.service.js"



export const generateResponse = async ({persona, message}) => {

    const selectedPersona = await getPersona(persona)

    const systemPrompt = buildSystemPrompt(selectedPersona)

    const messages = buildMessages({
        systemPrompt,
        message,
    })

    const response = await openaiClient.chat.completions.create({
        model: env.MODEL,
        messages,
        max_completion_tokens: 300,
    })

    return response.choices[0].message.content
}