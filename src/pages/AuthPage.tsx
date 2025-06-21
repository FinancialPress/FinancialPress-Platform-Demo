
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Chrome, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';

const AuthPage = () => {
  const { isDarkMode } = useTheme();
  const { user, signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes('already registered')) {
            setError('This email is already registered. Try signing in instead.');
          } else {
            setError(error.message);
          }
        } else {
          setError(null);
          // Show success message for sign up
          setError('Please check your email to verify your account.');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid')) {
            setError('Invalid email or password. Please check your credentials.');
          } else {
            setError(error.message);
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Theme-aware styling
  const background = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const card = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const label = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const input = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';

  return (
    <div className={`min-h-screen ${background}`}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {isSignUp ? 'Join FinancialPress' : 'Welcome Back'}
          </h1>
          <p className={`text-xl ${label}`}>
            {isSignUp 
              ? 'Start earning crypto by creating and sharing quality financial content'
              : 'Sign in to continue earning and sharing'
            }
          </p>
        </div>

        <Card className={`${card} max-w-md mx-auto`}>
          <CardHeader>
            <CardTitle className={`text-2xl text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {isSignUp ? 'Create Your Account' : 'Sign In'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant={error.includes('check your email') ? 'default' : 'destructive'}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <Label htmlFor="displayName" className={label}>Display Name</Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Your creator name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={input}
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email" className={label}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={input}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password" className={label}>Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={input}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
                disabled={loading}
              >
                <Mail className="w-5 h-5 mr-2" />
                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className={isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`px-2 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
                  Coming Soon
                </span>
              </div>
            </div>

            <div className="space-y-3 opacity-50">
              <Button 
                className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-3"
                disabled
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3"
                disabled
              >
                <img
                  src="/reown-brandmark-negative.svg"
                  alt="Reown"
                  className="w-5 h-5 mr-2"
                />
                Connect with Reown
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
