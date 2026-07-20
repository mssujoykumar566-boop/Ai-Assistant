"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn.email({ email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@skillpath.ai");
    setPassword("demo1234");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-indigo-100">
        <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">Login</h1>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-400" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-400" required />
          <button type="submit" disabled={loading} className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button onClick={() => signIn.social({ 
          provider: "google",
          callbackURL: `${window.location.origin}/dashboard` 
        })} className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">Login with Google</button>
        <button onClick={handleDemoLogin} className="w-full p-3 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition">Use Demo Account</button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link href="/register" className="text-indigo-600 font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
