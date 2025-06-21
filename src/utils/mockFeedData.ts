
interface MockFeedPost {
  id: number;
  creator: string;
  handle: string;
  badge: string;
  timeAgo: string;
  content: string;
  description: string;
  image?: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
  earnings: string;
  category: string;
  isRecommended?: boolean;
  isFollowing?: boolean;
}

const creators = [
  { name: 'CryptoAnalyst', handle: '@cryptoanalyst', badge: 'Gold Creator', category: 'Crypto Analysis' },
  { name: 'DeFiGuru', handle: '@defiguru', badge: 'Platinum Creator', category: 'DeFi' },
  { name: 'NFTTracker', handle: '@nfttracker', badge: 'Silver Creator', category: 'NFTs' },
  { name: 'TechAnalyst', handle: '@techanalyst', badge: 'Gold Creator', category: 'AI & Tech' },
  { name: 'MacroMind', handle: '@macromind', badge: 'Platinum Creator', category: 'Macroeconomics' },
  { name: 'StockSage', handle: '@stocksage', badge: 'Gold Creator', category: 'Stock Analysis' },
  { name: 'ForexExpert', handle: '@forexexpert', badge: 'Silver Creator', category: 'Forex' },
  { name: 'CommodityKing', handle: '@commodityking', badge: 'Gold Creator', category: 'Commodities' },
];

const contentTemplates = [
  {
    title: "Market Analysis: {asset} Breaks Key Resistance",
    description: "Technical analysis shows {asset} has broken through critical resistance levels. Here's what traders need to know about the momentum and potential targets ahead."
  },
  {
    title: "{category} Update: Top Opportunities This Week",
    description: "Weekly roundup of the most promising opportunities in {category}. Analysis includes risk assessment, entry points, and profit targets for informed decisions."
  },
  {
    title: "Breaking: Major {category} Development",
    description: "Significant news in the {category} space that could impact markets. Breaking down the implications and what it means for investors and traders."
  },
  {
    title: "Technical Deep Dive: {asset} Price Action",
    description: "Comprehensive technical analysis of {asset} including chart patterns, support/resistance levels, and momentum indicators pointing to potential moves."
  },
];

const images = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop',
];

const assets = ['Bitcoin', 'Ethereum', 'Solana', 'Apple', 'Tesla', 'Gold', 'Oil', 'EUR/USD'];
const timeOptions = ['1h', '2h', '3h', '4h', '6h', '8h', '12h', '1d', '2d'];

export const generateMockFeedItem = (id: number): MockFeedPost => {
  const creator = creators[Math.floor(Math.random() * creators.length)];
  const template = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
  const asset = assets[Math.floor(Math.random() * assets.length)];
  const timeAgo = timeOptions[Math.floor(Math.random() * timeOptions.length)];
  
  const content = template.title
    .replace('{asset}', asset)
    .replace('{category}', creator.category);
  
  const description = template.description
    .replace('{asset}', asset)
    .replace('{category}', creator.category);
  
  const likes = Math.floor(Math.random() * 5000) + 100;
  const shares = Math.floor(likes * 0.1) + Math.floor(Math.random() * 50);
  const comments = Math.floor(likes * 0.05) + Math.floor(Math.random() * 30);
  const views = likes * (Math.floor(Math.random() * 10) + 5);
  
  return {
    id,
    creator: creator.name,
    handle: creator.handle,
    badge: creator.badge,
    timeAgo,
    content,
    description,
    image: Math.random() > 0.4 ? images[Math.floor(Math.random() * images.length)] : undefined,
    engagement: {
      likes,
      shares,
      comments,
      views,
    },
    earnings: `${(Math.random() * 60 + 10).toFixed(1)} FPT`,
    category: creator.category,
    isRecommended: Math.random() > 0.7,
    isFollowing: Math.random() > 0.6,
  };
};
