const ChatInput = ({ input, setInput, sendMessage, loading }) => (
  <div className="p-4 border-t bg-white flex items-center gap-3">
    <input
      className="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
      placeholder="Type your message..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      disabled={loading}
    />
    <button
      className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md disabled:opacity-50"
      onClick={sendMessage}
      disabled={loading}
    >
      {loading ? "..." : "Send"}
    </button>
  </div>
);

export default ChatInput;
