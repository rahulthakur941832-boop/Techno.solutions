import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, RefreshCw, ChevronDown, User, AlertCircle } from "lucide-react";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello! I am your 24/7 Techno-Solutions AI Assistant. How can I assist you with our Blockchain, AI, smart home, solar, or automation solutions today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Tell me about AI Solutions",
    "What blockchain services do you offer?",
    "Where is your office located?",
    "Show me why to choose you",
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Alert user of message if closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    const userMsg: ChatMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map current messages to format expected by backend (role: 'user' | 'model')
      const chatHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not connect to AI server.");
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.text || "I am here to help you!" },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorText("Oops! I failed to reply. Please check your connection or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        text: "Chat cleared! How can I assist you with our services today?",
      },
    ]);
    setErrorText(null);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans" id="ai-chatbot-root">
      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[90vw] sm:w-[380px] h-[550px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-[#ECECEC] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0F2D63] text-white px-5 py-4 flex items-center justify-between border-b border-[#ECECEC]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E5AF2B]/10 border border-[#E5AF2B]/30 flex items-center justify-center text-[#E5AF2B] shadow-inner relative">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0F2D63]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold tracking-tight">AI Advisor</span>
                  <span className="text-[10px] text-green-400 font-mono font-semibold">● Online 24/7</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title="Restart Conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FC] flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 max-w-[85%] ${
                    msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                      msg.role === "user"
                        ? "bg-[#0F2D63] text-white"
                        : "bg-white border border-[#ECECEC] text-[#0F2D63]"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Message body */}
                  <div className="flex flex-col gap-1">
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed text-left whitespace-pre-wrap break-words shadow-xs ${
                        msg.role === "user"
                          ? "bg-[#0F2D63] text-white rounded-tr-none"
                          : "bg-white text-[#1B1B1B] border border-[#ECECEC] rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2.5 self-start max-w-[80%]">
                  <div className="w-7 h-7 rounded-full bg-white border border-[#ECECEC] flex items-center justify-center text-[#0F2D63]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-[#ECECEC] px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-xs">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              {/* Error Box */}
              {errorText && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-left text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{errorText}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies suggestion panel (only if input is empty) */}
            {inputValue.trim() === "" && !isLoading && (
              <div className="px-4 py-2 bg-white border-t border-[#ECECEC] overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar scrollbar-none">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sug)}
                    className="inline-block bg-[#F8F9FC] border border-[#ECECEC] text-gray-700 text-[10px] font-semibold px-3 py-1.5 rounded-full hover:bg-[#0F2D63] hover:text-white hover:border-[#0F2D63] transition-all cursor-pointer whitespace-nowrap"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-white border-t border-[#ECECEC] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask our 24/7 AI anything..."
                className="flex-1 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#0F2D63] transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-[#0F2D63] hover:bg-[#153e82] disabled:bg-gray-200 text-white p-2.5 rounded-xl transition-all disabled:text-gray-400"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessage(false);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group bg-[#0F2D63] hover:bg-[#153e82] text-white font-semibold py-3 px-4 rounded-full flex items-center gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[#E5AF2B]/20"
        id="ai-chatbot-launcher"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          {hasNewMessage && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E5AF2B] rounded-full border border-[#0F2D63] animate-pulse" />
          )}
        </div>
        <span className="text-xs text-white uppercase tracking-wider font-bold">24/7 AI Chatbot</span>

        {/* Float indicator tooltip */}
        {!isOpen && (
          <span className="absolute left-full ml-3 bg-[#0F2D63] text-[#E5AF2B] font-semibold text-xs py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#E5AF2B]/20">
            Ask our AI! 🤖
          </span>
        )}
      </motion.button>
    </div>
  );
}
