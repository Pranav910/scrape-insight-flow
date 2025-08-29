import { ExternalLink, CheckCircle, Loader2, AlertCircle, Globe } from 'lucide-react';

const SourcesList = ({ sources }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-3 h-3 animate-spin text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Globe className="w-3 h-3 text-scraper-text-muted" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'loading':
        return 'border-yellow-500/20';
      case 'success':
        return 'border-green-500/20';
      case 'error':
        return 'border-red-500/20';
      default:
        return 'border-scraper-border';
    }
  };

  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <div
          key={source.id}
          className={`flex items-center justify-between p-2 rounded-lg border ${getStatusColor(source.status)} bg-scraper-bg-primary/50 hover:bg-scraper-bg-primary/80 transition-colors group`}
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

            {/* Source Info */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-scraper-text-primary truncate">
                {source.title}
              </p>
              <p className="text-xs text-scraper-text-muted truncate">
                {new URL(source.url).hostname}
              </p>
            </div>
          </div>

          {/* External Link */}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3 text-scraper-text-muted hover:text-scraper-accent-primary" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SourcesList;