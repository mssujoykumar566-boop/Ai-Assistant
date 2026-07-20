"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Chat { _id: string, title: string, updatedAt: string }

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [recentChats, setRecentChats] = useState<Chat[]>([]);

  const fetchRecentChats = useCallback(async () => {
    try {
      const response = await api.get("/api/chat");
      const chats = Array.isArray(response.data.chats) ? response.data.chats : [];
      setRecentChats(chats.slice(0, 5)); // Show 5 most recent
    } catch (error) {
      console.error("Error fetching chats", error);
      setRecentChats([]);
    }
  }, []);

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
    else if (session) fetchRecentChats();
  }, [session, isPending, router, fetchRecentChats]);

  if (isPending) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-6">Welcome back, {session?.user?.name}!</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[ { label: "Chats Started", val: recentChats.length.toString() }, { label: "Resources Viewed", val: "45" }, { label: "Recommendations Received", val: "8" } ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm">
                    <div className="text-gray-500">{stat.label}</div>
                    <div className="text-3xl font-bold text-indigo-600">{stat.val}</div>
                </div>
            ))}
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">Recent Chats</h2>
            {recentChats.length > 0 ? (
                <div className="space-y-2">
                    {recentChats.map(chat => (
                        <div key={chat._id} className="p-3 bg-gray-50 rounded-lg hover:bg-indigo-50">
                            <div className="font-medium text-gray-900">{chat.title}</div>
                            <div className="text-xs text-gray-500">{new Date(chat.updatedAt).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No recent chats.</p>
            )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
