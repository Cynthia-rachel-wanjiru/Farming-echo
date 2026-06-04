import React, { useState, useRef, useEffect } from 'react';
import { User } from '../App';
import { Send, Mic, Image as ImageIcon, Search, ArrowLeft, MoreVertical, Check, CheckCheck, HelpCircle, MessageCircle, Bot, Sparkles, Phone, Video, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateAIResponse } from '../../modules/ai/knowledge/farming-knowledge-base';

interface Message {
  id: string;
  sender: string;
  senderId: string;
  senderRole: string;
  content: string;
  type: 'text' | 'voice' | 'image' | 'question' | 'answer';
  timestamp: Date;
  isEcho?: boolean;
  isRead?: boolean;
  questionId?: string;
}

interface Contact {
  id: string;
  name: string;
  role: 'farmer' | 'leader' | 'expert' | 'ai';
  cooperative: string;
  lastMessage?: string;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: Date;
}

interface EchoMessagingProps {
  user: User;
  language: 'en' | 'sw';
}

export function EchoMessaging({ user, language }: EchoMessagingProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock contacts (including AI as a contact)
  const [contacts] = useState<Contact[]>([
    { id: 'ai', name: 'FarmEcho AI Assistant', role: 'ai', cooperative: '24/7 Farming Support', lastMessage: 'How can I help you today?', unreadCount: 0, isOnline: true },
    { id: '1', name: 'Dr. Samuel Ochieng', role: 'expert', cooperative: 'Kenya Agricultural Board', lastMessage: 'Your maize leaves issue is likely nitrogen deficiency...', unreadCount: 2, isOnline: true },
    { id: '2', name: 'Mary Wanjiku', role: 'leader', cooperative: 'Rift Valley Cooperative Union', lastMessage: 'Meeting scheduled for next Monday', unreadCount: 0, isOnline: true },
    { id: '3', name: 'John Kamau', role: 'farmer', cooperative: 'Kirinyaga Farmers Cooperative', lastMessage: 'Thanks for the fertilizer tip!', unreadCount: 1, isOnline: false, lastSeen: new Date(Date.now() - 7200000) },
    { id: '4', name: 'Esther Njeri', role: 'farmer', cooperative: 'Nakuru Farmers Group', lastMessage: 'Which seed variety did you use?', unreadCount: 0, isOnline: false, lastSeen: new Date(Date.now() - 3600000) },
    { id: '5', name: 'Peter Mwangi', role: 'farmer', cooperative: 'Kirinyaga Farmers Cooperative', lastMessage: 'The tomato harvest looks great!', unreadCount: 0, isOnline: true },
  ]);

  // Mock conversations
  const [conversations, setConversations] = useState<{ [key: string]: Message[] }>({
    'ai': [
      {
        id: 'ai1',
        sender: 'FarmEcho AI',
        senderId: 'ai',
        senderRole: 'ai',
        content: language === 'en'
          ? `Hello ${user.name.split(' ')[0]}! 👋 I'm your FarmEcho AI assistant. I can help with crop advice, pest control, market prices, and more. What would you like to know?`
          : `Habari ${user.name.split(' ')[0]}! 👋 Mimi ni msaidizi wako wa FarmEcho AI. Ninaweza kusaidia na ushauri wa mazao, kudhibiti wadudu, bei za soko, na zaidi. Ungependa kujua nini?`,
        type: 'text',
        timestamp: new Date(Date.now() - 86400000),
        isRead: true,
      },
    ],
    '1': [
      {
        id: 'm1',
        sender: user.name,
        senderId: user.id,
        senderRole: 'farmer',
        content: 'My maize leaves are turning yellow. What should I do?',
        type: 'question',
        timestamp: new Date(Date.now() - 7200000),
        isRead: true,
      },
      {
        id: 'm2',
        sender: 'Dr. Samuel Ochieng',
        senderId: '1',
        senderRole: 'expert',
        content: 'Yellow leaves typically indicate nitrogen deficiency. I recommend applying NPK 23:23:0 fertilizer at 50kg per acre.',
        type: 'answer',
        timestamp: new Date(Date.now() - 3600000),
        isRead: false,
        questionId: 'm1',
      },
      {
        id: 'm3',
        sender: 'Dr. Samuel Ochieng',
        senderId: '1',
        senderRole: 'expert',
        content: 'Also ensure proper irrigation - maize needs consistent moisture at this stage.',
        type: 'text',
        timestamp: new Date(Date.now() - 3500000),
        isRead: false,
      },
    ],
    '2': [
      {
        id: 'm4',
        sender: 'Mary Wanjiku',
        senderId: '2',
        senderRole: 'leader',
        content: 'Reminder: Cooperative meeting next Monday at 2 PM to discuss bulk seed purchasing.',
        type: 'text',
        timestamp: new Date(Date.now() - 1800000),
        isRead: true,
      },
      {
        id: 'm5',
        sender: 'Mary Wanjiku',
        senderId: '2',
        senderRole: 'leader',
        content: 'Please bring your planting schedules.',
        type: 'text',
        timestamp: new Date(Date.now() - 1700000),
        isRead: true,
      },
    ],
    '3': [
      {
        id: 'm6',
        sender: user.name,
        senderId: user.id,
        senderRole: 'farmer',
        content: 'For maize, I use DAP fertilizer at planting. It gives good results.',
        type: 'text',
        timestamp: new Date(Date.now() - 86400000),
        isRead: true,
      },
      {
        id: 'm7',
        sender: 'John Kamau',
        senderId: '3',
        senderRole: 'farmer',
        content: 'Thanks for the fertilizer tip!',
        type: 'text',
        timestamp: new Date(Date.now() - 43200000),
        isRead: false,
      },
    ],
  });

  const translations = {
    en: {
      search: 'Search or start new chat',
      typeMessage: 'Type a message',
      online: 'online',
      offline: 'offline',
      expert: 'Expert',
      leader: 'Leader',
      farmer: 'Farmer',
      ai: 'AI Assistant',
      lastSeen: 'last seen',
      justNow: 'just now',
      today: 'Today',
      yesterday: 'Yesterday',
      selectChat: 'Select a conversation to start messaging',
      selectChatDesc: 'Choose from your contacts on the left or start a chat with the AI assistant',
    },
    sw: {
      search: 'Tafuta au anza mazungumzo mapya',
      typeMessage: 'Andika ujumbe',
      online: 'mtandaoni',
      offline: 'nje ya mtandao',
      expert: 'Mtaalamu',
      leader: 'Kiongozi',
      farmer: 'Mkulima',
      ai: 'Msaidizi wa AI',
      lastSeen: 'ilionekana mwisho',
      justNow: 'sasa hivi',
      today: 'Leo',
      yesterday: 'Jana',
      selectChat: 'Chagua mazungumzo kuanza kutuma ujumbe',
      selectChatDesc: 'Chagua kutoka kwa anwani zako upande wa kushoto au anza mazungumzo na msaidizi wa AI',
    },
  };

  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedContact) scrollToBottom();
  }, [conversations, selectedContact]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: user.name,
      senderId: user.id,
      senderRole: user.role,
      content: newMessage,
      type: 'text',
      timestamp: new Date(),
      isRead: false,
    };

    setConversations(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), message],
    }));
    setNewMessage('');

    // AI auto-response simulation
    if (selectedContact.id === 'ai') {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'FarmEcho AI',
          senderId: 'ai',
          senderRole: 'ai',
          content: generateAIResponse(newMessage),
          type: 'text',
          timestamp: new Date(),
          isRead: false,
        };
        setConversations(prev => ({
          ...prev,
          ai: [...prev.ai, aiResponse],
        }));
      }, 1500);
    }
  };

  const openChat = (contact: Contact) => {
    setSelectedContact(contact);
    setShowMobileSidebar(false);
    // Mark messages as read
    if (conversations[contact.id]) {
      setConversations(prev => ({
        ...prev,
        [contact.id]: prev[contact.id].map(m => ({ ...m, isRead: true })),
      }));
    }
  };

  const getRoleColor = (role: string) => {
    if (role === 'ai') return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white';
    switch (role) {
      case 'expert': return 'bg-[#1E3A5F] text-white';
      case 'leader': return 'bg-[#7B3F00] text-white';
      default: return 'bg-[#2D5016] text-white';
    }
  };

  const getRoleLabel = (role: string) => {
    if (role === 'ai') return t.ai;
    switch (role) {
      case 'expert': return t.expert;
      case 'leader': return t.leader;
      default: return t.farmer;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return t.justNow;
    if (minutes < 60) return `${minutes}m`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    
    const days = Math.floor(hours / 24);
    if (days === 0) return t.today;
    if (days === 1) return t.yesterday;
    return `${days}d`;
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.cooperative.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // WhatsApp Web Layout
  return (
    <div className="flex h-[calc(100vh-12rem)] max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* LEFT SIDEBAR - Conversations List */}
      <div className={`${showMobileSidebar ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-96 border-r-2 border-gray-200`}>
        {/* Sidebar Header */}
        <div className="bg-[#2D5016] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-[#2D5016]">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-white">
                <p className="font-semibold">{user.name.split(' ')[0]}</p>
                <p className="text-xs opacity-75">{getRoleLabel(user.role)}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto bg-white">
          {filteredContacts.map((contact) => {
            const conversation = conversations[contact.id] || [];
            const lastMsg = conversation[conversation.length - 1];
            const isSelected = selectedContact?.id === contact.id;

            return (
              <motion.div
                key={contact.id}
                onClick={() => openChat(contact)}
                whileHover={{ backgroundColor: '#F5F1E8' }}
                className={`p-4 cursor-pointer border-b border-gray-100 transition-all ${
                  isSelected ? 'bg-[#F5F1E8]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    {contact.role === 'ai' ? (
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-7 h-7 text-white" />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRoleColor(contact.role)} text-sm font-bold`}>
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    {contact.isOnline && contact.role !== 'ai' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-[#2D5016] truncate">{contact.name}</h4>
                      {lastMsg && (
                        <span className="text-xs text-gray-500 ml-2">
                          {formatTime(lastMsg.timestamp)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {contact.role === 'ai' && <Sparkles className="w-3 h-3 inline mr-1" />}
                        {lastMsg ? lastMsg.content : contact.cooperative}
                      </p>
                      {contact.unreadCount > 0 && (
                        <span className="ml-2 bg-[#2D5016] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE - Chat Area */}
      <div className={`${showMobileSidebar ? 'hidden' : 'flex'} lg:flex flex-col flex-1`}>
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-[#F5F1E8] border-b-2 border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="lg:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
                    onClick={() => setShowMobileSidebar(true)}
                  >
                    <ArrowLeft className="w-5 h-5 text-[#2D5016]" />
                  </button>
                  {selectedContact.role === 'ai' ? (
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRoleColor(selectedContact.role)} text-sm font-bold`}>
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-[#2D5016] flex items-center gap-2">
                      {selectedContact.name}
                      {selectedContact.role === 'ai' && <Sparkles className="w-4 h-4 text-purple-600" />}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {selectedContact.isOnline || selectedContact.role === 'ai' ? (
                        <span className="text-green-600">{t.online}</span>
                      ) : (
                        <span>{t.lastSeen} {formatTime(selectedContact.lastSeen!)}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                    <Search className="w-5 h-5 text-[#2D5016]" />
                  </button>
                  <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-[#2D5016]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#E8DCC8] bg-opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L30 60M0 30L60 30\' stroke=\'%23E8E4D9\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")' }}>
              <div className="space-y-3">
                <AnimatePresence>
                  {(conversations[selectedContact.id] || []).map((message) => {
                    const isMyMessage = message.senderId === user.id;
                    const isAI = message.senderId === 'ai';

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg p-3 shadow ${
                            isMyMessage
                              ? 'bg-[#D4F4DD] text-gray-900'
                              : isAI
                              ? 'bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 text-gray-900'
                              : 'bg-white text-gray-900'
                          }`}
                        >
                          {!isMyMessage && !isAI && (
                            <p className="text-xs font-semibold text-[#2D5016] mb-1">
                              {message.sender}
                            </p>
                          )}
                          {isAI && (
                            <p className="text-xs font-semibold text-purple-700 mb-1 flex items-center gap-1">
                              <Bot className="w-3 h-3" />
                              FarmEcho AI
                            </p>
                          )}
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <div className={`text-xs mt-1 flex items-center gap-1 ${isMyMessage ? 'justify-end' : ''} text-gray-500`}>
                            <span>
                              {message.timestamp.toLocaleTimeString('en-KE', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {isMyMessage && (
                              message.isRead ? <CheckCheck className="w-3 h-3 text-blue-500" /> : <Check className="w-3 h-3" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="bg-[#F5F1E8] p-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-[#2D5016] transition-colors"
                  title="Attach image"
                >
                  <ImageIcon className="w-6 h-6" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t.typeMessage}
                  className="flex-1 px-4 py-2 rounded-full bg-white border-2 border-gray-300 focus:outline-none focus:border-[#2D5016]"
                />
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-[#2D5016] transition-colors"
                  title="Voice message"
                >
                  <Mic className="w-6 h-6" />
                </button>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3 bg-[#2D5016] text-white rounded-full hover:bg-[#3D6B1F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center bg-[#F5F1E8] bg-opacity-30 p-8">
            <div className="w-32 h-32 bg-[#2D5016] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
              <MessageCircle className="w-16 h-16 text-[#2D5016] opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-2 text-center">{t.selectChat}</h2>
            <p className="text-gray-600 text-center max-w-md">{t.selectChatDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}