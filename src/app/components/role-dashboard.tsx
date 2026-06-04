import React, { useState, useEffect, useRef } from 'react';
import { User } from '../App';
import { EchoMessaging } from './echo-messaging';
import { VotingHub } from './voting-hub';
import { KnowledgeBase } from './knowledge-base';
import { MarketDashboard } from './market-dashboard';
import { UserProfile } from './user-profile';
import { WeatherWidget } from './weather-widget';
import { HelpResourceDesk } from './help-resource-desk';
import {
  MessageSquare, Vote, BookOpen, TrendingUp, User as UserIcon, Home,
  Users, BarChart3, Megaphone, Microscope, GraduationCap, ClipboardList,
  Shield, Star, Leaf, Globe
} from 'lucide-react';
import logo from 'figma:asset/f071fbeb1656a03851eee645d222a7d311cf60d6.png';
import farmersImage from 'figma:asset/496b32033583eb97083862acbd9e03e1e2885f5f.png';
import goatImage from 'figma:asset/a7e28fb36f332a77de3f54e3f9a8a52ac793af02.png';
import bananaImage from 'figma:asset/67c626899edb0ab403849ea01e66a744eb8d5d16.png';
import cornImage from 'figma:asset/a3ccce87297433cc24ccc4f53fe43fd7c9c74c6c.png';
import peppersImage from 'figma:asset/89fb0ffd3aaa83c323417325d26669a82e774a1e.png';

interface RoleDashboardProps {
  user: User;
  language: 'en' | 'sw';
  onGoHome: () => void;
  onLanguageChange: (language: 'en' | 'sw') => void;
}

// Custom hook for scroll direction detection
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show at the top
        setIsVisible(true);
      } else if (currentScrollY > prevScrollY.current) {
        // Scrolling down
        setScrollDirection('down');
        setIsVisible(false);
      } else {
        // Scrolling up
        setScrollDirection('up');
        setIsVisible(true);
      }
      
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollDirection, isVisible };
}

// ─── Farmer Tab Config ────────────────────────────────────────────────────────
type FarmerTab = 'echo' | 'voting' | 'knowledge' | 'market' | 'profile';
const FARMER_TABS: { id: FarmerTab; icon: React.ElementType; en: string; sw: string }[] = [
  { id: 'echo', icon: MessageSquare, en: 'Echo', sw: 'Sauti' },
  { id: 'voting', icon: Vote, en: 'Voting', sw: 'Kura' },
  { id: 'knowledge', icon: BookOpen, en: 'Knowledge', sw: 'Maarifa' },
  { id: 'market', icon: TrendingUp, en: 'Market', sw: 'Soko' },
  { id: 'profile', icon: UserIcon, en: 'Profile', sw: 'Wasifu' },
];

// ─── Leader Tab Config ────────────────────────────────────────────────────────
type LeaderTab = 'announcements' | 'voting' | 'members' | 'market' | 'profile';
const LEADER_TABS: { id: LeaderTab; icon: React.ElementType; en: string; sw: string }[] = [
  { id: 'announcements', icon: Megaphone, en: 'Announce', sw: 'Taarifa' },
  { id: 'voting', icon: Vote, en: 'Votes', sw: 'Kura' },
  { id: 'members', icon: Users, en: 'Members', sw: 'Wanachama' },
  { id: 'market', icon: BarChart3, en: 'Analytics', sw: 'Takwimu' },
  { id: 'profile', icon: Shield, en: 'Profile', sw: 'Wasifu' },
];

// ─── Expert Tab Config ────────────────────────────────────────────────────────
type ExpertTab = 'advisory' | 'research' | 'knowledge' | 'market' | 'profile';
const EXPERT_TABS: { id: ExpertTab; icon: React.ElementType; en: string; sw: string }[] = [
  { id: 'advisory', icon: GraduationCap, en: 'Advisory', sw: 'Ushauri' },
  { id: 'research', icon: Microscope, en: 'Research', sw: 'Utafiti' },
  { id: 'knowledge', icon: BookOpen, en: 'Publish', sw: 'Chapisha' },
  { id: 'market', icon: TrendingUp, en: 'Market', sw: 'Soko' },
  { id: 'profile', icon: Star, en: 'Profile', sw: 'Wasifu' },
];

