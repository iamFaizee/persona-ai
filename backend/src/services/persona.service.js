import fs from 'fs/promises'
import path from 'path'

const PERSONA = { hitesh: 'hitesh', piyush: 'piyush' }

export const getPersona = async (persona) => {

    const selectedPersona = PERSONA[persona.toLowerCase()]

    if (!selectedPersona) {
        throw new Error('Invalid persona selected')
    }

    const profile = (await import(`../personas/${selectedPersona}/profile.js`)).default

    const prompt = await fs.readFile(path.resolve(`src/personas/${selectedPersona}/prompt.txt`), 'utf-8')

    return { profile, prompt }
}