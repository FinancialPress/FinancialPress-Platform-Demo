
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const AuthButton = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Button
        onClick={() => navigate('/auth')}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      >
        <User className="w-4 h-4 mr-2" />
        Sign In
      </Button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <p className="text-sm font-medium text-white">
          {profile?.display_name || user.email}
        </p>
        <p className="text-xs text-yellow-500">
          {profile?.fpt_balance?.toFixed(2) || '0.00'} FPT
        </p>
      </div>
      <Button
        onClick={signOut}
        variant="outline"
        size="sm"
        className="border-gray-700 text-gray-300 hover:bg-gray-800"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AuthButton;
