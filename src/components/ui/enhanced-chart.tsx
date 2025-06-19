import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, Area, AreaChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';

interface ChartDataPoint {
  time: string;
  value: number;
  volume?: number;
  index: number;
}

interface EnhancedChartProps {
  symbol: string;
  isDarkMode?: boolean;
  height?: number;
  showFullscreen?: boolean;
  showVolume?: boolean;
  showSidebarMetrics?: boolean;
  onFullscreen?: () => void;
  className?: string;
}

const EnhancedChart = ({ 
  symbol, 
  isDarkMode = true, 
  height = 350, 
  showFullscreen = true,
  showVolume = false,
  showSidebarMetrics = false,
  onFullscreen,
  className = "" 
}: EnhancedChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [crosshairData, setCrosshairData] = useState<{ x: number; y: number; data: ChartDataPoint } | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);

  const timeframes = ['1D', '5D', '1M', '6M', 'YTD', '1Y'];

  // Generate realistic market data with volume-based fluctuations
  const generateMarketData = useCallback((timeframe: string): ChartDataPoint[] => {
    const basePrice = 338.75;
    const dataPoints: { [key: string]: number } = {
      '1D': 24, '5D': 120, '1M': 30, '6M': 180, 'YTD': 250, '1Y': 365, '5Y': 1825, 'All': 3650
    };
    
    const points = dataPoints[timeframe] || 24;
    const data: ChartDataPoint[] = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < points; i++) {
      const volatility = 0.02 + (Math.random() * 0.03); // 2-5% volatility
      const direction = Math.random() > 0.5 ? 1 : -1;
      const change = currentPrice * volatility * direction * (Math.random() * 0.5 + 0.5);
      currentPrice += change;
      
      // Generate time labels based on timeframe
      let timeLabel = '';
      if (timeframe === '1D') {
        const hour = 9 + Math.floor((i / points) * 7);
        const minute = Math.floor((i % 4) * 15);
        timeLabel = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      } else if (timeframe === '5D') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        timeLabel = days[Math.floor((i / points) * 5)] || `Day ${i + 1}`;
      } else {
        timeLabel = `Point ${i + 1}`;
      }
      
      data.push({
        time: timeLabel,
        value: Number(currentPrice.toFixed(2)),
        volume: Math.floor(Math.random() * 50000000) + 10000000, // 10M-60M volume
        index: i
      });
    }
    
    return data;
  }, []);

  const chartData = useMemo(() => generateMarketData(selectedTimeframe), [selectedTimeframe, generateMarketData]);

  const currentPrice = chartData[chartData.length - 1]?.value || 0;
  const previousPrice = chartData[chartData.length - 2]?.value || 0;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100);

  // Animation effect on load
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedTimeframe]);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    setCrosshairData(null);
    setHoveredPoint(null);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg border shadow-lg backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-900/90 border-gray-700 text-white' 
            : 'bg-white/90 border-gray-300 text-black'
        }`}>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-lg font-bold text-yellow-400">
            ${data.value.toFixed(2)}
          </p>
          <p className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%)
          </p>
          {showVolume && data.volume && (
            <p className="text-xs opacity-75">
              Volume: {(data.volume / 1000000).toFixed(1)}M
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Sidebar metrics data
  const sidebarMetrics = [
    { label: 'Previous Close', value: previousPrice.toFixed(2) },
    { label: 'Open', value: chartData[0]?.value.toFixed(2) || '0.00' },
    { label: 'Bid', value: `${(currentPrice - 0.25).toFixed(2)} x 1000` },
    { label: 'Ask', value: `${(currentPrice + 0.25).toFixed(2)} x 800` },
    { label: "Day's Range", value: `${Math.min(...chartData.map(d => d.value)).toFixed(2)} - ${Math.max(...chartData.map(d => d.value)).toFixed(2)}` },
    { label: '1Y Target', value: (currentPrice * 0.85).toFixed(2) }
  ];

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const textClasses = isDarkMode 
    ? "text-white"
    : "text-black";

  const secondaryTextClasses = isDarkMode 
    ? "text-gray-400"
    : "text-gray-600";

  // Calculate chart container height with less aggressive reduction
  const chartContainerHeight = height - 60; // Reduced from 120px to 60px

  // Fix the grid column span issue with proper conditional logic
  const chartAreaColSpan = showSidebarMetrics ? "lg:col-span-3" : "lg:col-span-4";

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Simplified gradient background overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-yellow-500/10 to-transparent' : 'bg-gradient-to-br from-yellow-400/10 to-transparent'} pointer-events-none rounded-lg`} />
      
      <div className="relative z-10 w-full h-full">
        {/* Header with fullscreen button */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`${textClasses} text-lg font-bold`}>{symbol} Chart</h3>
            <div className="flex items-center space-x-2">
              <span className={`${textClasses} text-2xl font-bold ${isAnimating ? 'animate-pulse scale-105' : ''}`}>
                ${currentPrice.toFixed(2)}
              </span>
              <span className={`${priceChange >= 0 ? 'text-green-400' : 'text-red-400'} font-medium text-sm`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>
          {showFullscreen && (
            <button
              onClick={onFullscreen}
              className={`inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium transition-colors border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Fixed Timeframe Selector - Using native buttons to avoid shadcn conflicts */}
        <div className="flex space-x-1 mb-6 overflow-x-auto">
          {timeframes.map((timeframe) => {
            const isSelected = selectedTimeframe === timeframe;
            
            return (
              <button
                key={timeframe}
                onClick={() => handleTimeframeChange(timeframe)}
                className={`relative h-9 px-3 rounded-md text-sm font-medium transition-all duration-300 border inline-flex items-center justify-center ${
                  isSelected 
                    ? '!bg-yellow-500 !text-black !hover:bg-yellow-600 !font-medium !shadow-lg !shadow-yellow-500/25 !border-yellow-400' 
                    : isDarkMode 
                      ? '!border-gray-600 !text-gray-300 !hover:bg-gray-700 !hover:border-gray-500 !bg-transparent'
                      : '!border-gray-300 !text-gray-700 !hover:bg-gray-50 !hover:border-gray-400 !bg-transparent'
                }`}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-md animate-pulse" />
                )}
                <span className="relative z-10">{timeframe}</span>
              </button>
            );
          })}
        </div>

        {/* Main Chart Container with fixed grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
          {/* Chart Area with fixed conditional class */}
          <div className={`${chartAreaColSpan} min-w-0`}>
            <div 
              className={`relative rounded-lg border overflow-hidden w-full ${cardClasses}`}
              style={{ height: `${chartContainerHeight}px` }}
            >
              {/* Simplified grid pattern background */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDarkMode ? '#374151' : '#E5E7EB'} strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Main Chart with optimized margins */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
                  onMouseMove={(e) => {
                    if (e && e.activePayload && e.activePayload[0]) {
                      setHoveredPoint(e.activePayload[0].payload);
                      setCrosshairData({
                        x: e.activeCoordinate?.x || 0,
                        y: e.activeCoordinate?.y || 0,
                        data: e.activePayload[0].payload
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredPoint(null);
                    setCrosshairData(null);
                  }}
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={priceChange >= 0 ? '#10B981' : '#EF4444'} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={priceChange >= 0 ? '#10B981' : '#EF4444'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Crosshair lines */}
                  {crosshairData && (
                    <>
                      <ReferenceLine 
                        x={hoveredPoint?.time} 
                        stroke={isDarkMode ? '#6B7280' : '#9CA3AF'} 
                        strokeDasharray="3 3" 
                      />
                      <ReferenceLine 
                        y={hoveredPoint?.value} 
                        stroke={isDarkMode ? '#6B7280' : '#9CA3AF'} 
                        strokeDasharray="3 3" 
                      />
                    </>
                  )}
                  
                  <Area
                    type={"cardinal" as any}
                    dataKey="value"
                    stroke={priceChange >= 0 ? '#10B981' : '#EF4444'}
                    strokeWidth={2}
                    fill="url(#chartGradient)"
                    dot={false}
                    activeDot={{ 
                      r: 4, 
                      fill: '#EAB308', 
                      stroke: '#FBBF24', 
                      strokeWidth: 2,
                      style: { filter: 'drop-shadow(0 0 6px #EAB308)' }
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Glowing indicator dot for latest price */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" 
                       style={{ boxShadow: '0 0 10px #EAB308' }} />
                  <span className={`text-xs ${secondaryTextClasses}`}>Live</span>
                </div>
              </div>
            </div>

            {/* Volume Chart (if enabled) with optimized margins */}
            {showVolume && (
              <div className={`mt-4 rounded-lg border overflow-hidden ${cardClasses}`} style={{ height: '100px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Area
                      type={"monotone" as any}
                      dataKey="volume"
                      stroke="#6B7280"
                      fill="#6B7280"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Sidebar Metrics (if enabled) */}
          {showSidebarMetrics && (
            <div className="lg:col-span-1">
              <div className={`p-4 rounded-lg border ${cardClasses}`}>
                <h4 className={`${textClasses} font-semibold mb-4 text-sm`}>Key Metrics</h4>
                <div className="space-y-3">
                  {sidebarMetrics.map((metric, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className={secondaryTextClasses}>{metric.label}</span>
                      <span className={textClasses}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedChart;
