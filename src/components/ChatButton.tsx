'use client';

import {useState, useEffect, useRef} from 'react';
import {useTranslations} from 'next-intl';

const WHATSAPP_NUMBER = '34600470136';
const BOOKING_EMAIL = 'booking@extremeibiza.es';

// Ibiza clubs data
const CLUBS = [
  { id: 'pacha', name: 'Pacha' },
  { id: 'amnesia', name: 'Amnesia' },
  { id: 'ushuaia', name: 'Ushuaïa' },
  { id: 'hi-ibiza', name: 'Hï Ibiza' },
  { id: 'dc10', name: 'DC-10' },
  { id: 'privilege', name: 'Privilege' },
  { id: 'eden', name: 'Eden' },
  { id: 'es-paradis', name: 'Es Paradís' },
  { id: 'lio', name: 'Lío Ibiza' },
  { id: 'heart', name: 'Heart Ibiza' },
];

type ChatPhase = 
  | 'init' 
  | 'get-name' 
  | 'get-dates' 
  | 'get-group' 
  | 'get-services' 
  | 'get-budget' 
  | 'get-special' 
  | 'get-contact' 
  | 'get-contact-value' 
  | 'summary';

interface ChatData {
  name: string;
  dates: string;
  groupSize: string;
  services: string[];
  budget: string;
  specialRequests: string;
  contactMethod: string;
  contactValue: string;
}

