import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8">About SkillPath AI</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At SkillPath AI, our mission is to empower students and career seekers to navigate the complexities of modern professional landscapes. We believe that choosing a career path or a field of study shouldn't be a source of anxiety, but an opportunity for discovery. We aim to bridge the gap between academic learning and career readiness through personalized AI guidance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Why We Are Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-indigo-50 rounded-2xl">
              <h3 className="font-bold text-lg text-indigo-900 mb-2">AI Chat Mentor</h3>
              <p className="text-gray-700">Unlike static career advice platforms, our AI Chat Mentor offers real-time, context-aware conversations to help you prepare for interviews, clarify your goals, and resolve doubts instantly.</p>
            </div>
            <div className="p-6 bg-violet-50 rounded-2xl">
              <h3 className="font-bold text-lg text-indigo-900 mb-2">Smart Recommendations</h3>
              <p className="text-gray-700">We don't just list resources; we analyze your specific skill gaps and interests to provide tailored learning paths, ensuring you spend time on what truly matters for your chosen path.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            SkillPath AI began with a simple observation: students are often overwhelmed by the sheer volume of career information. We built this platform to simplify the process—transforming fragmented data into an actionable, structured roadmap. Whether you're a high school student considering college majors or a graduate looking to pivot into a new industry, we are here to support your journey from curiosity to expertise.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
