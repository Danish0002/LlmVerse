import { FiSettings } from "react-icons/fi";

const Sidebar = ({ provider, setProvider }) => {
  const providers = {
    "OpenAI (GPT-4)": "openai",
    "Anthropic (Claude)": "anthropic",
    "Mistral": "mistral",
    "Gemini (Google)": "gemini",
    "Llama(Groq)": "llama"
  };

  return (
    <div className="w-72 bg-white border-r flex flex-col">
      <div className="p-5 border-b">
        <h2 className="text-xl font-bold tracking-tight text-gray-800">LlmVerse</h2>
        <p className="text-sm text-gray-500">Multi-LLM Playground</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex items-center gap-2 text-gray-600 font-semibold mb-2">
          <FiSettings className="text-gray-500" />
          <span>Settings</span>
        </div>
        <label className="text-sm block mb-1 text-gray-600">LLM Provider</label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
        >
          {Object.entries(providers).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="p-4 border-t text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} LlmVerse
      </div>
    </div>
  );
};

export default Sidebar;
