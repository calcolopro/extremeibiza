'use client';

import { useState, useEffect, useRef } from 'react';

type ChatPhase = 'welcome' | 'name' | 'dates' | 'groupSize' | 'services' | 'budget' | 'special' | 'contactMethod' | 'contactValue' | 'summary';

interface ChatData {
  name: string;
  dates: string;
  groupSize: string;
  services: string[];
  budget: string;
  special: string;
  contactMethod: string;
  contactValue: string;
}

interface Message {
  type: 'bot' | 'user';
  text: string;
}

const serviceNames: { [key: string]: string } = {
  vipTables: 'VIP Tables',
  villas: 'Luxury Villas',
  yachts: 'Yacht Charters',
  supercars: 'Supercar Hire',
  transfers: 'Private Transfers',
  security: 'Personal Security',
  dining: 'Private Dining',
  jets: 'Private Jets',
};

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [data, setData] = useState<ChatData>({
    name: '', dates: '', groupSize: '', services: [], budget: '', special: '', contactMethod: '', contactValue: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = (e: CustomEvent) => {
      setIsOpen(true);
      if (e.detail?.service) {
        setSelectedServices([e.detail.service]);
      }
    };
    window.addEventListener('openChat', handleOpenChat as EventListener);
    return () => window.removeEventListener('openChat', handleOpenChat as EventListener);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Welcome to ExtremeIbiza!\n\nI'm here to help plan your perfect Ibiza experience. With 15 years on the island, we have direct access to the best villas, clubs, yachts, and cars.\n\nWhat's your name?");
      setPhase('name');
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: value }]);
    setInput('');
    processResponse(value);
  };

  const processResponse = (value: string) => {
    switch (phase) {
      case 'name':
        setData(prev => ({ ...prev, name: value }));
        addBotMessage(`Nice to meet you, ${value}!\n\nWhen are you planning to visit Ibiza?\n(e.g., "June 15-22" or "first week of August")`);
        setPhase('dates');
        break;
      case 'dates':
        setData(prev => ({ ...prev, dates: value }));
        addBotMessage('How many people will be in your group?');
        setPhase('groupSize');
        break;
      case 'groupSize':
        setData(prev => ({ ...prev, groupSize: value }));
        addBotMessage('Which services are you interested in?\nSelect all that apply:');
        setPhase('services');
        break;
      case 'services':
        setData(prev => ({ ...prev, services: selectedServices }));
        addBotMessage("What's your approximate budget for this trip?");
        setPhase('budget');
        break;
      case 'budget':
        setData(prev => ({ ...prev, budget: value }));
        addBotMessage('Any special requests?\n(celebrations, dietary needs, specific requests)\n\nType your message or click Skip:');
        setPhase('special');
        break;
      case 'special':
        setData(prev => ({ ...prev, special: value }));
        addBotMessage('How would you like us to contact you?');
        setPhase('contactMethod');
        break;
      case 'contactMethod':
        setData(prev => ({ ...prev, contactMethod: value }));
        if (value === 'WhatsApp') {
          addBotMessage("What's your WhatsApp number?\n(include country code, e.g., +34 600 123 456)");
        } else if (value === 'Email') {
          addBotMessage("What's your email address?");
        } else {
          addBotMessage("What's your phone number?");
        }
        setPhase('contactValue');
        break;
      case 'contactValue':
        setData(prev => ({ ...prev, contactValue: value }));
        setPhase('summary');
        break;
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const generateWhatsAppLink = () => {
    const text = `Hi ExtremeIbiza!

Name: ${data.name}
Dates: ${data.dates}
Group: ${data.groupSize}
Services: ${data.services.map(s => serviceNames[s]).join(', ')}
Budget: ${data.budget}
Special: ${data.special || 'None'}
Contact: ${data.contactMethod} - ${data.contactValue}`;
    return `https://wa.me/34600470136?text=${encodeURIComponent(text)}`;
  };

  const generateEmailLink = () => {
    const subject = `Booking Request from ${data.name}`;
    const body = `Name: ${data.name}
Dates: ${data.dates}
Group Size: ${data.groupSize}
Services: ${data.services.map(s => serviceNames[s]).join(', ')}
Budget: ${data.budget}
Special Requests: ${data.special || 'None'}
Contact: ${data.contactMethod} - ${data.contactValue}`;
    return `mailto:booking@extremeibiza.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-cyan rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark w-full max-w-md h-[85vh] rounded-lg flex flex-col overflow-hidden border border-white/10">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bebas text-xl tracking-wider">ExtremeIbiza Concierge</h3>
                <span className="text-xs text-cyan">Online now</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray hover:text-white text-2xl">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' ? 'bg-cyan text-black' : 'bg-white/10 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-1 p-3 bg-white/10 rounded-lg w-16">
                  <span className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              )}

              {/* Service Selection */}
              {phase === 'services' && !isTyping && (
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(serviceNames).map(([key, name]) => (
                    <button
                      key={key}
                      onClick={() => toggleService(key)}
                      className={`p-2 text-xs rounded border transition-all ${
                        selectedServices.includes(key)
                          ? 'bg-cyan text-black border-cyan'
                          : 'bg-transparent text-white border-white/20 hover:border-cyan'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                  {selectedServices.length > 0 && (
                    <button
                      onClick={() => processResponse('services')}
                      className="col-span-2 mt-2 p-3 bg-cyan text-black font-bebas tracking-wider rounded"
                    >
                      Confirm Selection
                    </button>
                  )}
                </div>
              )}

              {/* Quick Replies */}
              {phase === 'groupSize' && !isTyping && (
                <div className="flex flex-wrap gap-2">
                  {['Just me', '2', '3-5', '6-10', '10-20', '20+'].map(size => (
                    <button key={size} onClick={() => handleSubmit(size)} className="px-4 py-2 text-sm bg-white/10 hover:bg-cyan hover:text-black rounded transition-all">
                      {size}
                    </button>
                  ))}
                </div>
              )}

              {phase === 'budget' && !isTyping && (
                <div className="flex flex-wrap gap-2">
                  {['€5K - €15K', '€15K - €50K', '€50K - €100K', '€100K+', 'Flexible'].map(budget => (
                    <button key={budget} onClick={() => handleSubmit(budget)} className="px-4 py-2 text-sm bg-white/10 hover:bg-cyan hover:text-black rounded transition-all">
                      {budget}
                    </button>
                  ))}
                </div>
              )}

              {phase === 'special' && !isTyping && (
                <button onClick={() => handleSubmit('None')} className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded">
                  Skip
                </button>
              )}

              {phase === 'contactMethod' && !isTyping && (
                <div className="flex flex-wrap gap-2">
                  {['WhatsApp', 'Email', 'Phone'].map(method => (
                    <button key={method} onClick={() => handleSubmit(method)} className="px-4 py-2 text-sm bg-white/10 hover:bg-cyan hover:text-black rounded transition-all">
                      {method}
                    </button>
                  ))}
                </div>
              )}

              {/* Summary */}
              {phase === 'summary' && !isTyping && (
                <div className="bg-gradient-to-br from-cyan/20 to-transparent p-4 rounded-lg border border-cyan/30">
                  <h4 className="font-bebas text-lg mb-3 text-cyan">YOUR REQUEST SUMMARY</h4>
                  <div className="text-sm space-y-2 mb-4">
                    <p><span className="text-gray">Name:</span> {data.name}</p>
                    <p><span className="text-gray">Dates:</span> {data.dates}</p>
                    <p><span className="text-gray">Group:</span> {data.groupSize}</p>
                    <p><span className="text-gray">Services:</span> {data.services.map(s => serviceNames[s]).join(', ')}</p>
                    <p><span className="text-gray">Budget:</span> {data.budget}</p>
                    <p><span className="text-gray">Contact:</span> {data.contactMethod} - {data.contactValue}</p>
                  </div>
                  <div className="flex gap-2">
                    <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex-1 p-3 bg-green-600 text-white text-center rounded font-bebas tracking-wider">
                      Send WhatsApp
                    </a>
                    <a href={generateEmailLink()} className="flex-1 p-3 bg-cyan text-black text-center rounded font-bebas tracking-wider">
                      Send Email
                    </a>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {phase !== 'summary' && phase !== 'services' && phase !== 'groupSize' && phase !== 'budget' && phase !== 'contactMethod' && (
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(input)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-cyan"
                  />
                  <button onClick={() => handleSubmit(input)} className="px-4 py-3 bg-cyan text-black rounded font-bebas tracking-wider">
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
