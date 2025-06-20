
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users, Eye } from 'lucide-react';

interface EarningsMetricsProps {
  isDarkMode: boolean;
}

const EarningsMetrics = ({ isDarkMode }: EarningsMetricsProps) => {
  // Theme-aware classes
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 text-white' 
    : 'bg-white border-gray-200 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const metrics = [
    {
      title: 'Total Earnings',
      value: '$2,847',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Views',
      value: '45.2K',
      change: '+8.1%',
      icon: Eye,
      color: 'text-blue-500'
    },
    {
      title: 'Subscribers',
      value: '1,234',
      change: '+23.4%',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      title: 'Growth Rate',
      value: '18.2%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className={cardClasses}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={textClasses + ' text-sm font-medium'}>
              {metric.title}
            </CardTitle>
            <metric.icon className={metric.color + ' h-4 w-4'} />
          </CardHeader>
          <CardContent>
            <div className={textClasses + ' text-2xl font-bold'}>{metric.value}</div>
            <p className={mutedText + ' text-xs'}>
              <span className="text-green-500">{metric.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EarningsMetrics;
