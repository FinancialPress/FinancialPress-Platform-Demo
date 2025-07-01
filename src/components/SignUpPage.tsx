
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Chrome, Mail, Loader2, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface SignUpPageProps {
  onNavigate?: (screen: number, symbol?: string, userType?: 'demo' | 'live') => void;
  isDarkMode?: boolean;
  userType?: 'demo' | 'live' | null;
  setUserType?: (type: 'demo' | 'live' | null) => void;
}

const SignUpPage = ({ onNavigate, isDarkMode = true, userType, setUserType }: SignUpPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleDemoFlow = (provider: string) => {
    // Set user type to demo and navigate to onboarding
    setUserType?.('demo');
    onNavigate?.(2, undefined, 'demo');
  };

  const handleLiveSignUp = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Error", 
        description: "Please agree to the Terms and Conditions",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, referralCode || undefined);
      
      if (error) {
        toast({
          title: "Signup Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
        // Set user type to live and navigate to onboarding
        setUserType?.('live');
        onNavigate?.(2, undefined, 'live');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onNavigate?.(0); // Return to landing page
  };

  // Theme-aware utility classes
  const background = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const card = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const label = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const input = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';
  const separator = isDarkMode ? 'bg-gray-700' : 'bg-gray-300';
  const dividerTextBg = isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600';

  return (
    <div className={`min-h-screen ${background} relative`}>
      {/* Close button - matching the Create page style */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className={`w-10 h-10 rounded-full ${isDarkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-black'}`}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Join FinancialPress
          </h1>
          <p className={`text-xl ${label}`}>
            Start earning crypto by creating and sharing quality financial content
          </p>
        </div>

        {/* Sign Up Form */}
        <Card className={`${card} max-w-md mx-auto`}>
          <CardHeader>
            <CardTitle className={`text-2xl text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Create Your Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Sign Up Options - Demo Flow */}
            <Button 
              className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-3"
              onClick={() => handleDemoFlow('google')}
              disabled={loading}
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              onClick={() => handleDemoFlow('twitter')}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Connect with X/Twitter
            </Button>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3"
              onClick={() => handleDemoFlow('reown')}
              disabled={loading}
            >
              <img
                src="/reown-brandmark-negative.svg"
                alt="Reown"
                className="w-5 h-5 mr-2"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              />
              Connect with Reown
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className={`w-full ${separator}`} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`px-2 ${dividerTextBg}`}>Or</span>
              </div>
            </div>

            {/* Email Sign Up - Live Flow */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className={label}>Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={input}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="password" className={label}>Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={input}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="referral" className={label}>Referral Code (Optional)</Label>
                <Input 
                  id="referral" 
                  type="text" 
                  placeholder="Enter referral code (FPX-XXXXXX)"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className={input}
                  disabled={loading}
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="agree-terms" 
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                  disabled={loading}
                />
                <Label htmlFor="agree-terms" className={`${label} text-sm`}>
                  I agree to the Terms and Conditions
                </Label>
              </div>

              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
                onClick={handleLiveSignUp}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
