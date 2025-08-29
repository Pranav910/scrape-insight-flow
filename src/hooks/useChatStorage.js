import { useState, useEffect } from 'react';

const STORAGE_KEY = 'webscraper-chat-state';

const defaultState = {
  sessions: [],
  currentSession: null,
  preferences: {
    theme: 'dark',
    sidebarCollapsed: false,
  },
};

export const useChatStorage = () => {
  const [chatState, setChatState] = useState(defaultState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedState = JSON.parse(stored);
        setChatState({ ...defaultState, ...parsedState });
      }
    } catch (error) {
      console.error('Failed to load chat state:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatState));
    } catch (error) {
      console.error('Failed to save chat state:', error);
    }
  }, [chatState]);

  const createNewSession = (title = 'New Chat') => {
    const newSession = {
      id: Date.now().toString(),
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setChatState(prev => ({
      ...prev,
      sessions: [newSession, ...prev.sessions],
      currentSession: newSession.id,
    }));

    return newSession.id;
  };

  const setCurrentSession = (sessionId) => {
    setChatState(prev => ({
      ...prev,
      currentSession: sessionId,
    }));
  };

  const addMessage = (sessionId, message) => {
    setChatState(prev => ({
      ...prev,
      sessions: prev.sessions.map(session =>
        session.id === sessionId
          ? {
              ...session,
              messages: [...session.messages, message],
              updatedAt: new Date().toISOString(),
            }
          : session
      ),
    }));
  };

  const updateSessionTitle = (sessionId, title) => {
    setChatState(prev => ({
      ...prev,
      sessions: prev.sessions.map(session =>
        session.id === sessionId
          ? { ...session, title, updatedAt: new Date().toISOString() }
          : session
      ),
    }));
  };

  const deleteSession = (sessionId) => {
    setChatState(prev => {
      const filteredSessions = prev.sessions.filter(s => s.id !== sessionId);
      return {
        ...prev,
        sessions: filteredSessions,
        currentSession: prev.currentSession === sessionId 
          ? (filteredSessions.length > 0 ? filteredSessions[0].id : null)
          : prev.currentSession,
      };
    });
  };

  const getCurrentSession = () => {
    return chatState.sessions.find(s => s.id === chatState.currentSession) || null;
  };

  const exportChatHistory = () => {
    const exportData = {
      ...chatState,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webscraper-chat-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllChats = () => {
    setChatState(defaultState);
  };

  return {
    chatState,
    createNewSession,
    setCurrentSession,
    addMessage,
    updateSessionTitle,
    deleteSession,
    getCurrentSession,
    exportChatHistory,
    clearAllChats,
  };
};