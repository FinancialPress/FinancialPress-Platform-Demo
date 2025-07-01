
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SignUpPageProps {
  isDarkMode?: boolean;
}

const SignUpPage = ({ isDarkMode = true }: SignUpPageProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up attempt:', { email, password });
  };

  const bgClasses = isDarkMode ? 'min-h-screen bg-black text-white' : 'min-h-screen bg-gray-50 text-black';
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';

  return (
    <div className={bgClasses}>
      {/* Close button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className={`${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className={`w-full max-w-md ${cardClasses}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Join FlowPost</CardTitle>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
              Create your account and start earning from your content
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-fpYellow hover:bg-fpYellowDark text-black font-semibold"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6">
              <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Connect your social channels
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="sm" className="flex items-center justify-center p-2">
                  <Facebook className="w-5 h-5 text-blue-600" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center p-2">
                  <Twitter className="w-5 h-5 text-blue-400" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center p-2">
                  <Instagram className="w-5 h-5 text-pink-500" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center p-2">
                  <Linkedin className="w-5 h-5 text-blue-700" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center p-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center p-2">
                  <img src="/lovable-uploads/2b7e8aa6-713f-47ff-ae55-2171a9e67aba.png" alt="Financial Press" className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-6`}>
              Already have an account?{' '}
              <button className="text-fpYellow hover:underline">
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
