
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PerformanceAnalyticsProps {
  isDarkMode: boolean;
  contentTab: string;
  setContentTab: (tab: string) => void;
}

const PerformanceAnalytics = ({ isDarkMode, contentTab, setContentTab }: PerformanceAnalyticsProps) => {
  // Theme-aware classes
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 text-white' 
    : 'bg-white border-gray-200 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const contentData = [
    { title: 'Market Analysis: Q4 Outlook', views: '12.5K', earnings: '$234' },
    { title: 'Tech Stock Deep Dive', views: '8.9K', earnings: '$156' },
    { title: 'Crypto Weekly Update', views: '15.2K', earnings: '$298' },
    { title: 'Investment Strategy Guide', views: '6.7K', earnings: '$123' }
  ];

  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle className={textClasses}>Performance Analytics</CardTitle>
        <p className={mutedText}>Track your content performance</p>
      </CardHeader>
      <CardContent>
        <Tabs value={contentTab} onValueChange={setContentTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="space-y-4">
            {contentData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className={textClasses + ' font-medium'}>{item.title}</h4>
                  <p className={mutedText + ' text-sm'}>{item.views} views</p>
                </div>
                <div className={textClasses + ' font-bold'}>{item.earnings}</div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="engagement" className="space-y-4">
            <div className="text-center py-8">
              <p className={mutedText}>Engagement analytics coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalytics;
