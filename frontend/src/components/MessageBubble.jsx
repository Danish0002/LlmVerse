const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";
  const time = new Date(message.time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-xl px-4 py-2 rounded-lg shadow-sm ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {message.content}
      </div>
      <span className="text-xs text-gray-400 mt-1">{time}</span>
    </div>
  );
};

export default MessageBubble;
