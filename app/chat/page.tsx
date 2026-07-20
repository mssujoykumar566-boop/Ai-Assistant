"use client";
import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";

interface Message { role: 'user' | 'assistant', content: string }
interface Chat { _id: string, title: string, updatedAt: string }

function ChatContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setInput(q);
    }
  }, [searchParams]);

  const fetchChatList = useCallback(async () => {
    try {
      const response = await api.get("/api/chat");
      const chats = Array.isArray(response.data.chats) ? response.data.chats : [];
      setChatList(chats);
    } catch (error) {
      console.error("Error fetching chat list", error);
      setChatList([]);
    }
  }, []);

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
    else if (session) fetchChatList();
  }, [session, isPending, router, fetchChatList]);

  const handleNewChat = () => {
    setChatId(null);
    setMessages([]);
    setInput("");
    setIsSidebarOpen(false); // Close sidebar on mobile after starting new chat
    inputRef.current?.focus();
  };

  const deleteChat = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this chat?")) return;
    try {
        await api.delete(`/api/chat/${id}`);
        console.log("Chat deleted successfully");
        setChatList(prev => prev.filter(c => c._id !== id));
        if (chatId === id) handleNewChat();
    } catch (error) {
        console.error("Error deleting chat:", error);
        alert("Failed to delete chat. Please try again.");
    }
  };

  const loadChat = async (id: string) => {
    try {
      const response = await api.get(`/api/chat/${id}`);
      setChatId(id);
      setMessages(response.data.chat.messages); // Fix: Correctly extract messages from nested chat object
    } catch (error) {
      console.error("Error loading chat", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    try {
        const response = await api.post("/api/chat/message", { chatId, message: input });
        setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
        
        if (!chatId) {
            setChatId(response.data.chatId);
            fetchChatList(); // Refresh sidebar after creating a new chat
        }
    } catch (error) {
        console.error("Chat error", error);
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile menu toggle */}
        <button 
            className="md:hidden absolute top-2 left-2 z-10 bg-indigo-600 text-white p-2 rounded"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
            {isSidebarOpen ? "Close" : "Chats"}
        </button>

        <aside className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex flex-col w-64 bg-gray-50 border-r border-indigo-100 p-4 absolute md:relative z-20 h-full overflow-y-auto`}>
            <button onClick={handleNewChat} className="w-full bg-indigo-600 text-white p-2 rounded-lg mb-4 hover:bg-indigo-700 mt-10 md:mt-0">New Chat</button>
            <div className="space-y-2">
                {chatList.map(chat => (
                    <button key={chat._id} onClick={() => {loadChat(chat._id); setIsSidebarOpen(false);}} className={`group w-full text-left p-2 rounded hover:bg-indigo-50 flex justify-between items-center ${chatId === chat._id ? 'bg-indigo-100' : ''}`}>
                        <div className="truncate">
                            <div className="font-medium text-sm truncate">{chat.title}</div>
                            <div className="text-xs text-gray-500">{new Date(chat.updatedAt).toLocaleDateString()}</div>
                        </div>
                        <Trash2 onClick={(e) => deleteChat(e, chat._id)} size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-600 ml-2" />
                    </button>
                ))}
            </div>
        </aside>
        <section className="flex-1 flex flex-col p-4 bg-white mt-12 md:mt-0">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-4 py-3 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                            {m.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder:text-gray-400" placeholder="Type a message..." />
                <button onClick={sendMessage} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Send</button>
            </div>
        </section>
      </div>
    </main>
  );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatContent />
        </Suspense>
    );
}

