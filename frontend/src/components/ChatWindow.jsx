import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, loading, chatEndRef }) => (
  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
    {messages.map((msg, i) => (
      <MessageBubble key={i} message={msg} />
    ))}
    {loading && (
      <div className="text-sm text-gray-500 italic">Typing...</div>
    )}
    <div ref={chatEndRef}></div>
  </div>
);

export default ChatWindow;
