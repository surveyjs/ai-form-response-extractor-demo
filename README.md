# Hybrid Form AI Demo

Interactive demo for the [`hybrid-form-ai`](https://github.com/surveyjs/hybrid-form-ai) npm package — extract structured data from scanned/photographed paper forms using multimodal LLMs.

## Features

- **Multi-step wizard** — configure provider, upload images, paste a SurveyJS form definition
- **Multi-provider support** — OpenAI, Anthropic, and Ollama (local)
- **Real-time validation** — JSON syntax checking, provider availability detection
- **Rich results** — confidence scores, per-field metrics, extracted JSON, pre-filled SurveyJS form preview

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure LLM providers

Copy the example environment file and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with at least one provider:

```env
# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Anthropic
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
```

### 3. (Optional) Set up Ollama for local inference

Ollama lets you run vision models locally with no API key:

1. Install from [ollama.ai](https://ollama.ai)
2. Start the server:
   ```bash
   ollama serve
   ```
3. Pull a vision model:
   ```bash
   ollama pull llama3.2-vision
   ```

The demo auto-detects whether Ollama is running on startup.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

1. **Setup** — Pick a provider and model. API keys are read from server environment variables and never exposed to the browser.
2. **Upload** — Drag & drop scanned form images (PNG, JPG, TIFF, etc.).
3. **Define** — Paste the SurveyJS JSON definition that describes your form fields.
4. **Process** — The server calls `hybrid-form-ai` to extract structured data from the images.
5. **Review** — See extraction results with confidence scores and a pre-filled SurveyJS form.

## Project Structure

```
app/
  layout.tsx          – Root layout
  page.tsx            – Main client page (state machine)
  globals.css         – Tailwind CSS imports
  api/
    providers/route.ts – GET: detect available LLM providers
    process/route.ts   – POST: run extraction via hybrid-form-ai
components/
  NoProviders.tsx     – Setup instructions when no providers found
  SetupWizard.tsx     – SurveyJS-powered multi-page wizard
  Navigation.tsx      – Tab bar (Setup | Result | SurveyJS Form)
  Processing.tsx      – Full-screen loading spinner
  ResultView.tsx      – Metrics cards + extracted JSON
  SurveyFormView.tsx  – Pre-filled SurveyJS form preview
  ErrorView.tsx       – Error display with retry
types/
  index.ts            – Shared TypeScript types
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `OPENAI_API_KEY` | OpenAI API key |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `OLLAMA_BASE_URL` | Ollama server URL (default: `http://localhost:11434`) |

## License

MIT