// ─── Role theme ───────────────────────────────────────────────────────────────
const ROLE_THEME = {
  farmer: {
    primary: '#2D5016',
    accent: '#5A8A00',
    badge: 'bg-[#2D5016]',
    badgeText: 'Farmer',
    badgeTextSw: 'Mkulima',
    icon: Leaf,
    headerBg: 'bg-[#2D5016]',
    navActive: 'bg-[#2D5016] text-white',
    navInactive: 'text-[#2D5016] hover:bg-[#F5F1E8]',
  },
  leader: {
    primary: '#7B3F00',
    accent: '#A05500',
    badge: 'bg-[#7B3F00]',
    badgeText: 'Leader',
    badgeTextSw: 'Kiongozi',
    icon: Shield,
    headerBg: 'bg-[#7B3F00]',
    navActive: 'bg-[#7B3F00] text-white',
    navInactive: 'text-[#7B3F00] hover:bg-[#FDF0E6]',
  },
  expert: {
    primary: '#1E3A5F',
    accent: '#2E5A8F',
    badge: 'bg-[#1E3A5F]',
    badgeText: 'Expert',
    badgeTextSw: 'Mtaalamu',
    icon: GraduationCap,
    headerBg: 'bg-[#1E3A5F]',
    navActive: 'bg-[#1E3A5F] text-white',
    navInactive: 'text-[#1E3A5F] hover:bg-[#EEF2F8]',
  },
};

