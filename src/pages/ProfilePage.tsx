
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { useBalance } from '../contexts/BalanceContext';
import { useUserMode } from '../hooks/useUserMode';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import InviteFriend from '../components/InviteFriend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Edit3, Calendar, TrendingUp, Users, Star, Award, Camera } from 'lucide-react';
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
  const { isLiveUser } = useUserMode();
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
      case 'invite_reward':
        return '🎉';
      default:
        return '💰';
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? 'text-green-500' : 'text-red-500';
  };

  // Theme classes with enhanced brand palette
  const bgClasses = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const sideCardClasses = isDarkMode ? 'bg-gray-900 border-gray-700 shadow-xl' : 'bg-white border-gray-300 shadow-lg';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextClasses = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const accentBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-50';

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
        <div className="max-w-6xl mx-auto px-8 py-8">
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
      
      <div className="max-w-6xl mx-auto px-8 py-8">
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
          <div>
            <h1 className={`text-3xl font-bold ${textClasses}`}>Profile</h1>
            <p className={mutedTextClasses}>Manage your account and view your activity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card & Balance */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced Profile Card */}
            <Card className={`${sideCardClasses} border-2`}>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-fpYellow">
                    <AvatarImage src={formData.image_url || profile.image_url || undefined} alt="Profile" />
                    <AvatarFallback className="bg-fpYellow text-black font-semibold text-xl">
                      {getInitials(formData.display_name || profile.display_name || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2 bg-fpYellow rounded-full p-2">
                      <Camera className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
                
                <h2 className={`text-xl font-bold ${textClasses} mb-1`}>
                  {profile.display_name || 'User'}
                </h2>
                <p className={`${mutedTextClasses} mb-4`}>
                  @{profile.username || 'user'}
                </p>
                
                <Badge className="bg-fpYellow text-black mb-4">
                  {profile.role === 'creator' ? 'Creator' : 
                   profile.role === 'distributor' ? 'Distributor' : 'Newcomer'}
                </Badge>

                <Separator className="my-4" />

                {/* Live FPT Balance */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-fpYellow mb-1">
                    {balance.toLocaleString()} FPT
                  </div>
                  <p className={`text-sm ${mutedTextClasses}`}>Current Balance</p>
                </div>

                <Separator className="my-4" />

                {/* Quick Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${mutedTextClasses}`}>Transactions</span>
                    <span className={`text-sm font-semibold ${textClasses}`}>{transactions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${mutedTextClasses}`}>Earned</span>
                    <span className="text-sm font-semibold text-green-500">
                      +{transactions
                        .filter(t => t.amount > 0)
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toFixed(1)} FPT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${mutedTextClasses}`}>Member Since</span>
                    <span className={`text-sm font-semibold ${textClasses}`}>Jan 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invite Friend Section - Only for live users */}
            {isLiveUser && (
              <InviteFriend isDarkMode={isDarkMode} />
            )}

            {/* Performance Stats */}
            <Card className={cardClasses}>
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center ${textClasses} text-lg`}>
                  <Award className="w-5 h-5 mr-2 text-fpYellow" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className={`text-sm ${textClasses}`}>Followers</span>
                  </div>
                  <span className="font-semibold text-blue-500">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className={`text-sm ${textClasses}`}>Rating</span>
                  </div>
                  <span className="font-semibold text-yellow-500">4.8/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${textClasses}`}>Growth</span>
                  </div>
                  <span className="font-semibold text-green-500">+12%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Information */}
            <Card className={cardClasses}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className={textClasses}>Profile Information</CardTitle>
                  <p className={`text-sm ${mutedTextClasses} mt-1`}>Update your personal details and preferences</p>
                </div>
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
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Profile Image URL */}
                    {isEditing && (
                      <div>
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
                        <div className={`p-2 ${accentBg} rounded-md`}>
                          <p className={textClasses}>{profile.display_name || 'Not set'}</p>
                        </div>
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
                          placeholder="username"
                          className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                        />
                      ) : (
                        <div className={`p-2 ${accentBg} rounded-md`}>
                          <p className={textClasses}>@{profile.username || 'Not set'}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
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
                        <div className={`p-2 ${accentBg} rounded-md min-h-[100px]`}>
                          <p className={textClasses}>{profile.bio || 'No bio added yet.'}</p>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-sm font-medium ${textClasses} mb-2`}>
                        Email
                      </label>
                      <div className={`p-2 ${accentBg} rounded-md`}>
                        <p className={mutedTextClasses}>{profile.email}</p>
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <label className={`block text-sm font-medium ${textClasses} mb-2`}>
                        Account Type
                      </label>
                      <div className={`p-2 ${accentBg} rounded-md`}>
                        <Badge className="bg-fpYellow text-black">
                          {profile.role === 'creator' ? 'Creator' : 
                           profile.role === 'distributor' ? 'Distributor' : 'Newcomer'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-fpYellow hover:bg-fpYellowDark text-black font-semibold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`flex items-center ${textClasses}`}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <p className={`text-sm ${mutedTextClasses}`}>Your transaction history and earnings</p>
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
                      <div key={transaction.id} className={`flex items-center justify-between p-4 rounded-lg ${accentBg} border transition-colors hover:border-gray-300`}>
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
      </div>
    </div>
  );
};

export default ProfilePage;
