"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await signUp.email({ email, password, name });
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-indigo-100">
        <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">Register</h1>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-400" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-400" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-400" required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-400" required />
          <button type="submit" disabled={loading} className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            {loading ? "Registering..." : "Register"}
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
        })} className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">Register with Google</button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
