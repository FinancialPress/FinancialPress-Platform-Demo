
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Chrome, Mail, ArrowLeft } from 'lucide-react';

interface SignUpPageProps {
  onNavigate?: (screen: number) => void;
}

const SignUpPage = ({ onNavigate }: SignUpPageProps) => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
            {/* Social Sign Up Options */}
            <Button 
              className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-3"
              onClick={handleAccountCreation}
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              onClick={handleAccountCreation}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Connect with X
            </Button>

            <button>
  <img
    src="https://cdn.brandfetch.io/id11-wfgsq/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
    alt="Reown"
    width={32}
    height={32}
    style={{ borderRadius: "8px" }} // optional: for rounded corners
  />
  Connect with Reown
</button>
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3"
              onClick={handleAccountCreation}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
              </svg>
              Connect with Reown
            </Button>
            
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

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="agree-terms" 
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                />
                <Label htmlFor="agree-terms" className="text-gray-300 text-sm">
                  I agree to the Terms and Conditions
                </Label>
              </div>

              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
                onClick={handleAccountCreation}
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
