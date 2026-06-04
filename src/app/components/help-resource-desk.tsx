import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, Phone, Mail, MessageCircle, Book, Video, 
  FileText, ExternalLink, ChevronDown, ChevronUp, Search,
  Headphones, MapPin, Clock, Globe
} from 'lucide-react';

interface HelpResourceDeskProps {
  language: 'en' | 'sw';
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface ResourceItem {
  title: string;
  description: string;
  type: 'video' | 'document' | 'guide';
  link: string;
}

export function HelpResourceDesk({ language }: HelpResourceDeskProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'faq' | 'resources' | 'contact'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const translations = {
    en: {
      title: 'Help & Resource Desk',
      subtitle: 'Get support and learn how to use FarmEcho',
      faq: 'Frequently Asked Questions',
      resources: 'Learning Resources',
      contact: 'Contact Support',
      search: 'Search for help...',
      showMore: 'Show Help Desk',
      showLess: 'Hide Help Desk',
      hotline: '24/7 Farmer Hotline',
      email: 'Email Support',
      whatsapp: 'WhatsApp Support',
      visitUs: 'Visit Our Office',
      officeHours: 'Office Hours',
      watchTutorial: 'Watch Tutorial',
      downloadGuide: 'Download Guide',
      readMore: 'Read More',
      categories: {
        account: 'Account & Profile',
        messaging: 'Echo Messaging',
        voting: 'Voting & Decisions',
        market: 'Market & Trading',
        technical: 'Technical Issues',
      },
    },
    sw: {
      title: 'Dawati la Msaada na Rasilimali',
      subtitle: 'Pata msaada na ujifunze jinsi ya kutumia FarmEcho',
      faq: 'Maswali Yanayoulizwa Mara kwa Mara',
      resources: 'Rasilimali za Kujifunza',
      contact: 'Wasiliana na Msaada',
      search: 'Tafuta msaada...',
      showMore: 'Onyesha Dawati la Msaada',
      showLess: 'Ficha Dawati la Msaada',
      hotline: 'Simu ya Wakulima 24/7',
      email: 'Msaada wa Barua Pepe',
      whatsapp: 'Msaada wa WhatsApp',
      visitUs: 'Tembelea Ofisi Yetu',
      officeHours: 'Saa za Ofisi',
      watchTutorial: 'Tazama Mafunzo',
      downloadGuide: 'Pakua Mwongozo',
      readMore: 'Soma Zaidi',
      categories: {
        account: 'Akaunti na Wasifu',
        messaging: 'Ujumbe wa Echo',
        voting: 'Kupiga Kura na Maamuzi',
        market: 'Soko na Biashara',
        technical: 'Matatizo ya Kiufundi',
      },
    },
  };

  const t = translations[language];

  const faqs: FAQItem[] = [
    {
      question: language === 'en' ? 'How do I change my profile picture?' : 'Jinsi ya kubadilisha picha yangu ya wasifu?',
      answer: language === 'en' 
        ? 'Go to your Profile, click the camera icon on your profile picture, and upload a new photo. Supported formats are JPG, PNG, and GIF up to 5MB.'
        : 'Nenda kwenye Wasifu wako, bofya ikoni ya kamera kwenye picha yako ya wasifu, na pakia picha mpya. Muundo unaotumika ni JPG, PNG, na GIF hadi 5MB.',
      category: 'account',
    },
    {
      question: language === 'en' ? 'How do I send a message in Echo?' : 'Jinsi ya kutuma ujumbe katika Echo?',
      answer: language === 'en'
        ? 'Navigate to the Echo Messaging tab, select a contact or conversation, type your message in the input field, and press send. You can also send voice notes by holding the microphone button.'
        : 'Nenda kwenye kichupo cha Ujumbe wa Echo, chagua mwasiliani au mazungumzo, andika ujumbe wako kwenye sehemu ya kuingiza, na bonyeza tuma. Unaweza pia kutuma maelezo ya sauti kwa kushikilia kitufe cha kipaza sauti.',
      category: 'messaging',
    },
    {
      question: language === 'en' ? 'How does voting work?' : 'Kupiga kura kunafanyaje kazi?',
      answer: language === 'en'
        ? 'Go to the Voting Hub to see active proposals. Read the details, select your choice, and submit your vote. You can see live results and consensus tracking after voting.'
        : 'Nenda kwenye Kitovu cha Kupiga Kura kuona mapendekezo yanayofanya kazi. Soma maelezo, chagua chaguo lako, na wasilisha kura yako. Unaweza kuona matokeo ya moja kwa moja na ufuatiliaji wa makubaliano baada ya kupiga kura.',
      category: 'voting',
    },
    {
      question: language === 'en' ? 'How do I buy farm inputs from the marketplace?' : 'Jinsi ya kununua vifaa vya shamba kutoka sokoni?',
      answer: language === 'en'
        ? 'Navigate to the Market tab, select "Marketplace", browse or search for products, and click on an item to view details. Contact the seller using the phone number provided to complete the purchase.'
        : 'Nenda kwenye kichupo cha Soko, chagua "Soko", vinjari au tafuta bidhaa, na bofya bidhaa ili kuona maelezo. Wasiliana na muuzaji kwa kutumia nambari ya simu iliyotolewa kukamilisha ununuzi.',
      category: 'market',
    },
    {
      question: language === 'en' ? 'What if I forgot my password?' : 'Je, nikisahau nenosiri langu?',
      answer: language === 'en'
        ? 'On the Sign In page, click "Forgot Password?", enter your phone number, and follow the instructions to reset your password.'
        : 'Kwenye ukurasa wa Kuingia, bofya "Umesahau Nenosiri?", ingiza nambari yako ya simu, na fuata maagizo ili kuweka upya nenosiri lako.',
      category: 'account',
    },
    {
      question: language === 'en' ? 'Why can\'t I see the marketplace?' : 'Kwa nini siwezi kuona soko?',
      answer: language === 'en'
        ? 'Make sure you have a stable internet connection. If the problem persists, try refreshing the page or contact support for assistance.'
        : 'Hakikisha una muunganisho imara wa mtandao. Ikiwa tatizo linaendelea, jaribu kuhuisha ukurasa au wasiliana na msaada kwa usaidizi.',
      category: 'technical',
    },
    {
      question: language === 'en' ? 'How do I change the language?' : 'Jinsi ya kubadilisha lugha?',
      answer: language === 'en'
        ? 'You can change the language using the EN/SW toggle buttons in the navigation bar at the top of any page.'
        : 'Unaweza kubadilisha lugha kwa kutumia vitufe vya kubadilisha EN/SW kwenye upau wa urambazaji juu ya ukurasa wowote.',
      category: 'account',
    },
    {
      question: language === 'en' ? 'How can I verify if a product is genuine?' : 'Jinsi ya kuthibitisha ikiwa bidhaa ni halali?',
      answer: language === 'en'
        ? 'In the marketplace, look for products with the "Verified" badge. You can also use the "Verify Seedling" feature to scan products and check their authenticity.'
        : 'Katika soko, tafuta bidhaa zenye alama ya "Imethibitishwa". Unaweza pia kutumia kipengele cha "Thibitisha Mche" ili kupima bidhaa na kuangalia uhalali wao.',
      category: 'market',
    },
  ];

  const resources: ResourceItem[] = [
    {
      title: language === 'en' ? 'Getting Started with FarmEcho' : 'Kuanza na FarmEcho',
      description: language === 'en' 
        ? 'A comprehensive video tutorial covering account setup, navigation, and basic features.'
        : 'Mafunzo ya video kamili yanayoshughulikia usanidi wa akaunti, urambazaji, na vipengele vya msingi.',
      type: 'video',
      link: '#',
    },
    {
      title: language === 'en' ? 'Echo Messaging Guide' : 'Mwongozo wa Ujumbe wa Echo',
      description: language === 'en'
        ? 'Learn how to effectively communicate with other farmers and experts using the Echo system.'
        : 'Jifunze jinsi ya kuwasiliana kwa ufanisi na wakulima wengine na wataalam kwa kutumia mfumo wa Echo.',
      type: 'guide',
      link: '#',
    },
    {
      title: language === 'en' ? 'Marketplace Best Practices' : 'Mbinu Bora za Soko',
      description: language === 'en'
        ? 'Tips for buying and selling safely on the FarmEcho marketplace.'
        : 'Vidokezo vya kununua na kuuza kwa usalama kwenye soko la FarmEcho.',
      type: 'document',
      link: '#',
    },
    {
      title: language === 'en' ? 'Understanding Voting & Consensus' : 'Kuelewa Kupiga Kura na Makubaliano',
      description: language === 'en'
        ? 'How to participate in cooperative decision-making and track consensus.'
        : 'Jinsi ya kushiriki katika kufanya maamuzi ya ushirikiano na kufuatilia makubaliano.',
      type: 'video',
      link: '#',
    },
    {
      title: language === 'en' ? 'Market Intelligence Dashboard' : 'Dashibodi ya Ujuzi wa Soko',
      description: language === 'en'
        ? 'Learn to interpret crop prices, trends, and market forecasts.'
        : 'Jifunze kutafsiri bei za mazao, mitindo, na utabiri wa soko.',
      type: 'guide',
      link: '#',
    },
    {
      title: language === 'en' ? 'Profile & Account Management' : 'Usimamizi wa Wasifu na Akaunti',
      description: language === 'en'
        ? 'Complete guide to managing your profile, privacy, and account settings.'
        : 'Mwongozo kamili wa kusimamia wasifu wako, faragha, na mipangilio ya akaunti.',
      type: 'document',
      link: '#',
    },
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'document': return FileText;
      case 'guide': return Book;
      default: return FileText;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pb-16">
      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-[#2D5016] hover:bg-[#3D6B1F] text-white px-6 py-3 rounded-t-xl shadow-2xl font-semibold flex items-center gap-2 transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          {isExpanded ? t.showLess : t.showMore}
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>
      </div>

      {/* Help Desk Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-t-4 border-[#2D5016] shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-[#2D5016] mb-2 flex items-center justify-center gap-2">
                  <HelpCircle className="w-8 h-8" />
                  {t.title}
                </h2>
                <p className="text-[#8B6F47]">{t.subtitle}</p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 justify-center flex-wrap">
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'faq'
                      ? 'bg-[#2D5016] text-white'
                      : 'bg-[#F5F1E8] text-[#2D5016] hover:bg-[#E8E4D9]'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.faq}
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'resources'
                      ? 'bg-[#2D5016] text-white'
                      : 'bg-[#F5F1E8] text-[#2D5016] hover:bg-[#E8E4D9]'
                  }`}
                >
                  <Book className="w-5 h-5" />
                  {t.resources}
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'contact'
                      ? 'bg-[#2D5016] text-white'
                      : 'bg-[#F5F1E8] text-[#2D5016] hover:bg-[#E8E4D9]'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  {t.contact}
                </button>
              </div>

              {/* Content */}
              <div className="bg-[#F5F1E8] rounded-xl p-6 max-h-96 overflow-y-auto">
                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div>
                    {/* Search */}
                    <div className="relative mb-6">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.search}
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016] bg-white"
                      />
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-3">
                      {filteredFAQs.map((faq, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                            className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-[#F5F1E8] transition-colors"
                          >
                            <span className="font-semibold text-[#2D5016] flex-1 pr-2">
                              {faq.question}
                            </span>
                            {expandedFAQ === index ? (
                              <ChevronUp className="w-5 h-5 text-[#8B6F47] flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[#8B6F47] flex-shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedFAQ === index && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 text-[#8B6F47] border-t border-[#E8E4D9]">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.map((resource, index) => {
                      const Icon = getResourceIcon(resource.type);
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 bg-[#2D5016] rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-[#2D5016] mb-1">{resource.title}</h4>
                              <p className="text-sm text-[#8B6F47]">{resource.description}</p>
                            </div>
                          </div>
                          <a
                            href={resource.link}
                            className="inline-flex items-center gap-2 text-[#2D5016] font-semibold hover:text-[#3D6B1F] transition-colors"
                          >
                            {resource.type === 'video' ? t.watchTutorial : resource.type === 'document' ? t.downloadGuide : t.readMore}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Hotline */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-[#2D5016] text-lg mb-2">{t.hotline}</h4>
                      <a href="tel:+254700000000" className="text-xl font-bold text-green-600 hover:underline">
                        +254 700 000 000
                      </a>
                      <p className="text-sm text-[#8B6F47] mt-2">
                        {language === 'en' ? 'Available 24/7 for urgent support' : 'Inapatikana 24/7 kwa msaada wa dharura'}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-[#2D5016] text-lg mb-2">{t.email}</h4>
                      <a href="mailto:support@farmecho.co.ke" className="text-lg font-bold text-blue-600 hover:underline break-all">
                        support@farmecho.co.ke
                      </a>
                      <p className="text-sm text-[#8B6F47] mt-2">
                        {language === 'en' ? 'Response within 24 hours' : 'Jibu ndani ya masaa 24'}
                      </p>
                    </div>

                    {/* WhatsApp */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                        <Headphones className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-[#2D5016] text-lg mb-2">{t.whatsapp}</h4>
                      <a href="https://wa.me/254700000000" className="text-xl font-bold text-green-700 hover:underline">
                        +254 700 000 000
                      </a>
                      <p className="text-sm text-[#8B6F47] mt-2">
                        {language === 'en' ? 'Chat with our support team' : 'Piga gumzo na timu yetu ya msaada'}
                      </p>
                    </div>

                    {/* Office */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-[#2D5016] text-lg mb-2">{t.visitUs}</h4>
                      <p className="text-[#2D5016] font-semibold mb-1">
                        {language === 'en' ? 'Nairobi Office' : 'Ofisi ya Nairobi'}
                      </p>
                      <p className="text-sm text-[#8B6F47] mb-3">
                        Kilimo House, Cathedral Road<br />Nairobi, Kenya
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#8B6F47]">
                        <Clock className="w-4 h-4" />
                        {language === 'en' ? 'Mon-Fri: 8AM - 5PM' : 'Jumatatu-Ijumaa: 8AM - 5PM'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
