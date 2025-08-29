import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStorage } from '@/hooks/useChatStorage';

const FloatingInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);
  const { getCurrentSession, createNewSession } = useChatStorage();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSubmit = async () => {
    if (!message.trim() || disabled || isComposing) return;

    // Get or create session
    let currentSession = getCurrentSession();
    if (!currentSession) {
      createNewSession('New Chat');
    }

    const messageContent = message.trim();
    setMessage('');
    
    // Call the parent handler
    if (onSendMessage) {
      await onSendMessage(messageContent);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Placeholder functions for file/image upload
  const handleFileUpload = () => {
    console.log('File upload functionality will be implemented');
  };

  const handleImageUpload = () => {
    console.log('Image upload functionality will be implemented');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-scraper-bg-primary/80 backdrop-blur-sm border-t border-scraper-border">
      <div className="max-w-4xl mx-auto">
        {/* Input Container */}
        <div className="bg-scraper-bg-card rounded-2xl border border-scraper-border shadow-2xl">
          <div className="flex items-end space-x-3 p-4">
            {/* Attachment Buttons */}
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFileUpload}
                className="w-8 h-8 p-0 text-scraper-text-muted hover:text-scraper-accent-primary hover:bg-scraper-bg-secondary"
                disabled={disabled}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleImageUpload}
                className="w-8 h-8 p-0 text-scraper-text-muted hover:text-scraper-accent-primary hover:bg-scraper-bg-secondary"
                disabled={disabled}
              >
                <Image className="w-4 h-4" />
              </Button>
            </div>

            {/* Text Input */}
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder="Message WebScraper AI..."
              disabled={disabled}
              className="flex-1 min-h-[20px] max-h-[120px] resize-none border-0 bg-transparent text-scraper-text-primary placeholder:text-scraper-text-muted focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              rows={1}
            />

            {/* Send Button */}
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || disabled || isComposing}
              size="sm"
              className="w-8 h-8 p-0 bg-scraper-accent-primary hover:bg-scraper-accent-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Usage Note */}
        <p className="text-center text-xs text-scraper-text-muted mt-2">
          WebScraper AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
};

export default FloatingInput;