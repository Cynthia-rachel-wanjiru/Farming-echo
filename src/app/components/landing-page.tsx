import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Users, TrendingUp, Vote, Sparkles, ChevronDown, Menu, X, Phone, Mail, MapPin, Globe } from 'lucide-react';
import logo from 'figma:asset/f071fbeb1656a03851eee645d222a7d311cf60d6.png';
import bananaImage from 'figma:asset/67c626899edb0ab403849ea01e66a744eb8d5d16.png';
import goatImage from 'figma:asset/a7e28fb36f332a77de3f54e3f9a8a52ac793af02.png';
import farmersImage from 'figma:asset/496b32033583eb97083862acbd9e03e1e2885f5f.png';
import backgroundImage from 'figma:asset/b28d3daea87172a0ce8770cebbe51b49fb6c7bec.png';
import cornImage from 'figma:asset/a3ccce87297433cc24ccc4f53fe43fd7c9c74c6c.png';
import peppersImage from 'figma:asset/89fb0ffd3aaa83c323417325d26669a82e774a1e.png';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

// Custom hook for scroll direction detection
function useScrollDirection() {
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
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isVisible;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const isNavVisible = useScrollDirection();

  const heroImages = [backgroundImage, cornImage, farmersImage, goatImage, bananaImage, peppersImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: 'Echo Messaging',
      titleSw: 'Ujumbe wa Sauti',
      description: 'Real-time communication for farming communities',
      descriptionSw: 'Mawasiliano ya wakati halisi kwa jamii za wakulima',
      image: farmersImage,
    },
    {
      icon: Vote,
      title: 'Collective Voting',
      titleSw: 'Kupiga Kura Pamoja',
      description: 'Democratic decision-making with consensus tracking',
      descriptionSw: 'Maamuzi ya kidemokrasia na ufuatiliaji wa maoni',
      image: goatImage,
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      titleSw: 'Habari za Soko',
      description: 'Live crop prices and market trends',
      descriptionSw: 'Bei za mazao na mwelekeo wa soko',
      image: bananaImage,
    },
  ];

  const stats = [
    { number: '10K+', label: 'Farmers', labelSw: 'Wakulima' },
    { number: '500+', label: 'Cooperatives', labelSw: 'Vyama' },
    { number: '50K+', label: 'Messages Daily', labelSw: 'Ujumbe Kila Siku' },
    { number: '98%', label: 'Satisfaction', labelSw: 'Kuridhika' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F1E8] to-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg ${isNavVisible ? '' : 'hidden'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="FarmEcho" className="h-9 w-9 rounded-full object-contain bg-white p-1 border-2 border-[#2D5016]" />
            <span className="text-[#2D5016] font-bold text-xl tracking-tight">FarmEcho</span>
          </div>

          {/* Desktop Nav Links & Language */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-[#F5F1E8] rounded-full p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  language === 'en' ? 'bg-[#2D5016] text-white' : 'text-[#2D5016] hover:bg-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('sw')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  language === 'sw' ? 'bg-[#2D5016] text-white' : 'text-[#2D5016] hover:bg-white'
                }`}
              >
                SW
              </button>
            </div>

            <button
              onClick={() => { setShowAbout(true); setShowContact(false); }}
              className="text-[#2D5016]/70 hover:text-[#2D5016] transition-colors text-sm font-medium"
            >
              {language === 'en' ? 'About' : 'Kuhusu'}
            </button>
            <button
              onClick={() => { setShowContact(true); setShowAbout(false); }}
              className="text-[#2D5016]/70 hover:text-[#2D5016] transition-colors text-sm font-medium"
            >
              {language === 'en' ? 'Contact Us' : 'Wasiliana Nasi'}
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onSignIn}
              className="text-[#2D5016] border border-[#2D5016] hover:bg-[#F5F1E8] px-5 py-2 rounded-full text-sm font-medium transition-all"
            >
              {language === 'en' ? 'Sign In' : 'Ingia'}
            </button>
            <button
              onClick={onGetStarted}
              className="bg-[#5A8A00] hover:bg-[#6BA300] text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow"
            >
              {language === 'en' ? 'Sign Up' : 'Jisajili'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#2D5016] p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
            {/* Language Selector Mobile */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-[#2D5016]" />
              <div className="flex items-center gap-1 bg-[#F5F1E8] rounded-full p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    language === 'en' ? 'bg-[#2D5016] text-white' : 'text-[#2D5016] hover:bg-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('sw')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    language === 'sw' ? 'bg-[#2D5016] text-white' : 'text-[#2D5016] hover:bg-white'
                  }`}
                >
                  SW
                </button>
              </div>
            </div>

            <button
              onClick={() => { setShowAbout(true); setShowContact(false); setMobileMenuOpen(false); }}
              className="block w-full text-left text-[#2D5016]/70 hover:text-[#2D5016] py-2 text-sm font-medium"
            >
              {language === 'en' ? 'About' : 'Kuhusu'}
            </button>
            <button
              onClick={() => { setShowContact(true); setShowAbout(false); setMobileMenuOpen(false); }}
              className="block w-full text-left text-[#2D5016]/70 hover:text-[#2D5016] py-2 text-sm font-medium"
            >
              {language === 'en' ? 'Contact Us' : 'Wasiliana Nasi'}
            </button>
            <div className="flex gap-3 pt-2">
              <button
                onClick={onSignIn}
                className="flex-1 text-[#2D5016] border border-[#2D5016] px-4 py-2 rounded-full text-sm font-medium"
              >
                {language === 'en' ? 'Sign In' : 'Ingia'}
              </button>
              <button
                onClick={onGetStarted}
                className="flex-1 bg-[#5A8A00] text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                {language === 'en' ? 'Sign Up' : 'Jisajili'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowAbout(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src={logo} alt="FarmEcho" className="h-10 w-10 rounded-full bg-[#F5F1E8] p-1 border-2 border-[#2D5016]" />
                <h2 className="text-2xl font-bold text-[#2D5016]">About FarmEcho</h2>
              </div>
              <button onClick={() => setShowAbout(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-gray-700 mb-4">
              FarmEcho is a comprehensive digital network platform built for Kenyan smallholder farmers. We bridge the communication gap in rural farming communities by enabling real-time messaging, collective decision-making, and market intelligence—all optimized for low-bandwidth connections.
            </p>
            <p className="text-gray-600 italic mb-4">
              FarmEcho ni jukwaa la mtandao wa kidijitali lililojengwa kwa wakulima wadogo wa Kenya.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { n: '10K+', l: 'Farmers / Wakulima' },
                { n: '500+', l: 'Cooperatives / Vyama' },
                { n: '6', l: 'Regions / Mikoa' },
                { n: '2026', l: 'Founded / Ilianzishwa' },
              ].map((s) => (
                <div key={s.n} className="bg-[#F5F1E8] rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#2D5016]">{s.n}</div>
                  <div className="text-xs text-[#8B6F47] mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAbout(false)}
              className="mt-6 w-full bg-[#2D5016] text-white py-3 rounded-xl font-medium hover:bg-[#3D6520] transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowContact(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2D5016]">Contact Us / Wasiliana Nasi</h2>
              <button onClick={() => setShowContact(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-[#F5F1E8] rounded-xl">
                <Phone className="w-5 h-5 text-[#2D5016] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#2D5016]">Phone / Simu</div>
                  <div className="text-gray-600 text-sm">+254 700 123 456</div>
                  <div className="text-gray-500 text-xs italic">Mon–Fri, 8am–6pm EAT</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#F5F1E8] rounded-xl">
                <Mail className="w-5 h-5 text-[#2D5016] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#2D5016]">Email / Barua Pepe</div>
                  <div className="text-gray-600 text-sm">support@farmecho.co.ke</div>
                  <div className="text-gray-500 text-xs italic">We reply within 24 hours</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#F5F1E8] rounded-xl">
                <MapPin className="w-5 h-5 text-[#2D5016] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#2D5016]">Office / Ofisi</div>
                  <div className="text-gray-600 text-sm">Westlands Business Park, Nairobi, Kenya</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowContact(false)}
              className="mt-6 w-full bg-[#2D5016] text-white py-3 rounded-xl font-medium hover:bg-[#3D6520] transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1 : 1.1,
              }}
              transition={{ duration: 1.5 }}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="FarmEcho" 
              className="h-24 w-24 mx-auto rounded-full object-contain bg-white p-3 shadow-2xl border-4 border-white"
            />
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Welcome to <span className="text-[#F5F1E8]">FarmEcho</span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#F5F1E8] mb-4"
          >
            Connect. Decide. Prosper Together.
          </motion.p>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-12 italic"
          >
            Unganisha. Amua. Stawi Pamoja.
          </motion.p>

          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-white text-[#2D5016] px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto group"
          >
            Get Started
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </motion.button>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#2D5016] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold mb-2 text-[#F5F1E8]"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm md:text-base text-white/80">{stat.label}</div>
                <div className="text-xs text-white/60 italic">{stat.labelSw}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D5016] mb-4">
              Empowering Farmers
            </h2>
            <p className="text-xl text-[#8B6F47] italic">Kuwawezesha Wakulima</p>
          </motion.div>

          <div className="space-y-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-12`}
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-full md:w-1/2"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mb-4"
                  >
                    <feature.icon className="w-16 h-16 text-[#2D5016] bg-[#F5F1E8] p-3 rounded-2xl" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-[#2D5016] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-[#8B6F47] mb-4 italic">
                    {feature.titleSw}
                  </p>
                  <p className="text-xl text-gray-700 mb-3">
                    {feature.description}
                  </p>
                  <p className="text-lg text-gray-600 italic">
                    {feature.descriptionSw}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section with Parallax */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${goatImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-[#2D5016]/85" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Users className="w-20 h-20 text-[#F5F1E8] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join 10,000+ Kenyan Farmers
            </h2>
            <p className="text-xl md:text-2xl text-[#F5F1E8] mb-4">
              Building stronger communities through digital connectivity
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-10 italic">
              Kujenga jamii imara kupitia uhusiano wa kidijitali
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-[#F5F1E8] text-[#2D5016] px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3 group"
            >
              <Sparkles className="w-6 h-6" />
              Join Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Market Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={bananaImage}
                  alt="Market"
                  className="w-full h-96 object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="w-16 h-16 text-[#2D5016] bg-[#F5F1E8] p-3 rounded-2xl mb-6" />
              <h2 className="text-4xl font-bold text-[#2D5016] mb-4">
                Real-Time Market Data
              </h2>
              <p className="text-lg text-[#8B6F47] mb-6 italic">
                Data za Soko za Wakati Halisi
              </p>
              <ul className="space-y-4 text-lg text-gray-700">
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Live crop prices across Kenya
                </motion.li>
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Market trends and forecasts
                </motion.li>
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Connect with buyers directly
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Corn Production Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <Sparkles className="w-16 h-16 text-[#2D5016] bg-[#F5F1E8] p-3 rounded-2xl mb-6" />
              <h2 className="text-4xl font-bold text-[#2D5016] mb-4">
                Sustainable Farming Practices
              </h2>
              <p className="text-lg text-[#8B6F47] mb-6 italic">
                Mbinu za Kilimo Endelevu
              </p>
              <ul className="space-y-4 text-lg text-gray-700">
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Expert guidance from agricultural specialists
                </motion.li>
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Best practices for higher yields
                </motion.li>
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Community knowledge sharing
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={cornImage}
                  alt="Corn Production"
                  className="w-full h-96 object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Peppers/Crops Diversity Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={peppersImage}
                  alt="Crop Diversity"
                  className="w-full h-96 object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <MessageSquare className="w-16 h-16 text-[#2D5016] bg-[#F5F1E8] p-3 rounded-2xl mb-6" />
              <h2 className="text-4xl font-bold text-[#2D5016] mb-4">
                Diverse Crop Knowledge
              </h2>
              <p className="text-lg text-[#8B6F47] mb-6 italic">
                Maarifa ya Mazao Mbalimbali
              </p>
              <ul className="space-y-4 text-lg text-gray-700">
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Grow multiple high-value crops
                </motion.li>
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Learn from successful farmers
                </motion.li>
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#2D5016] rounded-full" />
                  Access to premium market buyers
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#2D5016] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl md:text-2xl text-[#F5F1E8] mb-4">
              Tayari Kubadilisha Kilimo Chako?
            </p>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of Kenyan farmers already using FarmEcho to improve their livelihoods and strengthen their communities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-white text-[#2D5016] px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3 group"
            >
              Start Your Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2F0C] text-white/80 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2026 FarmEcho. Built with ❤️ for Kenyan smallholder farmers.
          </p>
          <p className="text-xs mt-2 italic">
            Imeundwa kwa upendo kwa wakulima wadogo wa Kenya.
          </p>
        </div>
      </footer>
    </div>
  );
}