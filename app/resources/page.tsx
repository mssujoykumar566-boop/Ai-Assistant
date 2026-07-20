'use client';

import { useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';

interface Resource {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  tags: string[];
  link: string;
  createdAt: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/resources');
        setResources(response.data.resources);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return resources
      .filter((res) => {
        const matchesSearch =
          res.title.toLowerCase().includes(query) ||
          res.description.toLowerCase().includes(query) ||
          res.tags.some(tag => tag.toLowerCase().includes(query));
        
        const matchesCategory =
          categoryFilter === 'All' ||
          res.category.toLowerCase() === categoryFilter.toLowerCase();
        
        const matchesLevel =
          levelFilter === 'All' ||
          res.level.toLowerCase() === levelFilter.toLowerCase();

        return matchesSearch && matchesCategory && matchesLevel;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [resources, searchQuery, categoryFilter, levelFilter, sortOrder]);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResources, currentPage]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const categories = ['All', ...Array.from(new Set(resources.map((r) => r.category)))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Learning Resources</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" 
            value={levelFilter} 
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            {levels.map(l => <option key={l} value={l} className="text-gray-900">{l}</option>)}
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest" className="text-gray-900">Newest</option>
            <option value="oldest" className="text-gray-900">Oldest</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedResources.map((res) => (
                <div key={res._id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{res.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{res.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">{res.category}</span>
                    <span className="text-xs px-2 py-1 bg-violet-50 text-violet-700 rounded-full">{res.level}</span>
                  </div>
                  <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View Resource →</a>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
