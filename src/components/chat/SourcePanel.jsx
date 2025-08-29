import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronRight, Globe, ExternalLink, CheckCircle, Loader2, AlertCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const SourcePanel = ({ isVisible, sources = [], onClose }) => {
  const [expandedSources, setExpandedSources] = useState(new Set());

  // Auto-expand sources when they are loaded
  useEffect(() => {
    if (sources.length > 0) {
      const newExpanded = new Set([...expandedSources]);
      sources.forEach(source => {
        if (source.status === 'success' || source.status === 'error') {
          newExpanded.add(source.id);
        }
      });
      setExpandedSources(newExpanded);
    }
  }, [sources]);

  const toggleSourceExpansion = (sourceId) => {
    const newExpanded = new Set(expandedSources);
    if (newExpanded.has(sourceId)) {
      newExpanded.delete(sourceId);
    } else {
      newExpanded.add(sourceId);
    }
    setExpandedSources(newExpanded);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Globe className="w-4 h-4 text-scraper-text-muted" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'loading':
        return 'border-yellow-500/20 bg-yellow-500/5';
      case 'success':
        return 'border-green-500/20 bg-green-500/5';
      case 'error':
        return 'border-red-500/20 bg-red-500/5';
      default:
        return 'border-scraper-border bg-scraper-bg-card';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-14 h-[calc(100vh-3.5rem)] w-80 bg-scraper-bg-secondary border-l border-scraper-border z-40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-scraper-border">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-scraper-accent-primary" />
          <h2 className="font-semibold text-scraper-text-primary">
            Sources ({sources.length})
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="w-8 h-8 p-0 text-scraper-text-muted hover:text-scraper-text-primary"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Sources List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {sources.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="w-8 h-8 mx-auto mb-2 text-scraper-text-muted" />
              <p className="text-sm text-scraper-text-muted">
                No sources yet
              </p>
              <p className="text-xs text-scraper-text-muted mt-1">
                Sources will appear here during scraping
              </p>
            </div>
          ) : (
            sources.map((source) => {
              const isExpanded = expandedSources.has(source.id);
              return (
                <div
                  key={source.id}
                  className={`rounded-lg border p-3 transition-all ${getStatusColor(source.status)}`}
                >
                  {/* Source Header */}
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSourceExpansion(source.id)}
                  >
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {getStatusIcon(source.status)}
                      </div>

                      {/* Favicon */}
                      <div className="flex-shrink-0 w-4 h-4">
                        {source.favicon ? (
                          <img
                            src={source.favicon}
                            alt=""
                            className="w-4 h-4 rounded-sm"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <Globe className="w-4 h-4 text-scraper-text-muted" />
                        )}
                      </div>

                      {/* Source Title */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-scraper-text-primary truncate">
                          {source.title}
                        </h3>
                      </div>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div className="flex items-center space-x-1">
                      <Badge
                        variant={source.status === 'success' ? 'default' : 
                                source.status === 'loading' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {source.status}
                      </Badge>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-scraper-text-muted" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-scraper-text-muted" />
                      )}
                    </div>
                  </div>

                  {/* Source Details (Expanded) */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-scraper-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-scraper-text-muted">URL</span>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-xs text-scraper-accent-primary hover:text-scraper-accent-secondary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="truncate max-w-32">
                            {new URL(source.url).hostname}
                          </span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-scraper-text-muted">Time</span>
                        <span className="text-xs text-scraper-text-primary">
                          {formatTime(source.timestamp)}
                        </span>
                      </div>

                      {source.status === 'error' && (
                        <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20">
                          <p className="text-xs text-red-400">
                            Failed to access this source
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Real-time activity indicator */}
          {sources.some(s => s.status === 'loading') && (
            <div className="flex items-center justify-center space-x-2 py-4 text-scraper-text-muted">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-sm">Actively scraping...</span>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SourcePanel;