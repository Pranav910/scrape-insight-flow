import { useState } from 'react';
import { Bot, User, Copy, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SourcesList from './SourcesList';

const MessageBubble = ({ message }) => {
  const [showSources, setShowSources] = useState(false);
  const { toast } = useToast();
  const isUser = message.role === 'user';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast({
        title: "Copied to clipboard",
        description: "Message content has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleRegenerate = () => {
    toast({
      title: "Regenerating response",
      description: "This feature will be available soon.",
    });
  };

  if (isUser) {
    // User message - right aligned
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-start space-x-3 max-w-[80%]">
          <div className="flex flex-col space-y-2">
            <div className="bg-scraper-accent-primary text-white px-4 py-3 rounded-2xl rounded-tr-md">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
            <div className="flex items-center justify-end space-x-2 px-2">
              <span className="text-xs text-scraper-text-muted">
                {new Date(message.timestamp).toLocaleTimeString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-scraper-accent-primary flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    );
  }

  // Assistant message - left aligned
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-3 max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-scraper-bg-card border border-scraper-border flex items-center justify-center">
          <Bot className="w-4 h-4 text-scraper-accent-primary" />
        </div>

        {/* Message Content */}
        <div className="flex flex-col space-y-2 min-w-0 flex-1">
          <div className="bg-scraper-bg-card border border-scraper-border px-4 py-3 rounded-2xl rounded-tl-md">
            <div className="space-y-3">
              {/* Message Text */}
              <div className="prose prose-sm max-w-none">
                <p className="text-scraper-text-primary text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>

              {/* Sources */}
              {message.sources && message.sources.length > 0 && (
                <div className="border-t border-scraper-border pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-scraper-text-secondary">
                      Sources ({message.sources.length})
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSources(!showSources)}
                      className="text-xs text-scraper-accent-primary hover:text-scraper-accent-secondary h-6 px-2"
                    >
                      {showSources ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  {showSources && (
                    <SourcesList sources={message.sources} />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Message Actions */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-6 w-6 p-0 text-scraper-text-muted hover:text-scraper-text-primary"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                className="h-6 w-6 p-0 text-scraper-text-muted hover:text-scraper-text-primary"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-scraper-text-muted hover:text-green-500"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-scraper-text-muted hover:text-red-500"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
            <span className="text-xs text-scraper-text-muted">
              {new Date(message.timestamp).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;