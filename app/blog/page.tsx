import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    title: "5 Tips to Ace Your Technical Interview",
    excerpt: "Preparing for a coding interview? Focus on these fundamental data structures and problem-solving strategies to stand out.",
    category: "Career Tips",
    date: "July 15, 2026"
  },
  {
    title: "The Future of Learning with AI",
    excerpt: "How generative AI is changing the way we study and acquire new skills in a rapidly evolving job market.",
    category: "AI & Learning",
    date: "July 10, 2026"
  },
  {
    title: "Effective Study Techniques for Students",
    excerpt: "Beyond just reading textbooks—discover active recall and spaced repetition to improve your retention.",
    category: "Study Skills",
    date: "July 5, 2026"
  },
  {
    title: "How to Build a Portfolio as a Beginner",
    excerpt: "You don't need years of experience. Here's how to showcase your projects effectively to recruiters.",
    category: "Career Tips",
    date: "June 30, 2026"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-lg text-gray-600 mb-10">Insights, tips, and strategies for your career and study journey.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer">
              <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">{post.category}</span>
              <h3 className="font-bold text-lg text-gray-900 mt-3 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
