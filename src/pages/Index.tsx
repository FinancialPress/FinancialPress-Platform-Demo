
import { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LiveFeedSection from '../components/feed/LiveFeedSection';
import TopSharers from '../components/feed/TopSharers';
import TopCreators from '../components/feed/TopCreators';
import TopComments from '../components/feed/TopComments';
import QuickActions from '../components/feed/QuickActions';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('feed');

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content Area - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <LiveFeedSection />
          </div>
          
          {/* Right Sidebar - Takes up 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <TopSharers />
            <QuickActions />
            <TopCreators />
            <TopComments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
