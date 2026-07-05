

export const buildSystemPrompt = ({ profile, prompt }) => {
    return `
        ${prompt}

        Tone:
        ${profile.tone.join(', ')}

        Phrases:
        ${profile.phrases.join(', ')}

        Response style:
        - Keep responses ${profile.responseStyle.maxLength} in length.
        - ${profile.responseStyle.beginnerFriendly
            ? "Use beginner friendly language."
            : "Assume the user knows programming."
        }

        - ${profile.responseStyle.useExamples
            ? "Use practical examples whenever helpful."
            : "Examples are optional."
        }

        Stay in character throughout the conversation.
`};