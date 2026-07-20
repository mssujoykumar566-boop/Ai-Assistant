"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageSquare, LayoutDashboard, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              SkillPath AI
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link href="/resources" className="text-gray-600 hover:text-indigo-600">Resources</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                {(session.user.role === "admin" || session.user.role === "mentor") && (
                  <>
                    <Link href="/admin/resources" className="text-gray-600 hover:text-indigo-600">Add Resource</Link>
                    <Link href="/admin/resources/manage" className="text-gray-600 hover:text-indigo-600">Manage Resources</Link>
                  </>
                )}
                <Link href="/chat" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1">
                  <MessageSquare size={18} /> Chat
                </Link>
                <button onClick={() => signOut()} className="text-gray-600 hover:text-indigo-600 flex items-center gap-1">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
                <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-indigo-100 p-4 space-y-4">
          <Link href="/" className="block text-gray-600">Home</Link>
          <Link href="/resources" className="block text-gray-600">Resources</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="block text-gray-600">Dashboard</Link>
              {(session.user.role === "admin" || session.user.role === "mentor") && (
                <>
                    <Link href="/admin/resources" className="block text-gray-600">Add Resource</Link>
                    <Link href="/admin/resources/manage" className="block text-gray-600">Manage Resources</Link>
                </>
              )}
              <Link href="/chat" className="block text-gray-600">Chat</Link>
              <button onClick={() => signOut()} className="block text-gray-600">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-600">Login</Link>
              <Link href="/register" className="block text-indigo-600 font-bold">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
