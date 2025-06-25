const { ChatOpenAI } = require("@langchain/openai");
const { ChatAnthropic } = require("@langchain/anthropic");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
require("dotenv").config();

const getLLM = (provider) => {
  switch (provider) {
    case "openai":
      return new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-4", 
        temperature: 0.7,
      });

    case "anthropic":
      return new ChatAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        modelName: "claude-3-opus-20240229",
        temperature: 0.7,
      });
    
    case "llama":
    return new ChatOpenAI({
        openAIApiKey: process.env.GROQ_API_KEY,
        modelName: "llama3-70b-8192", 
        temperature: 0.7,
        configuration: {
        baseURL: "https://api.groq.com/openai/v1",
        },
    });

    case "mistral":
    return new ChatOpenAI({
    openAIApiKey: process.env.MISTRAL_API_KEY,
    modelName: "mistral-small",
    temperature: 0.7,
    configuration: {
      baseURL: "https://api.mistral.ai/v1",      
        },
    });

    case "gemini":
      return new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "gemini-2.5-flash",
        temperature: 0.7,
        
      });

    default:
      throw new Error(`Unknown LLM provider: ${provider}`);
  }
};

async function getLLMResponse(provider, messages) {
  const llm = getLLM(provider);

  const lcMessages = messages.map((msg) =>
    msg.role === "user"
      ? new HumanMessage(msg.content)
      : new AIMessage(msg.content)
  );

  try {
    const res = await llm.call(lcMessages);
    return res;
  } catch (error) {
    console.error(` Error getting response from ${provider}:`, error);
    throw error;
  }
}

module.exports = { getLLMResponse };
