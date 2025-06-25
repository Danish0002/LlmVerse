import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

const providers = {
  "OpenAI (GPT-4)": "openai",
  "Anthropic (Claude)": "anthropic",
  "Mistral": "mistral",
  "Gemini (Google)": "gemini",
  "Llama(Groq)": "llama"
};

function App() {
  const [provider, setProvider] = useState("openai");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toISOString();
    const userMessage = { role: "user", content: input, time: timestamp };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/chat", {
        provider,
        messages: newMessages,
      });

      const assistantMessage = {
        role: "assistant",
        content: res.data?.content || "No response from LLM.",
        time: new Date().toISOString(),
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      const errorMsg = error.response?.data?.error || "An unexpected error occurred.";
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: ` Error: ${errorMsg}`,
          time: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-gray-100 text-gray-900 overflow-hidden">
      <Sidebar provider={provider} setProvider={setProvider} />
      <div className="flex-1 flex flex-col h-full">
        <header className="p-4 border-b bg-white">
          <h1 className="text-2xl font-semibold">Chat Window</h1>
        </header>
        <ChatWindow messages={messages} loading={loading} chatEndRef={chatEndRef} />
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
