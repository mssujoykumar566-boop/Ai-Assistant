"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminResourcesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    tags: "",
    link: "",
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  if (isPending) return <div>Loading...</div>;
  if (!session || (session.user.role !== "admin" && session.user.role !== "mentor")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">You do not have permission to view this page.</p>
        <a href="/dashboard" className="text-indigo-600 font-bold hover:underline">Back to Dashboard</a>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      await api.post("/api/resources", {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      });
      setStatus({ type: 'success', message: "Resource added successfully!" });
      setFormData({ title: "", description: "", category: "", level: "beginner", tags: "", link: "" });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Failed to add resource" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add New Resource</h1>
            <a href="/admin/resources/manage" className="text-indigo-600 font-bold hover:underline">Manage Existing Resources →</a>
        </div>
        
        {status && (
          <div className={`p-4 rounded-lg mb-6 ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" rows={4} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. react, typescript, frontend" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
          <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Add Resource</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
