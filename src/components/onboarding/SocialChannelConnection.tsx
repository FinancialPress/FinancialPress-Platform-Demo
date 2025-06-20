import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Twitter, Linkedin, Youtube, ArrowLeft } from 'lucide-react';

interface SocialChannelConnectionProps {
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const SocialChannelConnection = ({ onNavigate, isDarkMode = true }: SocialChannelConnectionProps) => {
  const [twitterHandle, setTwitterHandle] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleConnect = () => {
    // Mock connection logic
    console.log('Connecting channels:', { twitterHandle, linkedinUrl, youtubeUrl });
    // Navigate to Dashboard (screen 4) after connection
    onNavigate?.(4);
  };

  // Theme-aware utility classes
  const bg = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const card = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const label = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const input = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Connect Your Social Channels
          </h1>
          <p className={`text-xl ${label}`}>
            Link your accounts to share content and earn rewards
          </p>
        </div>

        {/* Social Connection Form */}
        <Card className={`${card} max-w-md mx-auto`}>
          <CardHeader>
            <CardTitle className={`text-2xl text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Link Your Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Connection Inputs */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="twitter" className={label}>Twitter/X Handle</Label>
                <div className="flex items-center space-x-2">
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <Input
                    id="twitter"
                    type="text"
                    placeholder="@YourHandle"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className={input}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="linkedin" className={label}>LinkedIn Profile URL</Label>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className={input}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="youtube" className={label}>YouTube Channel URL</Label>
                <div className="flex items-center space-x-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  <Input
                    id="youtube"
                    type="url"
                    placeholder="https://youtube.com/@yourchannel"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className={input}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className={`${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} w-full`}
                onClick={() => onNavigate?.(0)} // Back to LandingPage
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2"
                onClick={handleConnect}
              >
                Connect Channels
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialChannelConnection;
