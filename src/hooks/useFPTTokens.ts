
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

      const newBalance = data?.fpt_balance || 0;
      console.log('Fetched balance:', newBalance);
      setBalance(newBalance);
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
      console.error('No user found for addTokens');
      toast.error('Please log in to earn tokens');
      return false;
    }

    console.log('addTokens called with:', { amount, transactionType, description, metadata, userId: user.id });
    
    if (amount <= 0) {
      console.error('Invalid token amount:', amount);
      toast.error('Invalid token amount');
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

      console.log('RPC add_fpt_tokens response:', { data, error });

      if (error) {
        console.error('Error adding tokens:', error);
        toast.error(`Failed to add tokens: ${error.message}`);
        return false;
      }

      // Refresh balance and transactions immediately
      await Promise.all([fetchBalance(), fetchTransactions()]);
      
      console.log('Tokens added successfully');
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
      console.error('No user found for spendTokens');
      toast.error('Please log in to spend tokens');
      return false;
    }

    if (amount <= 0) {
      console.error('Invalid token amount:', amount);
      toast.error('Invalid token amount');
      return false;
    }

    // Check current balance before attempting to spend
    await fetchBalance();
    
    if (balance < amount) {
      console.error('Insufficient balance:', { balance, required: amount });
      toast.error(`Insufficient FPT balance. You have ${balance} FPT, but need ${amount} FPT.`);
      return false;
    }

    console.log('spendTokens called with:', { amount, transactionType, description, metadata, userId: user.id, currentBalance: balance });

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('spend_fpt_tokens', {
        target_user_id: user.id,
        token_amount: amount,
        transaction_type: transactionType,
        description: description || null,
        metadata: metadata || null
      });

      console.log('RPC spend_fpt_tokens response:', { data, error });

      if (error) {
        console.error('Error spending tokens:', error);
        toast.error(`Failed to spend tokens: ${error.message}`);
        return false;
      }

      // Refresh balance and transactions immediately
      await Promise.all([fetchBalance(), fetchTransactions()]);
      
      console.log('Tokens spent successfully');
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

  // Fetch balance when user changes
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
