
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useFPTTokens = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchBalance = async () => {
    if (!user) {
      setBalance(0);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('fpt_balance')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching balance:', error);
        return;
      }

      setBalance(data?.fpt_balance || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fetchTransactions = async () => {
    if (!user) {
      setTransactions([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const addTokens = async (
    amount: number,
    transactionType: string,
    description?: string,
    metadata?: any
  ) => {
    if (!user) {
      toast.error('Please log in to earn tokens');
      return false;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('add_fpt_tokens', {
        target_user_id: user.id,
        token_amount: amount,
        transaction_type: transactionType,
        description: description || null,
        metadata: metadata || null
      });

      if (error) {
        console.error('Error adding tokens:', error);
        toast.error('Failed to add tokens');
        return false;
      }

      // Refresh balance and transactions
      await fetchBalance();
      await fetchTransactions();
      
      toast.success(`+${amount} FPT earned!`, {
        description: description || 'Tokens added to your account'
      });
      
      return true;
    } catch (error) {
      console.error('Error adding tokens:', error);
      toast.error('Failed to add tokens');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const spendTokens = async (
    amount: number,
    transactionType: string,
    description?: string,
    metadata?: any
  ) => {
    if (!user) {
      toast.error('Please log in to spend tokens');
      return false;
    }

    if (balance < amount) {
      toast.error(`Insufficient FPT balance. You have ${balance} FPT, but need ${amount} FPT.`);
      return false;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('spend_fpt_tokens', {
        target_user_id: user.id,
        token_amount: amount,
        transaction_type: transactionType,
        description: description || null,
        metadata: metadata || null
      });

      if (error) {
        console.error('Error spending tokens:', error);
        toast.error('Failed to spend tokens');
        return false;
      }

      // Refresh balance and transactions
      await fetchBalance();
      await fetchTransactions();
      
      toast.success(`${amount} FPT spent successfully!`, {
        description: description || 'Tokens deducted from your account'
      });
      
      return true;
    } catch (error) {
      console.error('Error spending tokens:', error);
      toast.error('Failed to spend tokens');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchTransactions();
    } else {
      setBalance(0);
      setTransactions([]);
    }
  }, [user]);

  return {
    balance,
    loading,
    transactions,
    addTokens,
    spendTokens,
    refreshBalance: fetchBalance,
    refreshTransactions: fetchTransactions
  };
};
