import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';
import FloatingInput from './FloatingInput';
import TypingIndicator from './TypingIndicator';
import { useChatStorage } from '@/hooks/useChatStorage';

const ChatInterface = ({ onSourcesUpdate }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { getCurrentSession, addMessage, createNewSession } = useChatStorage();

  // Load current session messages
  useEffect(() => {
    const currentSession = getCurrentSession();
    if (currentSession) {
      setMessages(currentSession.messages);
    }
  }, [getCurrentSession]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Mock AI response generator
  const generateMockResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if it's a scraping query
    const isScrapingQuery = userMessage.toLowerCase().includes('price') || 
                           userMessage.toLowerCase().includes('amazon') ||
                           userMessage.toLowerCase().includes('flipkart') ||
                           userMessage.toLowerCase().includes('compare') ||
                           userMessage.toLowerCase().includes('scrape');

    let response = '';
    let sources = [];

    if (isScrapingQuery) {
      // Mock scraping response with sources
      response = `I'll help you gather pricing information from multiple sources. Let me search through Amazon, Flipkart, and other e-commerce platforms to find the best deals.

Based on my analysis:

**MacBook Air M2 (256GB):**
- Amazon: ₹99,900 (10% off)
- Flipkart: ₹1,01,200 (8% off) 
- Best Price: Amazon at ₹99,900

**Key Features:**
- Apple M2 chip with 8-core CPU
- 13.6-inch Liquid Retina display
- 256GB SSD storage
- Up to 18 hours battery life

The current best deal is on Amazon with additional bank offers available.`;

      // Mock sources
      sources = [
        {
          id: '1',
          url: 'https://amazon.in/macbook-air-m2',
          title: 'MacBook Air M2 - Amazon India',
          favicon: 'https://amazon.in/favicon.ico',
          status: 'success',
          timestamp: new Date().toISOString()
        },
        {
          id: '2', 
          url: 'https://flipkart.com/macbook-air-m2',
          title: 'Apple MacBook Air M2 - Flipkart',
          favicon: 'https://flipkart.com/favicon.ico',
          status: 'success',
          timestamp: new Date().toISOString()
        },
        {
          id: '3',
          url: 'https://croma.com/macbook-air',
          title: 'MacBook Air Latest Models - Croma',
          favicon: 'https://croma.com/favicon.ico', 
          status: 'success',
          timestamp: new Date().toISOString()
        }
      ];

      // Update sources panel
      if (onSourcesUpdate) {
        // Simulate progressive loading
        setTimeout(() => onSourcesUpdate([sources[0]]), 500);
        setTimeout(() => onSourcesUpdate([sources[0], sources[1]]), 1000);
        setTimeout(() => onSourcesUpdate(sources), 1500);
      }
    } else {
      // Regular chat response
      const responses = [
        "I'm WebScraper AI, designed to help you extract and analyze data from websites. I can gather pricing information, product details, market research, and much more. What would you like me to search for?",
        "I can help you with web scraping tasks like price comparison, product research, market analysis, and data extraction. Just tell me what information you need and from which websites!",
        "My specialty is gathering and analyzing web data in real-time. Whether you need pricing data, product comparisons, or market research, I'm here to help. What can I search for you today?",
        "I'm ready to help you scrape and analyze web data! I can compare prices across multiple platforms, gather product information, or extract any specific data you need. What's your query?"
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    setIsTyping(false);
    
    return { response, sources };
  };

  const handleSendMessage = async (content) => {
    // Get or create session
    const currentSession = getCurrentSession();
    let sessionId = currentSession?.id;
    
    if (!sessionId) {
      sessionId = createNewSession();
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    // Update local state and storage
    setMessages(prev => [...prev, userMessage]);
    addMessage(sessionId, userMessage);

    // Generate AI response
    const { response, sources } = await generateMockResponse(content);
    
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      content: response,
      role: 'assistant',
      sources: sources.length > 0 ? sources : undefined,
      timestamp: new Date().toISOString(),
    };

    // Update local state and storage
    setMessages(prev => [...prev, aiMessage]);
    addMessage(sessionId, aiMessage);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-4">
          <div className="max-w-4xl mx-auto py-8 space-y-6">
            {messages.length === 0 ? (
              // Welcome Screen
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-scraper-accent-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-scraper-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-scraper-text-primary mb-2">
                  Welcome to WebScraper AI
                </h2>
                <p className="text-scraper-text-secondary mb-8 max-w-md mx-auto">
                  I can help you scrape data from websites, compare prices, gather product information, and analyze market trends in real-time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 rounded-lg bg-scraper-bg-card border border-scraper-border">
                    <h3 className="font-medium text-scraper-text-primary mb-2">Price Comparison</h3>
                    <p className="text-sm text-scraper-text-secondary">
                      "Compare MacBook prices on Amazon and Flipkart"
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-scraper-bg-card border border-scraper-border">
                    <h3 className="font-medium text-scraper-text-primary mb-2">Product Research</h3>
                    <p className="text-sm text-scraper-text-secondary">
                      "Find latest iPhone reviews and specifications"
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-scraper-bg-card border border-scraper-border">
                    <h3 className="font-medium text-scraper-text-primary mb-2">Market Analysis</h3>
                    <p className="text-sm text-scraper-text-secondary">
                      "Analyze pricing trends for gaming laptops"
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-scraper-bg-card border border-scraper-border">
                    <h3 className="font-medium text-scraper-text-primary mb-2">Data Extraction</h3>
                    <p className="text-sm text-scraper-text-secondary">
                      "Extract contact information from company websites"
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Chat Messages
              <>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isTyping && <TypingIndicator />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0">
        <FloatingInput 
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};

export default ChatInterface;