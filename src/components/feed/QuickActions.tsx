
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuickActions = () => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm">
            Create Content
          </Button>
          <Button variant="outline" className="w-full text-sm">
            Manage Interests
          </Button>
          <Button variant="outline" className="w-full text-sm">
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
