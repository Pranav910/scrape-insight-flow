import { useState } from 'react';
import { Search, Plus, MessageSquare, ChevronLeft, ChevronRight, MoreHorizontal, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChatStorage } from '@/hooks/useChatStorage';

const ChatSidebar = ({ isCollapsed, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    chatState, 
    createNewSession, 
    setCurrentSession, 
    deleteSession 
  } = useChatStorage();

  // Filter sessions based on search term
  const filteredSessions = chatState.sessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.messages.some(msg => 
      msg.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleNewChat = () => {
    createNewSession();
  };

  const handleSessionClick = (sessionId) => {
    setCurrentSession(sessionId);
  };

  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    deleteSession(sessionId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-scraper-bg-secondary border-r border-scraper-border transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-scraper-border">
        {!isCollapsed && (
          <h2 className="font-semibold text-scraper-text-primary">Chats</h2>
        )}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNewChat}
            className={`${
              isCollapsed ? 'w-8 h-8 p-0' : 'px-3'
            } text-scraper-text-secondary hover:text-scraper-text-primary`}
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2 text-sm">New Chat</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-8 h-8 p-0 text-scraper-text-secondary hover:text-scraper-text-primary"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-scraper-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-scraper-text-muted" />
            <Input
              type="text"
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-scraper-bg-primary border-scraper-border text-scraper-text-primary placeholder:text-scraper-text-muted"
            />
          </div>
        </div>
      )}

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {isCollapsed ? (
            // Collapsed view - show only icons
            <div className="space-y-2">
              {filteredSessions.slice(0, 8).map((session) => (
                <Button
                  key={session.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSessionClick(session.id)}
                  className={`w-full h-10 p-0 justify-center ${
                    chatState.currentSession === session.id
                      ? 'bg-scraper-accent-primary text-white'
                      : 'text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              ))}
            </div>
          ) : (
            // Expanded view - show full chat items
            <div className="space-y-1">
              {filteredSessions.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 text-scraper-text-muted" />
                  <p className="text-sm text-scraper-text-muted">
                    {searchTerm ? 'No chats found' : 'No chats yet'}
                  </p>
                  <p className="text-xs text-scraper-text-muted mt-1">
                    {searchTerm ? 'Try a different search term' : 'Start a new conversation'}
                  </p>
                </div>
              ) : (
                filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group relative rounded-lg p-3 cursor-pointer transition-colors ${
                      chatState.currentSession === session.id
                        ? 'bg-scraper-accent-primary text-white'
                        : 'hover:bg-scraper-bg-card text-scraper-text-primary'
                    }`}
                    onClick={() => handleSessionClick(session.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {session.title}
                        </h3>
                        <p className={`text-xs mt-1 ${
                          chatState.currentSession === session.id
                            ? 'text-white/70'
                            : 'text-scraper-text-muted'
                        }`}>
                          {formatDate(session.updatedAt)}
                        </p>
                        {session.messages.length > 0 && (
                          <p className={`text-xs mt-1 truncate ${
                            chatState.currentSession === session.id
                              ? 'text-white/60'
                              : 'text-scraper-text-muted'
                          }`}>
                            {session.messages[session.messages.length - 1].content.substring(0, 50)}...
                          </p>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`opacity-0 group-hover:opacity-100 w-6 h-6 p-0 ${
                              chatState.currentSession === session.id
                                ? 'text-white hover:text-white'
                                : 'text-scraper-text-muted hover:text-scraper-text-primary'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => handleDeleteSession(session.id, e)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Chat
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;