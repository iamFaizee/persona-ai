

export const buildMessages = ({systemPrompt, message}) => {
    return [
        {
            role: 'system',
            content: systemPrompt
        },
        {
            role: 'user',
            content: message
        }
    ]
}