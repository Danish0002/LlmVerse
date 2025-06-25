const sendMessage = async () => {
  if (!input.trim()) return;

  const timestamp = new Date().toISOString();
  const userMessage = { role: "user", content: input, time: timestamp };
  const newMessages = [...messages, userMessage];
  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
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
