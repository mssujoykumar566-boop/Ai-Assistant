"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus("Message sent!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-2xl">
            <input type="text" placeholder="Name" className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" required />
            <input type="email" placeholder="Email" className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" required />
            <input type="text" placeholder="Subject" className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" required />
            <textarea placeholder="Message" className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none" rows={4} required />
            <button type="submit" disabled={loading} className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status && <p className="text-center font-bold text-green-600">{status}</p>}
          </form>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-indigo-900">Email</h3>
              <p className="text-gray-600">hello@skillpathai.com</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-indigo-900">Response Time</h3>
              <p className="text-gray-600">We typically respond within 24 hours.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