export default function ChatButton() {
  const t = useTranslations('chat');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'bot' | 'user'; text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>('init');
  const [chatData, setChatData] = useState<ChatData>({
    name: '',
    dates: '',
    groupSize: '',
    services: [],
    budget: '',
    specialRequests: '',
    contactMethod: '',
    contactValue: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for open chat events
  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      setIsOpen(true);
      if (phase === 'init') {
        startChat();
      }
    };
    window.addEventListener('openChat', handleOpenChat);
    return () => window.removeEventListener('openChat', handleOpenChat);
  }, [phase]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startChat = () => {
    setPhase('get-name');
    addBotMessage(t('welcome'));
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text }]);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const value = inputValue.trim();
    setInputValue('');
    addUserMessage(value);
    processInput(value);
  };

  const handleQuickReply = (value: string) => {
    addUserMessage(value);
    processInput(value);
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const confirmServices = () => {
    if (selectedServices.length === 0) return;
    const servicesText = selectedServices.join(', ');
    addUserMessage(servicesText);
    setChatData(prev => ({ ...prev, services: selectedServices }));
    setPhase('get-budget');
    setTimeout(() => addBotMessage(t('budget')), 500);
  };

  const processInput = (value: string) => {
    setTimeout(() => {
      switch (phase) {
        case 'get-name':
          setChatData(prev => ({ ...prev, name: value }));
          setPhase('get-dates');
          addBotMessage(`${t('niceTo')}, ${value}!\n\n${t('whenVisit')}`);
          break;

        case 'get-dates':
          setChatData(prev => ({ ...prev, dates: value }));
          setPhase('get-group');
          addBotMessage(t('howMany'));
          break;

        case 'get-group':
          setChatData(prev => ({ ...prev, groupSize: value }));
          setPhase('get-services');
          addBotMessage(t('whichServices'));
          break;

        case 'get-budget':
          setChatData(prev => ({ ...prev, budget: value }));
          setPhase('get-special');
          addBotMessage(t('specialRequests'));
          break;

        case 'get-special':
          setChatData(prev => ({ ...prev, specialRequests: value === t('skip') ? '' : value }));
          setPhase('get-contact');
          addBotMessage(t('howContact'));
          break;

        case 'get-contact':
          setChatData(prev => ({ ...prev, contactMethod: value }));
          setPhase('get-contact-value');
          if (value === 'WhatsApp') {
            addBotMessage(t('whatsappNumber'));
          } else if (value === 'Email') {
            addBotMessage(t('emailAddress'));
          } else {
            addBotMessage(t('phoneNumber'));
          }
          break;

        case 'get-contact-value':
          setChatData(prev => ({ ...prev, contactValue: value }));
          setPhase('summary');
          // Show summary after a short delay
          setTimeout(() => showSummary({ ...chatData, contactValue: value }), 500);
          break;
      }
    }, 500);
  };

  const showSummary = (data: ChatData) => {
    // Summary is handled in the render
  };

  const generateWhatsAppLink = () => {
    let msg = `*NEW EXTREMEIBIZA REQUEST*\n\n`;
    msg += `*Name:* ${chatData.name}\n`;
    msg += `*Contact:* ${chatData.contactValue} (${chatData.contactMethod})\n`;
    msg += `*Dates:* ${chatData.dates}\n`;
    msg += `*Group:* ${chatData.groupSize}\n`;
    msg += `*Budget:* ${chatData.budget}\n`;
    msg += `*Services:* ${chatData.services.join(', ')}\n`;
    if (chatData.specialRequests) {
      msg += `*Special Requests:* ${chatData.specialRequests}\n`;
    }
    msg += `\n---\nvia ExtremeIbiza.es`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const generateEmailLink = () => {
    const subject = `New Request: ${chatData.name} - ${chatData.dates}`;
    let body = `NEW EXTREMEIBIZA REQUEST\n\n`;
    body += `Name: ${chatData.name}\n`;
    body += `Contact: ${chatData.contactValue} (${chatData.contactMethod})\n`;
    body += `Dates: ${chatData.dates}\n`;
    body += `Group: ${chatData.groupSize}\n`;
    body += `Budget: ${chatData.budget}\n`;
    body += `Services: ${chatData.services.join(', ')}\n`;
    if (chatData.specialRequests) {
      body += `Special Requests: ${chatData.specialRequests}\n`;
    }
    body += `\n---\nvia ExtremeIbiza.es`;
    return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const services = [
    'VIP Tables', 'Luxury Villa', 'Yacht Charter', 'Supercar Hire', 
    'Private Transfers', 'Personal Security', 'Private Dining'
  ];

  const groupSizes = [t('groupSizes.solo'), t('groupSizes.two'), t('groupSizes.small'), t('groupSizes.medium'), t('groupSizes.large'), t('groupSizes.xlarge')];
  const budgets = [t('budgets.low'), t('budgets.medium'), t('budgets.high'), t('budgets.vhigh'), t('budgets.flexible')];
  const contactMethods = [t('contactMethods.whatsapp'), t('contactMethods.email'), t('contactMethods.phone')];

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          if (phase === 'init') startChat();
        }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-cyan rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-dark transition-all duration-300 hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black">
          <path d="M12 2C8 2 6 4 6 6C6 8 7 9 7 9L5 12L7 14L5 18L8 20L10 18L12 20L14 18L16 20L19 18L17 14L19 12L17 9C17 9 18 8 18 6C18 4 16 2 12 2Z"/>
          <circle cx="9" cy="5" r="1" fill="#0a0a0a"/>
          <circle cx="15" cy="5" r="1" fill="#0a0a0a"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm chat-overlay">
      <div className="bg-dark border border-cyan/30 rounded-xl w-full max-w-lg h-[85vh] max-h-[750px] flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,180,216,0.2)]">
        {/* Header */}
        <div className="bg-darker p-5 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan to-cyan-dark rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black">
                <path d="M12 2C8 2 6 4 6 6C6 8 7 9 7 9L5 12L7 14L5 18L8 20L10 18L12 20L14 18L16 20L19 18L17 14L19 12L17 9C17 9 18 8 18 6C18 4 16 2 12 2Z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bebas text-lg tracking-wider">{t('title')}</h3>
              <p className="text-xs text-cyan">● {t('online')}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray hover:text-white text-2xl p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.type === 'bot'
                  ? 'bg-darker border border-white/5 self-start rounded-bl-sm'
                  : 'bg-cyan text-black self-end rounded-br-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-1 p-4 self-start">
              <span className="w-2 h-2 bg-cyan rounded-full typing-dot" />
              <span className="w-2 h-2 bg-cyan rounded-full typing-dot" />
              <span className="w-2 h-2 bg-cyan rounded-full typing-dot" />
            </div>
          )}

          {/* Quick replies based on phase */}
          {!isTyping && phase === 'get-group' && (
            <div className="flex flex-wrap gap-2 mt-2">
              {groupSizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleQuickReply(size)}
                  className="px-4 py-2 text-sm border border-cyan text-cyan rounded-full hover:bg-cyan hover:text-black transition-all"
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {!isTyping && phase === 'get-services' && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-wrap gap-2">
                {services.map(service => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-4 py-2 text-sm border rounded-full transition-all ${
                      selectedServices.includes(service)
                        ? 'bg-cyan text-black border-cyan'
                        : 'border-cyan text-cyan hover:bg-cyan hover:text-black'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
              <button
                onClick={confirmServices}
                className="mt-2 px-4 py-2 text-sm bg-cyan text-black rounded-full font-medium"
              >
                {t('confirmSelection')}
              </button>
            </div>
          )}

          {!isTyping && phase === 'get-budget' && (
            <div className="flex flex-wrap gap-2 mt-2">
              {budgets.map(budget => (
                <button
                  key={budget}
                  onClick={() => handleQuickReply(budget)}
                  className="px-4 py-2 text-sm border border-cyan text-cyan rounded-full hover:bg-cyan hover:text-black transition-all"
                >
                  {budget}
                </button>
              ))}
            </div>
          )}

          {!isTyping && phase === 'get-special' && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleQuickReply(t('skip'))}
                className="px-4 py-2 text-sm border border-gray text-gray rounded-full hover:bg-gray hover:text-black transition-all"
              >
                {t('skip')}
              </button>
            </div>
          )}

          {!isTyping && phase === 'get-contact' && (
            <div className="flex flex-wrap gap-2 mt-2">
              {contactMethods.map(method => (
                <button
                  key={method}
                  onClick={() => handleQuickReply(method)}
                  className="px-4 py-2 text-sm border border-cyan text-cyan rounded-full hover:bg-cyan hover:text-black transition-all"
                >
                  {method}
                </button>
              ))}
            </div>
          )}

          {/* Summary */}
          {phase === 'summary' && (
            <div className="bg-gradient-to-br from-cyan/10 to-cyan/5 border border-cyan rounded-xl p-6 mt-4">
              <h4 className="font-bebas text-cyan text-lg tracking-wider mb-4">{t('summary')}</h4>
              <div className="space-y-3 text-sm">
                <p><span className="text-cyan">Name:</span> {chatData.name}</p>
                <p><span className="text-cyan">Contact:</span> {chatData.contactValue} ({chatData.contactMethod})</p>
                <p><span className="text-cyan">Dates:</span> {chatData.dates}</p>
                <p><span className="text-cyan">Group:</span> {chatData.groupSize}</p>
                <p><span className="text-cyan">Budget:</span> {chatData.budget}</p>
                <p><span className="text-cyan">Services:</span> {chatData.services.join(', ')}</p>
                {chatData.specialRequests && (
                  <p><span className="text-cyan">Special:</span> {chatData.specialRequests}</p>
                )}
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-black font-bebas text-lg tracking-wider rounded-lg hover:bg-[#20bd5a] transition-all"
                >
                  {t('sendWhatsApp')}
                </a>
                <a
                  href={generateEmailLink()}
                  className="flex items-center justify-center gap-2 py-3 border-2 border-cyan text-cyan font-bebas text-lg tracking-wider rounded-lg hover:bg-cyan hover:text-black transition-all"
                >
                  {t('sendEmail')}
                </a>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {phase !== 'summary' && phase !== 'get-group' && phase !== 'get-services' && phase !== 'get-budget' && phase !== 'get-contact' && (
          <div className="p-4 bg-darker border-t border-white/5">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('placeholder')}
                className="flex-1 bg-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray outline-none focus:border-cyan transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-12 bg-cyan rounded-lg flex items-center justify-center hover:bg-cyan-dark transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
