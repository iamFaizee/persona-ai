# Persona AI

Persona AI is a full-stack chat application that lets users talk with AI responses shaped around selected instructor personas. The app currently supports **Hitesh Choudhary** and **Piyush Garg**, with each persona using its own profile, tone, phrases, and prompt instructions.

The project is built with a React + Vite frontend and an Express.js backend connected to the OpenAI API.

## Features

- Persona-based AI chat experience
- Switch between Hitesh Choudhary and Piyush Garg personas
- Custom prompt and profile files for each persona
- Beginner-friendly, short-form AI responses
- Clean chat interface with loading and error states
- Express REST API for chat generation
- OpenAI chat completions integration
- Environment-based configuration for local and deployed usage

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- Node.js
- Express.js
- OpenAI SDK
- dotenv
- CORS

## Project Structure

```text
persona-ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── personas/
│   │   │   ├── hitesh/
│   │   │   └── piyush/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   └── persona-ai-frontend/
│       ├── src/
│       ├── public/
│       └── package.json
└── README.md
```

## How It Works

1. The user selects a persona from the frontend.
2. The frontend sends the selected persona and message to the backend.
3. The backend loads that persona's profile and prompt file.
4. A system prompt is generated using the persona tone, phrases, and response style.
5. The OpenAI API generates a response in the selected persona's style.
6. The frontend displays the reply in the chat interface.

## API Endpoint

### `POST /api/chat`

Generates a response from the selected persona.

#### Request Body

```json
{
  "persona": "hitesh",
  "message": "Explain closures in JavaScript"
}
```

Supported persona values:

- `hitesh`
- `piyush`

#### Success Response

```json
{
  "status": true,
  "message": "Message generated successfully",
  "reply": "Generated AI response"
}
```

## Environment Variables

### Backend

Create `backend/.env`:

```env
PORT=5500
OPENAI_API_KEY=your_openai_api_key
MODEL=your_openai_model
```

Example model:

```env
MODEL=gpt-4.1-mini
```

### Frontend

Create `frontend/persona-ai-frontend/.env`:

```env
VITE_API_BASE_URL=https://persona-ai-backend-production-02e1.up.railway.app
```

For local backend development, use:

```env
VITE_API_BASE_URL=http://localhost:5500
```

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/iamFaizee/persona-ai.git
cd persona-ai
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

The backend will run on:

```text
http://localhost:5500
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend/persona-ai-frontend
npm install
npm run dev
```

The frontend will run on the Vite development URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Deployment

The backend is configured to run on Railway:

```text
https://persona-ai-backend-production-02e1.up.railway.app
```

When deploying the frontend, make sure to add this environment variable in the frontend hosting platform:

```env
VITE_API_BASE_URL=https://persona-ai-backend-production-02e1.up.railway.app
```

## Assignment Summary

This project demonstrates a working full-stack AI persona chat application. It includes a reusable backend structure, dynamic persona loading, prompt construction, OpenAI API integration, and a polished frontend interface for selecting personas and sending chat messages.

## Author

Faizan Khan

GitHub: [iamFaizee](https://github.com/iamFaizee)
