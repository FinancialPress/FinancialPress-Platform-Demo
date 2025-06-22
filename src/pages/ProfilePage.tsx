
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { useBalance } from '../contexts/BalanceContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Edit3, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  amount: number;
  transaction_type: string;
  description: string;
  created_at: string;
  metadata: any;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { profile, updateProfile, refetch } = useProfile();
  const { balance } = useBalance();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    display_name: '',
    username: '',
    bio: '',
    image_url: ''
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        image_url: profile.image_url || ''
      });
    }
  }, [profile]);

  // Fetch user transactions for activity feed
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;

    setLoadingTransactions(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
        return;
      }

      setIsEditing(false);
      toast.success('Profile updated successfully!');
      await refetch();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'share_reward':
        return '📤';
      case 'tip_sent':
        return '💝';
      case 'tip_received':
        return '🎁';
      case 'subscription':
        return '⭐';
      default:
        return '💰';
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? 'text-green-500' : 'text-red-500';
  };

  // Theme classes
  const bgClasses = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextClasses = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  if (!user || !profile) {
    return (
      <div className={`min-h-screen ${bgClasses}`}>
        <Header 
          onNavigate={(screen: number) => {
            if (screen === 0) navigate('/');
          }}
          currentScreen={-1}
          isDarkMode={isDarkMode}
          userProfile={profile}
          isLoggedIn={!!user}
        />
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="text-center">
            <p className={mutedTextClasses}>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgClasses}`}>
      <Header 
        onNavigate={(screen: number) => {
          if (screen === 0) navigate('/');
        }}
        currentScreen={-1}
        isDarkMode={isDarkMode}
        userProfile={profile}
        isLoggedIn={!!user}
      />
      
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Header with back button */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className={`${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className={`text-3xl font-bold ${textClasses}`}>Your Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className={cardClasses}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={textClasses}>Profile Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                      // Reset form data
                      setFormData({
                        display_name: profile.display_name || '',
                        username: profile.username || '',
                        bio: profile.bio || '',
                        image_url: profile.image_url || ''
                      });
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className={isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : ''}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={formData.image_url || profile.image_url || undefined} alt="Profile" />
                    <AvatarFallback className="bg-fpYellow text-black font-semibold text-lg">
                      {getInitials(formData.display_name || profile.display_name || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="flex-1">
                      <label className={`block text-sm font-medium ${textClasses} mb-2`}>
                        Profile Image URL
                      </label>
                      <Input
                        value={formData.image_url}
                        onChange={(e) => handleInputChange('image_url', e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                      />
                    </div>
                  )}
                </div>

                {/* Display Name */}
                <div>
                  <label className={`block text-sm font-medium ${textClasses} mb-2`}>
                    Display Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.display_name}
                      onChange={(e) => handleInputChange('display_name', e.target.value)}
                      className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                    />
                  ) : (
                    <p className={textClasses}>{profile.display_name || 'Not set'}</p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className={`block text-sm font-medium ${textClasses} mb-2`}>
                    Username
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="@username"
                      className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                    />
                  ) : (
                    <p className={textClasses}>@{profile.username || 'Not set'}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className={`block text-sm font-medium ${textClasses} mb-2`}>
                    Bio
                  </label>
                  {isEditing ? (
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                      rows={4}
                    />
                  ) : (
                    <p className={textClasses}>{profile.bio || 'No bio added yet.'}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium ${textClasses} mb-2`}>
                    Email
                  </label>
                  <p className={mutedTextClasses}>{profile.email}</p>
                </div>

                {/* Role */}
                <div>
                  <label className={`block text-sm font-medium ${textClasses} mb-2`}>
                    Role
                  </label>
                  <Badge className="bg-fpYellow text-black">
                    {profile.role === 'creator' ? 'Creator' : 
                     profile.role === 'distributor' ? 'Distributor' : 'Newcomer'}
                  </Badge>
                </div>

                {isEditing && (
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-fpYellow hover:bg-fpYellowDark text-black font-semibold"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Stats and Balance */}
          <div className="space-y-6">
            {/* FPT Balance */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`flex items-center ${textClasses}`}>
                  <TrendingUp className="w-5 h-5 mr-2" />
                  FPT Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-fpYellow mb-2">
                    {balance.toLocaleString()} FPT
                  </div>
                  <p className={`text-sm ${mutedTextClasses}`}>
                    Current Balance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={textClasses}>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className={mutedTextClasses}>Total Transactions</span>
                  <span className={textClasses}>{transactions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className={mutedTextClasses}>Earned This Month</span>
                  <span className="text-green-500">
                    +{transactions
                      .filter(t => t.amount > 0 && new Date(t.created_at).getMonth() === new Date().getMonth())
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(1)} FPT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={mutedTextClasses}>Member Since</span>
                  <span className={textClasses}>
                    {new Date(profile.instance_id ? '2024-01-01' : '2024-01-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Feed */}
        <Card className={`${cardClasses} mt-8`}>
          <CardHeader>
            <CardTitle className={`flex items-center ${textClasses}`}>
              <Calendar className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <div className="text-center py-8">
                <p className={mutedTextClasses}>Loading activity...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className={mutedTextClasses}>No activity yet. Start sharing content to earn FPT!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {getTransactionIcon(transaction.transaction_type)}
                      </div>
                      <div>
                        <p className={`font-medium ${textClasses}`}>
                          {transaction.description || transaction.transaction_type.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className={`text-sm ${mutedTextClasses}`}>
                          {formatDate(transaction.created_at)}
                        </p>
                        {transaction.metadata?.platforms && (
                          <div className="flex space-x-1 mt-1">
                            {transaction.metadata.platforms.map((platform: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-lg font-semibold ${getTransactionColor(transaction.amount)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} FPT
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
