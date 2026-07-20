"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface Resource {
  _id: string;
  title: string;
  category: string;
  level: string;
  createdAt: string;
}

export default function ManageResourcesPage() {
  const { data: session, isPending } = useSession();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session && (session.user.role === "admin" || session.user.role === "mentor")) {
      fetchResources();
    }
  }, [session, isPending]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/resources");
      setResources(response.data.resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      await api.delete(`/api/resources/${id}`);
      setResources(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Failed to delete resource");
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (!session || (session.user.role !== "admin" && session.user.role !== "mentor")) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <a href="/dashboard" className="text-indigo-600 font-bold hover:underline">Back to Dashboard</a>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Resources</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-gray-600 font-semibold">Title</th>
                <th className="p-4 text-gray-600 font-semibold">Category</th>
                <th className="p-4 text-gray-600 font-semibold">Level</th>
                <th className="p-4 text-gray-600 font-semibold">Created</th>
                <th className="p-4 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((res) => (
                <tr key={res._id} className="border-b border-gray-100">
                  <td className="p-4 text-gray-900 font-medium">{res.title}</td>
                  <td className="p-4 text-gray-700">{res.category}</td>
                  <td className="p-4 capitalize text-gray-700">{res.level}</td>
                  <td className="p-4 text-gray-700">{new Date(res.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/resources/${res._id}`} className="text-indigo-600 hover:text-indigo-800"><Eye size={18} /></Link>
                    <button onClick={() => deleteResource(res._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
