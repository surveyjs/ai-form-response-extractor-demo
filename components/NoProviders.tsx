export default function NoProviders() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔌</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            No LLM Providers Configured
          </h1>
          <p className="text-gray-600">
            At least one LLM provider must be set up to use this demo. Configure
            your API keys or start Ollama to get started.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Configure API Keys in{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                .env.local
              </code>
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Create a{" "}
              <code className="bg-gray-100 px-1 rounded">.env.local</code> file
              in the project root with your API keys:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
              {`# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Anthropic
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here`}
            </pre>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Use Ollama (Local, No API Key Needed)
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>
                Install Ollama from{" "}
                <a
                  href="https://ollama.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  ollama.ai
                </a>
              </li>
              <li>
                Start the Ollama server:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  ollama serve
                </code>
              </li>
              <li>
                Pull a vision model:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  ollama pull llama3.2-vision
                </code>
              </li>
              <li>Restart this application</li>
            </ol>
          </div>

          <div className="border-t pt-6 text-center">
            <a
              href="https://github.com/surveyjs/ai-form-response-extractor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View ai-form-response-extractor on GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
