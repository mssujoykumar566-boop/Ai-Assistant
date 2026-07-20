import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-indigo-600 mb-2">SkillPath AI</h3>
          <p className="text-gray-600 max-w-sm">Empowering students to build their future with AI-driven career mentorship and personalized study resources.</p>
        </div>
        
        <div className="flex gap-8 text-gray-600">
          <Link href="/about" className="hover:text-indigo-600">About</Link>
          <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
          <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
        </div>

        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-indigo-600"><Mail size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-indigo-600"><Mail size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-indigo-600"><Mail size={24} /></a>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8 pt-8 border-t border-indigo-100">
        &copy; {new Date().getFullYear()} SkillPath AI. All rights reserved.
      </div>
    </footer>
  );
}
