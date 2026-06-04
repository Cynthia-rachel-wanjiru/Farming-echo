import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, MessageSquare, Tractor, TrendingUp, Droplet, Bug, Plus, ThumbsUp, MessageCircle, Award, Search, Sprout, ChevronDown } from 'lucide-react';
import { User } from '../App';

interface ForumPost {
  id: string;
  category: string;
  title: string;
  author: string;
  authorRole: string;
  content: string;
  replies: number;
  likes: number;
  timestamp: Date;
  isExpertPost?: boolean;
}

interface KnowledgeBaseProps {
  user: User;
  language: 'en' | 'sw';
}

export function KnowledgeBase({ user, language }: KnowledgeBaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      category: 'best-practices',
      title: language === 'en' 
        ? 'Intercropping Maize and Beans: My Success Story'
        : 'Kupanda Mahindi na Maharage Pamoja: Hadithi Yangu ya Mafanikio',
      author: 'Grace Njeri',
      authorRole: 'Farmer',
      content: language === 'en'
        ? 'I\'ve been intercropping maize and beans for 3 seasons now and my yields have increased by 40%. Here\'s what I learned...'
        : 'Nimekuwa nikipanda mahindi na maharage pamoja kwa misimu 3 sasa na mavuno yangu yameongezeka kwa 40%. Hivi ndivyo nilivyojifunza...',
      replies: 23,
      likes: 45,
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: '2',
      category: 'advisory',
      title: language === 'en'
        ? 'Official Guide: Combating Fall Armyworm in Maize'
        : 'Mwongozo Rasmi: Kupambana na Fall Armyworm katika Mahindi',
      author: 'Dr. Kamau',
      authorRole: 'Agricultural Expert',
      content: language === 'en'
        ? 'Fall armyworm continues to be a threat to maize production. Here are proven integrated pest management strategies...'
        : 'Fall armyworm inaendelea kuwa tishio kwa uzalishaji wa mahindi. Hapa kuna mikakati ya udhibiti wa wadudu iliyothibitishwa...',
      replies: 67,
      likes: 124,
      timestamp: new Date(Date.now() - 259200000),
      isExpertPost: true,
    },
    {
      id: '3',
      category: 'policy',
      title: language === 'en'
        ? 'New Government Subsidies for Small-Scale Farmers'
        : 'Ruzuku Mpya za Serikali kwa Wakulima Wadogo',
      author: 'Ministry of Agriculture',
      authorRole: 'Agricultural Expert',
      content: language === 'en'
        ? 'The government has announced new fertilizer subsidies starting next month. Here\'s how to apply...'
        : 'Serikali imetangaza ruzuku mpya za mbolea kuanzia mwezi ujao. Hivi ndivyo unavyoomba...',
      replies: 89,
      likes: 156,
      timestamp: new Date(Date.now() - 345600000),
      isExpertPost: true,
    },
    {
      id: '4',
      category: 'best-practices',
      title: language === 'en'
        ? 'Water Harvesting Techniques for Dry Seasons'
        : 'Mbinu za Kuhifadhi Maji kwa Misimu Kavu',
      author: 'Peter Omondi',
      authorRole: 'Farmer',
      content: language === 'en'
        ? 'During the last drought, I managed to save my crops using these simple water harvesting methods...'
        : 'Wakati wa ukame uliopita, niliweza kuokoa mazao yangu kwa kutumia mbinu hizi rahisi za kuhifadhi maji...',
      replies: 34,
      likes: 78,
      timestamp: new Date(Date.now() - 432000000),
    },
  ]);

  const translations = {
    en: {
      knowledgeBase: 'Knowledge Base',
      searchPlaceholder: 'Search discussions...',
      allCategories: 'All',
      bestPractices: 'Best Practices',
      advisory: 'Expert Advisory',
      policy: 'Policy Updates',
      newDiscussion: 'New Discussion',
      expertPost: 'EXPERT',
      replies: 'replies',
      likes: 'likes',
      postedBy: 'Posted by',
      filterByCategory: 'Filter by Category',
    },
    sw: {
      knowledgeBase: 'Hifadhi ya Maarifa',
      searchPlaceholder: 'Tafuta mijadala...',
      allCategories: 'Zote',
      bestPractices: 'Mbinu Bora',
      advisory: 'Ushauri wa Wataalam',
      policy: 'Masasisho ya Sera',
      newDiscussion: 'Mjadala Mpya',
      expertPost: 'MTAALAMU',
      replies: 'majibu',
      likes: 'mipendwa',
      postedBy: 'Imeandikwa na',
      filterByCategory: 'Chuja kwa Jamii',
    },
  };

  const t = translations[language];

  const categories = [
    { id: 'all', label: t.allCategories, icon: BookOpen },
    { id: 'best-practices', label: t.bestPractices, icon: Award },
    { id: 'advisory', label: t.advisory, icon: BookOpen },
    { id: 'policy', label: t.policy, icon: MessageSquare },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#2D5016] flex items-center gap-2">
            <BookOpen className="w-7 h-7" />
            {t.knowledgeBase}
          </h2>
          <button className="px-4 py-2 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6B1F] transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">{t.newDiscussion}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
          />
        </div>
      </motion.div>

      {/* Categories Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#2D5016] mb-2">{t.filterByCategory}</label>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 pr-10 border-2 border-[#8B6F47] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5016] text-base font-medium text-[#2D5016] appearance-none cursor-pointer"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B6F47] pointer-events-none" />
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer ${
              post.isExpertPost ? 'border-2 border-[#4A7C28]' : ''
            }`}
          >
            {post.isExpertPost && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#4A7C28] to-[#2D5016] text-white rounded-full text-xs font-bold">
                  <Award className="w-4 h-4" />
                  {t.expertPost}
                </span>
              </div>
            )}

            <h3 className="text-lg font-bold text-[#2D5016] mb-2">{post.title}</h3>
            
            <p className="text-[#8B6F47] mb-4 line-clamp-2">{post.content}</p>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#2D5016]">
                  {t.postedBy} <span className="font-semibold">{post.author}</span>
                </span>
                <span className="text-[#8B6F47]">({post.authorRole})</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-[#4A7C28]">
                  <MessageSquare className="w-4 h-4" />
                  {post.replies} {t.replies}
                </span>
                <span className="flex items-center gap-1 text-[#8B6F47]">
                  <Award className="w-4 h-4" />
                  {post.likes} {t.likes}
                </span>
                <span className="text-[#8B6F47]">
                  {post.timestamp.toLocaleDateString(language === 'en' ? 'en-KE' : 'sw-KE')}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}