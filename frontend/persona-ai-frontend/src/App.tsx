import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type PersonaId = 'hitesh' | 'piyush'

type Persona = {
  id: PersonaId
  name: string
  label: string
  tone: string
}

type ChatMessage = {
  id: number
  role: 'user' | 'assistant'
  content: string
  persona?: PersonaId
}

type ChatResponse = {
  status: boolean
  reply?: string
  message?: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? ''

const personas: Persona[] = [
  {
    id: 'hitesh',
    name: 'Hitesh Choudhary',
    label: 'Hitesh',
    tone: 'Friendly teacher mode',
  },
  {
    id: 'piyush',
    name: 'Piyush Garg',
    label: 'Piyush',
    tone: 'Direct builder mode',
  },
]

function App() {
  const [activePersona, setActivePersona] = useState<PersonaId>('hitesh')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const messageListRef = useRef<HTMLDivElement | null>(null)

  const selectedPersona = useMemo(
    () => personas.find((persona) => persona.id === activePersona) ?? personas[0],
    [activePersona],
  )

  const canSend = input.trim().length > 0 && !isSending

  useEffect(() => {
    const messageList = messageListRef.current
    if (!messageList) return

    messageList.scrollTo({
      top: messageList.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isSending])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const message = input.trim()
    if (!message || isSending) return

    const timestamp = Date.now()
    setInput('')
    setError('')
    setIsSending(true)
    setMessages((current) => [
      ...current,
      { id: timestamp, role: 'user', content: message },
    ])

    console.log('API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          persona: activePersona,
          message,
        }),
      })

      const data = (await response.json()) as ChatResponse

      if (!response.ok || !data.status || !data.reply) {
        throw new Error(data.message || 'Unable to generate a response.')
      }

      const reply = data.reply

      setMessages((current) => [
        ...current,
        {
          id: timestamp + 1,
          role: 'assistant',
          persona: activePersona,
          content: reply,
        },
      ])
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Unable to reach the chat API.'

      setError(message)
      setMessages((current) => [
        ...current,
        {
          id: timestamp + 1,
          role: 'assistant',
          persona: activePersona,
          content: 'The API call failed. Check the backend and try again.',
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="app-shell">
      <aside className="persona-panel" aria-label="Persona switcher">
        <div className="brand-block">
          <span className="brand-mark">PA</span>
          <div>
            <h1>Persona AI</h1>
            <p>Focused chat with explicit persona control.</p>
          </div>
        </div>

        <div className="persona-group" role="radiogroup" aria-label="Choose persona">
          {personas.map((persona) => (
            <button
              aria-checked={activePersona === persona.id}
              className="persona-option"
              key={persona.id}
              onClick={() => setActivePersona(persona.id)}
              role="radio"
              type="button"
            >
              <span className="persona-avatar">{persona.label.charAt(0)}</span>
              <span>
                <strong>{persona.name}</strong>
                {/* <small>{persona.tone}</small> */}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <section className="chat-panel" aria-label={`${selectedPersona.name} chat`}>
        <header className="chat-header">
          <div>
            <span className="eyebrow">Active persona</span>
            <h2>{selectedPersona.name}</h2>
          </div>
          <span className="status-pill">{isSending ? 'Responding' : 'Ready'}</span>
        </header>

        <div className="message-list" aria-live="polite" ref={messageListRef}>
          {messages.length === 0 && !isSending ? (
            <div className="empty-state">
              <h3>Chat with your coding instructors</h3>
              <p>
                Choose Hitesh or Piyush, then ask a question to get a response
                in that instructor's persona.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <article
                className={`message message-${message.role}`}
                key={message.id}
              >
                <div className="message-meta">
                  {message.role === 'user'
                    ? 'You'
                    : personas.find((persona) => persona.id === message.persona)
                        ?.label ?? 'AI'}
                </div>
                <p>{message.content}</p>
              </article>
            ))
          )}

          {isSending && (
            <article className="message message-assistant">
              <div className="message-meta">{selectedPersona.label}</div>
              <p className="typing-dots" aria-label="Persona is typing">
                <span></span>
                <span></span>
                <span></span>
              </p>
            </article>
          )}
          <div className="message-end" />
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="chat-input">
            Message
          </label>
          <textarea
            id="chat-input"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                event.currentTarget.form?.requestSubmit()
              }
            }}
            placeholder={`Ask ${selectedPersona.label} something...`}
            rows={1}
            value={input}
          />
          <button disabled={!canSend} type="submit">
            {isSending ? 'Sending' : 'Send'}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </section>
    </main>
  )
}

export default App
