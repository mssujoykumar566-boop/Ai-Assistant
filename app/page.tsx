"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, BrainCircuit, BookOpenText, Target, Users, GraduationCap, Award } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleFAQClick = (question: string) => {
    router.push(`/chat?q=${encodeURIComponent(question)}`);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* 1. Hero */}
      <section className="h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6">Your Personal AI Career Mentor</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">SkillPath AI guides you through your career journey with personalized study plans, AI-powered mentorship, and curated resources.</p>
        <div className="flex gap-4">
          <Link href="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Get Started</Link>
          <Link href="/resources" className="px-8 py-4 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200">Explore Resources</Link>
        </div>
      </section>

      {/* 2. Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">Core Capabilities</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Bot, title: "AI Chat Mentor", desc: "Get real-time career advice and interview prep from our specialized AI mentor.", href: "/chat" },
              { icon: BrainCircuit, title: "Smart Recommendations", desc: "AI-driven skill gap analysis and tailored learning paths.", href: "/resources" },
              { icon: BookOpenText, title: "Resource Library", desc: "Access high-quality study materials for thousands of career paths.", href: "/resources" },
              { icon: Target, title: "Progress Tracking", desc: "Visualize your career growth with detailed milestones and analytics.", href: "/dashboard" },
            ].map((f, i) => (
              <Link key={i} href={f.href} className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <f.icon className="text-indigo-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 text-gray-900">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-indigo-900 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[ 
                    { text: "Define your career goals", href: "/dashboard" }, 
                    { text: "Receive AI-powered recommendations", href: "/resources" }, 
                    { text: "Track your progress daily", href: "/dashboard" } 
                ].map((step, i) => (
                    <Link key={i} href={step.href} className="p-6 border border-indigo-100 rounded-2xl hover:shadow-md transition-all duration-200 hover:-translate-y-1 block">
                        <div className="bg-indigo-100 text-indigo-600 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 font-bold text-xl">{i+1}</div>
                        <p className="font-semibold text-lg text-gray-900">{step.text}</p>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* 4. Stats */}
      <section className="py-20 bg-indigo-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            {[ { icon: Users, label: "Students Helped", val: "50,000+" }, { icon: GraduationCap, label: "Careers Launched", val: "10,000+" }, { icon: Award, label: "Resources Available", val: "1,000+" } ].map((stat, i) => (
                <div key={i}>
                    <stat.icon className="mx-auto mb-2" size={40} />
                    <div className="text-4xl font-bold mb-1">{stat.val}</div>
                    <div className="text-indigo-200">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">Student Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[ { name: "Alex R.", quote: "SkillPath AI helped me land my dream data science job in just 3 months!" }, { name: "Sarah K.", quote: "The AI mentor is like having a career coach available 24/7." }, { name: "James P.", quote: "Finally, I have a clear, actionable roadmap for my software engineering career." } ].map((t, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl">
                        <p className="text-gray-600 italic mb-4">"{t.quote}"</p>
                        <p className="font-bold text-indigo-900">- {t.name}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {[ { q: "Is SkillPath AI free?", a: "We offer a generous free tier for all students." }, { q: "Can I switch career paths?", a: "Yes, our AI adapts to your changing interests." }, { q: "How does the AI mentor work?", a: "It uses advanced LLMs trained on career development data." }, { q: "Is it suitable for beginners?", a: "Absolutely! We cater to all skill levels." } ].map((faq, i) => (
                    <button key={i} onClick={() => handleFAQClick(faq.q)} className="w-full text-left p-6 bg-white rounded-2xl border border-indigo-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1 block">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.q}</h3>
                        <p className="text-gray-600">{faq.a}</p>
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold text-indigo-900 mb-6">Ready to Start Your Journey?</h2>
        <Link href="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg">Create Your Free Account</Link>
      </section>

      <Footer />
    </main>
  );
}
