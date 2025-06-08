
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Chrome, Mail, ArrowLeft, PenTool, Share2, Link, Users } from 'lucide-react';

interface SignUpPageProps {
  onNavigate?: (screen: number) => void;
}

const SignUpPage = ({ onNavigate }: SignUpPageProps) => {
  const [createContent, setCreateContent] = useState(false);
  const [shareContent, setShareContent] = useState(false);

  const handleAccountCreation = () => {
    // Navigate to onboarding after account creation
    onNavigate?.(2);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Join FinancialPress
          </h1>
          <p className="text-xl text-gray-300">
            Start earning crypto by creating and sharing quality financial content
          </p>
        </div>

        {/* Sign Up Form */}
        <Card className="bg-gray-900 border-gray-800 max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Sign Up Options with Topic Connection Info */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-3 relative"
                onClick={handleAccountCreation}
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continue with Google
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  <Link className="w-3 h-3" />
                </div>
              </Button>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 relative"
                onClick={handleAccountCreation}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Connect with X
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
                  <Users className="w-3 h-3" />
                </div>
              </Button>

              {/* Social Connection Benefits */}
              <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg">
                <p className="text-blue-200 text-xs">
                  <strong>Smart Topic Discovery:</strong> When you connect your social accounts, we'll analyze who you follow and what you engage with to automatically suggest relevant financial topics and creators.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or</span>
              </div>
            </div>

            {/* Email Sign Up */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a password"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Content Preferences */}
              <div className="space-y-4 pt-4 border-t border-gray-700">
                <Label className="text-gray-300 text-sm font-medium">What do you want to do on FinancialPress?</Label>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="create-content" 
                    checked={createContent}
                    onCheckedChange={(checked) => setCreateContent(checked === true)}
                  />
                  <Label htmlFor="create-content" className="text-gray-300 text-sm flex items-center">
                    <PenTool className="w-4 h-4 mr-2 text-yellow-500" />
                    Create my own editorial content and analysis
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="share-content" 
                    checked={shareContent}
                    onCheckedChange={(checked) => setShareContent(checked === true)}
                  />
                  <Label htmlFor="share-content" className="text-gray-300 text-sm flex items-center">
                    <Share2 className="w-4 h-4 mr-2 text-blue-500" />
                    Share and distribute other people's content
                  </Label>
                </div>

                {/* Topic Connection Explanation */}
                {(createContent || shareContent) && (
                  <div className="bg-gray-800 p-3 rounded-lg mt-3">
                    <h4 className="text-white text-sm font-medium mb-2 flex items-center">
                      <Link className="w-4 h-4 mr-2 text-yellow-500" />
                      How we personalize your experience:
                    </h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Analyze your social media follows to suggest relevant topics</li>
                      <li>• Match you with creators in your areas of interest</li>
                      <li>• Recommend content based on your engagement patterns</li>
                      <li>• Connect you with audiences who share your interests</li>
                    </ul>
                  </div>
                )}
              </div>

              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
                onClick={handleAccountCreation}
                disabled={!createContent && !shareContent}
              >
                <Mail className="w-5 h-5 mr-2" />
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
