
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PenTool, Share2, Chrome, Mail } from 'lucide-react';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Choose Your Path
          </h1>
          <p className="text-xl text-gray-300">
            Start earning crypto by creating or distributing quality content
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
          {/* Creator Path */}
          <Card className="bg-gray-900 border-gray-800 hover:border-yellow-500 transition-colors p-8">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <PenTool className="w-8 h-8 text-black" />
              </div>
              <CardTitle className="text-3xl text-white">Join as a Creator</CardTitle>
              <p className="text-gray-300 text-lg">
                Share your insights, analysis, and expertise. Earn FPT when others distribute your content.
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Publish original content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Earn from every share</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Build your reputation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Access creator tools</span>
                </li>
              </ul>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3">
                Start Creating
              </Button>
            </CardContent>
          </Card>

          {/* Distributor Path */}
          <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors p-8">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">Join as a Distributor</CardTitle>
              <p className="text-gray-300 text-lg">
                Curate and share the best content. Earn FPT for every engagement you generate.
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Share quality content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Earn from engagement</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Build your network</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Access distribution tools</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3">
                Start Sharing
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sign Up Options */}
        <Card className="bg-gray-900 border-gray-800 max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-3">
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Connect with X
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or</span>
              </div>
            </div>

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
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3">
                <Mail className="w-5 h-5 mr-2" />
                Sign Up with Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
