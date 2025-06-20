return (
  <div className={`relative w-full h-full ${className}`}>
    {/* Simplified gradient background overlay */}
    <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} pointer-events-none rounded-lg`} />

    <div className="relative z-10 w-full h-full">
      {/* Wrapped header + timeframes inside outlined box */}
      <div className={`${cardClasses} border rounded-lg p-4 mb-6`}>
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

        <div className="flex space-x-1 overflow-x-auto">
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
      </div>

      {/* Main Chart Container (unchanged) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
        {/* Chart Area */}
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
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDarkMode ? '#374151' : '#E5E7EB'} strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Main Chart */}
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
                      data: e.activePayload[0].payload,
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
                    style: { filter: 'drop-shadow(0 0 6px #EAB308)' },
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Glowing indicator dot for latest price */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #EAB308' }} />
                <span className={`text-xs ${secondaryTextClasses}`}>Live</span>
              </div>
            </div>
          </div>

          {/* Volume Chart (if enabled) */}
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
