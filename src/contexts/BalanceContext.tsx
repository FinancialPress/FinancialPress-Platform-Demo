
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BalanceContextType {
  balance: number;
  loading: boolean;
  refreshBalance: () => Promise<void>;
  updateBalance: (newBalance: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(1247.5);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!user) {
      setBalance(1247.5);
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching balance for user:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('fpt_balance')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching balance:', error);
        return;
      }

      const fetchedBalance = data?.fpt_balance || 0;
      // Use standardized mock balance if real balance is 0
      const newBalance = fetchedBalance > 0 ? fetchedBalance : 1247.5;
      console.log('Fetched balance:', fetchedBalance, 'Display balance:', newBalance);
      setBalance(newBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  // Fetch balance when user changes
  useEffect(() => {
    if (user) {
      fetchBalance();
    } else {
      setBalance(1247.5);
    }
  }, [user]);

  // Set up polling for balance updates every 30 seconds
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchBalance();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user]);

  const value = {
    balance,
    loading,
    refreshBalance: fetchBalance,
    updateBalance
  };

  return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
};
