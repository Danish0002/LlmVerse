const express = require("express");
const cors = require("cors");
const { getLLMResponse } = require("./chat");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { provider, messages } = req.body;
  console.log("📥 Received chat request:");
  console.log("👉 Provider:", provider);
  console.log("👉 Messages:", messages);

  try {
    const reply = await getLLMResponse(provider, messages);
    console.log("✅ Raw reply from LLM:", reply);

    let content = "";

    if (typeof reply.content === "string") {
      content = reply.content;
    } else if (Array.isArray(reply.content)) {
      content = reply.content.map(c => c.text ?? "").join("\n");
    } else if (reply.response?.candidates?.[0]?.content?.parts) {
      content = reply.response.candidates[0].content.parts.map(p => p.text).join(" ");
    } else {
      content = "⚠️ Could not parse LLM response.";
    }

    res.json({ role: "assistant", content });
  } catch (err) {
    console.error("❌ Error in backend:", err);
    res.status(500).json({ error: err.message || "LLM call failed" });
  }
});


app.listen(3001, () => console.log(" LangChain API running on http://localhost:3001"));
