import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Database, 
  Globe, 
  Zap, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Server
} from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalScrapes: 1247,
    successRate: 94.2,
    avgResponseTime: 2.8,
    dataPointsCollected: 15420,
    activeAgents: 3,
    systemHealth: 98.5
  });

  const [recentActivity] = useState([
    { id: 1, action: 'Scraped Amazon product data', time: '2 minutes ago', status: 'success' },
    { id: 2, action: 'Completed Flipkart price comparison', time: '8 minutes ago', status: 'success' },
    { id: 3, action: 'Failed to access restricted content', time: '15 minutes ago', status: 'error' },
    { id: 4, action: 'Analyzed competitor pricing', time: '32 minutes ago', status: 'success' },
    { id: 5, action: 'Updated product availability', time: '1 hour ago', status: 'success' },
  ]);

  const [systemMetrics] = useState([
    { name: 'CPU Usage', value: 45, status: 'good' },
    { name: 'Memory Usage', value: 62, status: 'warning' },
    { name: 'Storage', value: 23, status: 'good' },
    { name: 'Network Latency', value: 12, status: 'good' },
  ]);

  return (
    <div className="min-h-screen bg-scraper-bg-primary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-scraper-text-primary">Dashboard</h1>
          <p className="text-scraper-text-secondary">
            Monitor your web scraping operations and system performance
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                Total Scrapes
              </CardTitle>
              <Globe className="h-4 w-4 text-scraper-accent-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-scraper-text-primary">
                {metrics.totalScrapes.toLocaleString()}
              </div>
              <p className="text-xs text-scraper-text-muted flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                Success Rate
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-scraper-text-primary">
                {metrics.successRate}%
              </div>
              <Progress 
                value={metrics.successRate} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>

          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                Avg Response Time
              </CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-scraper-text-primary">
                {metrics.avgResponseTime}s
              </div>
              <p className="text-xs text-scraper-text-muted flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                -0.3s improvement
              </p>
            </CardContent>
          </Card>

          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                Data Points Collected
              </CardTitle>
              <Database className="h-4 w-4 text-scraper-accent-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-scraper-text-primary">
                {metrics.dataPointsCollected.toLocaleString()}
              </div>
              <p className="text-xs text-scraper-text-muted">
                Across all active sessions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                Active Agents
              </CardTitle>
              <Users className="h-4 w-4 text-scraper-accent-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-scraper-text-primary">
                {metrics.activeAgents}
              </div>
              <p className="text-xs text-scraper-text-muted">
                Currently processing requests
              </p>
            </CardContent>
          </Card>

          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                System Health
              </CardTitle>
              <Server className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-scraper-text-primary">
                {metrics.systemHealth}%
              </div>
              <Progress 
                value={metrics.systemHealth} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* System Metrics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Performance */}
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader>
              <CardTitle className="text-scraper-text-primary">System Performance</CardTitle>
              <CardDescription className="text-scraper-text-secondary">
                Real-time system resource utilization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-scraper-text-secondary">
                      {metric.name}
                    </span>
                    <span className="text-sm text-scraper-text-primary">
                      {metric.value}%
                    </span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader>
              <CardTitle className="text-scraper-text-primary">Recent Activity</CardTitle>
              <CardDescription className="text-scraper-text-secondary">
                Latest scraping operations and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-scraper-bg-secondary transition-colors">
                    <div className="flex-shrink-0">
                      {activity.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-scraper-text-primary truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-scraper-text-muted">
                        {activity.time}
                      </p>
                    </div>
                    <Badge 
                      variant={activity.status === 'success' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;