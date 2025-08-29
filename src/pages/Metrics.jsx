import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target, 
  Database, 
  Shield,
  Zap,
  TrendingUp,
  BarChart3,
  Activity
} from 'lucide-react';

const Metrics = () => {
  const [qualityMetrics] = useState([
    {
      id: 'accuracy',
      name: 'Data Accuracy',
      value: 94.2,
      target: 95,
      change: +2.1,
      status: 'warning',
      description: 'Precision of extracted data vs expected values',
      icon: Target,
      details: {
        correct: 9420,
        total: 10000,
        errors: ['Format mismatch: 3.2%', 'Missing fields: 2.6%']
      }
    },
    {
      id: 'completeness',
      name: 'Data Completeness',
      value: 87.5,
      target: 90,
      change: +1.8,
      status: 'warning',
      description: 'Percentage of required fields successfully extracted',
      icon: Database,
      details: {
        complete: 8750,
        total: 10000,
        missing: ['Product images: 8.2%', 'Descriptions: 4.3%']
      }
    },
    {
      id: 'validity',
      name: 'Data Validity',
      value: 96.8,
      target: 95,
      change: +0.5,
      status: 'good',
      description: 'Data format compliance and validation checks',
      icon: Shield,
      details: {
        valid: 9680,
        total: 10000,
        invalid: ['Invalid URLs: 2.1%', 'Malformed prices: 1.1%']
      }
    },
    {
      id: 'timeliness',
      name: 'Data Timeliness',
      value: 92.3,
      target: 90,
      change: -1.2,
      status: 'good',
      description: 'Speed and freshness of data extraction',
      icon: Clock,
      details: {
        onTime: 9230,
        total: 10000,
        delayed: ['Network timeouts: 4.2%', 'Rate limiting: 3.5%']
      }
    },
    {
      id: 'uniqueness',
      name: 'Data Uniqueness',
      value: 98.7,
      target: 98,
      change: +0.3,
      status: 'good',
      description: 'Duplicate detection and data deduplication',
      icon: Zap,
      details: {
        unique: 9870,
        total: 10000,
        duplicates: ['URL duplicates: 0.8%', 'Content similarity: 0.5%']
      }
    },
    {
      id: 'consistency',
      name: 'Data Consistency',
      value: 89.4,
      target: 85,
      change: +3.2,
      status: 'good',
      description: 'Standardization and format consistency',
      icon: BarChart3,
      details: {
        consistent: 8940,
        total: 10000,
        inconsistent: ['Date formats: 6.1%', 'Currency symbols: 4.5%']
      }
    }
  ]);

  const [performanceMetrics] = useState([
    { name: 'Average Response Time', value: '2.8s', trend: 'improving' },
    { name: 'Success Rate', value: '94.2%', trend: 'stable' },
    { name: 'Error Rate', value: '5.8%', trend: 'improving' },
    { name: 'Throughput', value: '1,247/hr', trend: 'improving' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-scraper-text-muted';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'good': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-scraper-bg-primary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-scraper-text-primary">Metrics Center</h1>
          <p className="text-scraper-text-secondary">
            Comprehensive data quality analysis and AI agent performance metrics
          </p>
        </div>

        <Tabs defaultValue="quality" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-scraper-bg-card">
            <TabsTrigger value="quality" className="data-[state=active]:bg-scraper-accent-primary">
              Data Quality
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-scraper-accent-primary">
              AI Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quality" className="space-y-6">
            {/* Data Quality Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qualityMetrics.map((metric) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={metric.id} className="bg-scraper-bg-card border-scraper-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                        {metric.name}
                      </CardTitle>
                      <IconComponent className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-scraper-text-primary">
                            {metric.value}%
                          </span>
                          <Badge variant={getStatusBadge(metric.status)}>
                            Target: {metric.target}%
                          </Badge>
                        </div>
                        
                        <Progress 
                          value={metric.value} 
                          className="h-2"
                        />
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-scraper-text-muted">
                            {metric.description}
                          </span>
                          <span className={`flex items-center ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-scraper-text-secondary">
                            {metric.details.correct || metric.details.valid || metric.details.onTime || metric.details.unique || metric.details.consistent} / {metric.details.total} records
                          </p>
                          {metric.details.errors && metric.details.errors.length > 0 && (
                            <div className="space-y-1">
                              {metric.details.errors.slice(0, 2).map((error, index) => (
                                <p key={index} className="text-xs text-red-400">
                                  • {error}
                                </p>
                              ))}
                            </div>
                          )}
                          {metric.details.missing && metric.details.missing.length > 0 && (
                            <div className="space-y-1">
                              {metric.details.missing.slice(0, 2).map((missing, index) => (
                                <p key={index} className="text-xs text-yellow-400">
                                  • {missing}
                                </p>
                              ))}
                            </div>
                          )}
                          {metric.details.invalid && metric.details.invalid.length > 0 && (
                            <div className="space-y-1">
                              {metric.details.invalid.slice(0, 2).map((invalid, index) => (
                                <p key={index} className="text-xs text-red-400">
                                  • {invalid}
                                </p>
                              ))}
                            </div>
                          )}
                          {metric.details.delayed && metric.details.delayed.length > 0 && (
                            <div className="space-y-1">
                              {metric.details.delayed.slice(0, 2).map((delayed, index) => (
                                <p key={index} className="text-xs text-yellow-400">
                                  • {delayed}
                                </p>
                              ))}
                            </div>
                          )}
                          {metric.details.duplicates && metric.details.duplicates.length > 0 && (
                            <div className="space-y-1">
                              {metric.details.duplicates.slice(0, 2).map((duplicate, index) => (
                                <p key={index} className="text-xs text-yellow-400">
                                  • {duplicate}
                                </p>
                              ))}
                            </div>
                          )}
                          {metric.details.inconsistent && metric.details.inconsistent.length > 0 && (
                            <div className="space-y-1">
                              {metric.details.inconsistent.slice(0, 2).map((inconsistent, index) => (
                                <p key={index} className="text-xs text-yellow-400">
                                  • {inconsistent}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quality Summary */}
            <Card className="bg-scraper-bg-card border-scraper-border">
              <CardHeader>
                <CardTitle className="text-scraper-text-primary">Data Quality Summary</CardTitle>
                <CardDescription className="text-scraper-text-secondary">
                  Overall assessment of data extraction quality across all dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-scraper-text-primary">Quality Score Breakdown</h4>
                    {qualityMetrics.slice(0, 3).map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between">
                        <span className="text-sm text-scraper-text-secondary">{metric.name}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={metric.value} className="w-20 h-2" />
                          <span className="text-sm font-medium text-scraper-text-primary w-12">
                            {metric.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-scraper-text-primary">Performance Indicators</h4>
                    {qualityMetrics.slice(3).map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between">
                        <span className="text-sm text-scraper-text-secondary">{metric.name}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={metric.value} className="w-20 h-2" />
                          <span className="text-sm font-medium text-scraper-text-primary w-12">
                            {metric.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* AI Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="bg-scraper-bg-card border-scraper-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-scraper-text-secondary">
                      {metric.name}
                    </CardTitle>
                    <Activity className="h-4 w-4 text-scraper-accent-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-scraper-text-primary">
                      {metric.value}
                    </div>
                    <p className={`text-xs flex items-center mt-1 ${
                      metric.trend === 'improving' ? 'text-green-500' : 
                      metric.trend === 'declining' ? 'text-red-500' : 
                      'text-scraper-text-muted'
                    }`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {metric.trend}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Agent Performance Details */}
            <Card className="bg-scraper-bg-card border-scraper-border">
              <CardHeader>
                <CardTitle className="text-scraper-text-primary">AI Agent Performance Analysis</CardTitle>
                <CardDescription className="text-scraper-text-secondary">
                  Real-time performance metrics and optimization suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-scraper-text-primary">Current Session Stats</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-scraper-text-secondary">Requests Processed</span>
                          <span className="text-scraper-text-primary">1,247</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-scraper-text-secondary">Success Rate</span>
                          <span className="text-green-500">94.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-scraper-text-secondary">Average Processing Time</span>
                          <span className="text-scraper-text-primary">2.8s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-scraper-text-secondary">Error Rate</span>
                          <span className="text-yellow-500">5.8%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-scraper-text-primary">Optimization Suggestions</h4>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm text-scraper-text-secondary">
                            Implement request caching for repeated queries
                          </span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <span className="text-sm text-scraper-text-secondary">
                            Optimize timeout settings for better reliability
                          </span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm text-scraper-text-secondary">
                            Add retry logic for transient failures
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Metrics;