// ─── Leader: Members Panel ────────────────────────────────────────────────────
function MembersPanel({ language }: { language: 'en' | 'sw' }) {
  const members = [
    { name: 'John Kamau', region: 'Nakuru', status: 'active', crops: 'Maize, Beans', joined: '2024-03' },
    { name: 'Esther Njeri', region: 'Nakuru', status: 'active', crops: 'Tomatoes, Kale', joined: '2024-05' },
    { name: 'Peter Mwangi', region: 'Nakuru', status: 'pending', crops: 'Wheat', joined: '2025-01' },
    { name: 'Grace Achieng', region: 'Kisumu', status: 'active', crops: 'Rice, Sorghum', joined: '2023-11' },
    { name: 'David Omondi', region: 'Kisumu', status: 'inactive', crops: 'Sugarcane', joined: '2023-06' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: language === 'en' ? 'Total Members' : 'Jumla ya Wanachama', value: '247', color: 'bg-[#7B3F00]' },
          { label: language === 'en' ? 'Active' : 'Wanaofanya Kazi', value: '201', color: 'bg-green-700' },
          { label: language === 'en' ? 'Pending' : 'Wanaosubiri', value: '46', color: 'bg-amber-600' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} text-white rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs mt-1 opacity-90">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#FDF0E6] border-b border-[#F5D9BE]">
          <h3 className="font-semibold text-[#7B3F00]">
            {language === 'en' ? 'Member Directory' : 'Orodha ya Wanachama'}
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {members.map((m) => (
            <div key={m.name} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#7B3F00] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.crops} · {m.region}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                m.status === 'active' ? 'bg-green-100 text-green-700' :
                m.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-500'
              }`}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Leader: Announcements Panel ──────────────────────────────────────────────
function AnnouncementsPanel({ user, language }: { user: User; language: 'en' | 'sw' }) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const announcements = [
    { title: 'Planting Season Reminder', body: 'Rains expected next week — ensure seeds are ready.', date: '2026-06-03', reach: 247 },
    { title: 'Fertilizer Subsidy', body: 'Government subsidy available at Nakuru depot until 30 June.', date: '2026-05-28', reach: 247 },
    { title: 'Market Day Change', body: 'This month market day moved to 15th June.', date: '2026-05-20', reach: 200 },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) { setSent(true); setMessage(''); setTimeout(() => setSent(false), 3000); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-[#7B3F00] mb-4 flex items-center gap-2">
          <Megaphone className="w-5 h-5" />
          {language === 'en' ? 'Send Announcement' : 'Tuma Taarifa'}
        </h3>
        <form onSubmit={handleSend} className="space-y-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full border-2 border-[#D4A574] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00] resize-none"
            placeholder={language === 'en' ? 'Write your announcement to all members...' : 'Andika taarifa kwa wanachama wote...'}
          />
          {sent && <p className="text-green-600 text-sm font-medium">✓ {language === 'en' ? 'Announcement sent to 247 members!' : 'Taarifa imetumwa kwa wanachama 247!'}</p>}
          <button type="submit" className="bg-[#7B3F00] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#9B5F20] transition-colors">
            {language === 'en' ? 'Send to All Members' : 'Tuma kwa Wanachama Wote'}
          </button>
        </form>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-[#7B3F00]">{language === 'en' ? 'Recent Announcements' : 'Taarifa za Hivi Karibuni'}</h3>
        {announcements.map((a) => (
          <div key={a.title} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-medium text-gray-800 text-sm">{a.title}</h4>
              <span className="text-xs text-gray-400">{a.date}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{a.body}</p>
            <span className="text-xs text-[#7B3F00] bg-[#FDF0E6] px-2 py-0.5 rounded-full">
              {language === 'en' ? `Reached ${a.reach} members` : `Wanachama ${a.reach} walipata`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Leader: Analytics Panel ──────────────────────────────────────────────────
function LeaderAnalyticsPanel({ language }: { language: 'en' | 'sw' }) {
  const metrics = [
    { label: language === 'en' ? 'Avg. Yield (kg/acre)' : 'Wastani wa Mavuno', value: '1,240', change: '+8%', up: true },
    { label: language === 'en' ? 'Revenue (KES)' : 'Mapato (KES)', value: '2.4M', change: '+12%', up: true },
    { label: language === 'en' ? 'Active Votes' : 'Kura Zinazoendelea', value: '3', change: '', up: true },
    { label: language === 'en' ? 'Avg. Price per kg' : 'Bei ya Kilo moja', value: 'KES 42', change: '+5%', up: true },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{m.label}</div>
            <div className="text-xl font-bold text-[#7B3F00]">{m.value}</div>
            {m.change && (
              <div className={`text-xs font-medium mt-1 ${m.up ? 'text-green-600' : 'text-red-500'}`}>{m.change} {language === 'en' ? 'vs last month' : 'dhidi ya mwezi uliopita'}</div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-[#7B3F00] mb-4">{language === 'en' ? 'Top Crops by Revenue' : 'Mazao Bora kwa Mapato'}</h3>
        {[
          { crop: 'Maize / Mahindi', pct: 72, revenue: 'KES 1.73M' },
          { crop: 'Beans / Maharagwe', pct: 45, revenue: 'KES 480K' },
          { crop: 'Tomatoes / Nyanya', pct: 38, revenue: 'KES 310K' },
        ].map((c) => (
          <div key={c.crop} className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{c.crop}</span><span className="font-medium">{c.revenue}</span>
            </div>
            <div className="bg-gray-100 rounded-full h-2">
              <div className="bg-[#7B3F00] h-2 rounded-full" style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Expert: Advisory Panel ────────────────────────────────────────────────────
function AdvisoryPanel({ user, language }: { user: User; language: 'en' | 'sw' }) {
  const [reply, setReply] = useState<{ [k: string]: string }>({});
  const queries = [
    { id: '1', farmer: 'John Kamau', region: 'Nakuru', question: 'My maize leaves are turning yellow. What should I do?', questionSw: 'Majani ya mahindi yangu yanageuka njano. Nifanye nini?', date: '2026-06-04', urgent: true },
    { id: '2', farmer: 'Esther Njeri', region: 'Nakuru', question: 'Best time to plant tomatoes in June rains?', questionSw: 'Wakati mzuri wa kupanda nyanya wakati wa mvua za Juni?', date: '2026-06-03', urgent: false },
    { id: '3', farmer: 'Grace Achieng', region: 'Kisumu', question: 'How much NPK fertilizer per acre for rice?', questionSw: 'Kiasi gani cha mbolea ya NPK kwa ekari moja ya mpunga?', date: '2026-06-02', urgent: false },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 mb-2">
        {[
          { label: language === 'en' ? 'Open Queries' : 'Maswali Wazi', value: '12', color: 'bg-red-600' },
          { label: language === 'en' ? 'Answered Today' : 'Yaliyojibiwa Leo', value: '5', color: 'bg-[#1E3A5F]' },
          { label: language === 'en' ? 'Rating' : 'Ukadiriaji', value: '4.9★', color: 'bg-amber-600' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} text-white rounded-xl p-3 text-center`}>
            <div className="text-lg font-bold">{s.value}</div>
            <div className="text-xs mt-0.5 opacity-90">{s.label}</div>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-[#1E3A5F]">{language === 'en' ? 'Farmer Queries' : 'Maswali ya Wakulima'}</h3>
      {queries.map((q) => (
        <div key={q.id} className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2D5016] rounded-full flex items-center justify-center text-white text-xs font-bold">
                {q.farmer.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">{q.farmer}</div>
                <div className="text-xs text-gray-400">{q.region} · {q.date}</div>
              </div>
            </div>
            {q.urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Urgent</span>}
          </div>
          <p className="text-sm text-gray-700 mb-3 italic">"{language === 'en' ? q.question : q.questionSw}"</p>
          <div className="flex gap-2">
            <input
              value={reply[q.id] || ''}
              onChange={(e) => setReply({ ...reply, [q.id]: e.target.value })}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
              placeholder={language === 'en' ? 'Your expert advice...' : 'Ushauri wako wa kitaalamu...'}
            />
            <button className="bg-[#1E3A5F] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#2E5A8F] transition-colors">
              {language === 'en' ? 'Reply' : 'Jibu'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Expert: Research Panel ────────────────────────────────────────────────────
function ResearchPanel({ language }: { language: 'en' | 'sw' }) {
  const papers = [
    { title: 'Maize Yield Optimization in Semi-Arid Kenya', status: 'published', views: 1240, date: '2026-04' },
    { title: 'Soil pH Management for Smallholders', status: 'published', views: 890, date: '2026-02' },
    { title: 'Integrated Pest Management for Tomatoes', status: 'draft', views: 0, date: '2026-06' },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-[#1E3A5F] text-white rounded-xl p-5">
        <h3 className="font-semibold mb-1">{language === 'en' ? 'Your Impact' : 'Athari Yako'}</h3>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[
            { label: language === 'en' ? 'Papers' : 'Makala', value: '14' },
            { label: language === 'en' ? 'Total Views' : 'Maoni Yote', value: '8.4K' },
            { label: language === 'en' ? 'Citations' : 'Marejeo', value: '62' },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs opacity-80 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="font-semibold text-[#1E3A5F]">{language === 'en' ? 'Your Publications' : 'Machapisho Yako'}</h3>
      {papers.map((p) => (
        <div key={p.title} className="bg-white rounded-xl shadow-sm p-4 flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-1">{p.title}</h4>
            <div className="text-xs text-gray-400">{p.date} · {p.status === 'published' ? `${p.views} views` : 'Draft'}</div>
          </div>
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
            p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {p.status}
          </span>
        </div>
      ))}

      <button className="w-full border-2 border-dashed border-[#1E3A5F] text-[#1E3A5F] py-4 rounded-xl text-sm font-medium hover:bg-[#EEF2F8] transition-colors">
        + {language === 'en' ? 'Submit New Research' : 'Wasilisha Utafiti Mpya'}
      </button>
    </div>
  );
}

// ─── Main Role Dashboard ──────────────────────────────────────────────────────
export function RoleDashboard({ user, language, onGoHome, onLanguageChange }: RoleDashboardProps) {
  const theme = ROLE_THEME[user.role];
  const RoleIcon = theme.icon;

  const getBackgroundImage = (tab: string) => {
    switch (tab) {
      case 'echo': case 'announcements': case 'advisory': return farmersImage;
      case 'voting': case 'members': case 'research': return goatImage;
      case 'knowledge': return cornImage;
      case 'market': return bananaImage;
      default: return peppersImage;
    }
  };

  // ── Farmer ──
  const [farmerTab, setFarmerTab] = useState<FarmerTab>('market');
  const { isVisible } = useScrollDirection();
  
  if (user.role === 'farmer') {
    return (
      <div className="min-h-screen bg-[#F5F1E8]">
        <div className="relative z-10">
          <header 
            className={`bg-white border-b border-gray-200 shadow-lg fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
              isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
              <button onClick={onGoHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img src={logo} alt="FarmEcho" className="h-7 w-7 rounded-full object-contain bg-white p-1 border border-[#2D5016]" />
              </button>
              <div className="flex items-center gap-3">
                {/* Language Selector */}
                <div className="flex items-center gap-1 bg-[#F5F1E8] rounded-full p-1">
                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      language === 'en' ? 'bg-[#2D5016] text-white' : 'text-[#2D5016] hover:bg-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => onLanguageChange('sw')}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      language === 'sw' ? 'bg-[#2D5016] text-white' : 'text-[#2D5016] hover:bg-white'
                    }`}
                  >
                    SW
                  </button>
                </div>
                <span className="text-xs text-[#2D5016]">{user.name.split(' ')[0]}</span>
                <span className={`${theme.badge} text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}>
                  <RoleIcon className="w-3 h-3" />
                </span>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-6 pb-24 pt-20">
            {farmerTab === 'echo' && <EchoMessaging user={user} language={language} />}
            {farmerTab === 'voting' && <VotingHub user={user} language={language} />}
            {farmerTab === 'knowledge' && <KnowledgeBase user={user} language={language} />}
            {farmerTab === 'market' && <MarketDashboard region={user.region} language={language} />}
            {farmerTab === 'profile' && <UserProfile user={user} language={language} />}
          </main>

          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#8B6F47] shadow-2xl z-50">
            <div className="max-w-7xl mx-auto grid grid-cols-5">
              {FARMER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFarmerTab(tab.id)}
                  className={`flex flex-col items-center py-3 px-2 transition-all ${farmerTab === tab.id ? theme.navActive : theme.navInactive}`}
                >
                  <tab.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{language === 'en' ? tab.en : tab.sw}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Help & Resource Desk */}
          <HelpResourceDesk language={language} />
        </div>
      </div>
    );
  }

  // ── Leader ──
  const [leaderTab, setLeaderTab] = useState<LeaderTab>('announcements');
  if (user.role === 'leader') {
    return (
      <div className="min-h-screen bg-[#FDF0E6]">
        <div className="relative z-10">
          <header 
            className={`bg-white border-b border-gray-200 shadow-lg fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
              isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
              <button onClick={onGoHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img src={logo} alt="FarmEcho" className="h-7 w-7 rounded-full object-contain bg-white p-1 border border-[#7B3F00]" />
              </button>
              <div className="flex items-center gap-3">
                {/* Language Selector */}
                <div className="flex items-center gap-1 bg-[#FDF0E6] rounded-full p-1">
                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      language === 'en' ? 'bg-[#7B3F00] text-white' : 'text-[#7B3F00] hover:bg-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => onLanguageChange('sw')}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      language === 'sw' ? 'bg-[#7B3F00] text-white' : 'text-[#7B3F00] hover:bg-white'
                    }`}
                  >
                    SW
                  </button>
                </div>
                <span className="text-xs text-[#7B3F00]">{user.name.split(' ')[0]}</span>
                <span className="bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                </span>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-6 pb-24 pt-16">
            {leaderTab === 'announcements' && <AnnouncementsPanel user={user} language={language} />}
            {leaderTab === 'voting' && <VotingHub user={user} language={language} />}
            {leaderTab === 'members' && <MembersPanel language={language} />}
            {leaderTab === 'market' && <LeaderAnalyticsPanel language={language} />}
            {leaderTab === 'profile' && <UserProfile user={user} language={language} />}
          </main>

          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#D4A574] shadow-2xl z-50">
            <div className="max-w-7xl mx-auto grid grid-cols-5">
              {LEADER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setLeaderTab(tab.id)}
                  className={`flex flex-col items-center py-3 px-2 transition-all ${leaderTab === tab.id ? theme.navActive : theme.navInactive}`}
                >
                  <tab.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{language === 'en' ? tab.en : tab.sw}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Help & Resource Desk */}
          <HelpResourceDesk language={language} />
        </div>
      </div>
    );
  }

  // ── Expert ──
  const [expertTab, setExpertTab] = useState<ExpertTab>('advisory');
  return (
    <div className="min-h-screen bg-[#EEF2F8]">
      <div className="relative z-10">
        <header 
          className={`bg-white border-b border-gray-200 shadow-lg fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <button onClick={onGoHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo} alt="FarmEcho" className="h-7 w-7 rounded-full object-contain bg-white p-1 border border-[#1E3A5F]" />
            </button>
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-[#EEF2F8] rounded-full p-1">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    language === 'en' ? 'bg-[#1E3A5F] text-white' : 'text-[#1E3A5F] hover:bg-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onLanguageChange('sw')}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    language === 'sw' ? 'bg-[#1E3A5F] text-white' : 'text-[#1E3A5F] hover:bg-white'
                  }`}
                >
                  SW
                </button>
              </div>
              <span className="text-xs text-[#1E3A5F]">{user.name.split(' ')[0]}</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 pb-24 pt-16">
          {expertTab === 'advisory' && <AdvisoryPanel user={user} language={language} />}
          {expertTab === 'research' && <ResearchPanel language={language} />}
          {expertTab === 'knowledge' && <KnowledgeBase user={user} language={language} />}
          {expertTab === 'market' && <MarketDashboard region={user.region} language={language} />}
          {expertTab === 'profile' && <UserProfile user={user} language={language} />}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#4A7AB5] shadow-2xl z-50">
          <div className="max-w-7xl mx-auto grid grid-cols-5">
            {EXPERT_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setExpertTab(tab.id)}
                className={`flex flex-col items-center py-3 px-2 transition-all ${expertTab === tab.id ? theme.navActive : theme.navInactive}`}
              >
                <tab.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{language === 'en' ? tab.en : tab.sw}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Help & Resource Desk */}
        <HelpResourceDesk language={language} />
      </div>
    </div>
  );
}