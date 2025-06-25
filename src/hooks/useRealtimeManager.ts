
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

// Singleton realtime manager to prevent duplicate subscriptions
class RealtimeManager {
  private static instance: RealtimeManager;
  private channels: Map<string, RealtimeChannel> = new Map();
  private subscribers: Map<string, Set<(payload: any) => void>> = new Map();

  static getInstance(): RealtimeManager {
    if (!RealtimeManager.instance) {
      RealtimeManager.instance = new RealtimeManager();
    }
    return RealtimeManager.instance;
  }

  subscribe(channelName: string, table: string, callback: (payload: any) => void) {
    // Add callback to subscribers
    if (!this.subscribers.has(channelName)) {
      this.subscribers.set(channelName, new Set());
    }
    this.subscribers.get(channelName)!.add(callback);

    // Create channel if it doesn't exist
    if (!this.channels.has(channelName)) {
      const channel = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          (payload) => {
            // Notify all subscribers for this channel
            const callbacks = this.subscribers.get(channelName);
            if (callbacks) {
              callbacks.forEach(cb => {
                try {
                  cb(payload);
                } catch (error) {
                  console.error(`Error in realtime callback:`, error);
                }
              });
            }
          }
        )
        .subscribe();

      this.channels.set(channelName, channel);
    }

    return () => {
      // Remove callback
      const callbacks = this.subscribers.get(channelName);
      if (callbacks) {
        callbacks.delete(callback);
        
        // If no more subscribers, remove channel
        if (callbacks.size === 0) {
          const channel = this.channels.get(channelName);
          if (channel) {
            supabase.removeChannel(channel);
            this.channels.delete(channelName);
            this.subscribers.delete(channelName);
          }
        }
      }
    };
  }
}

export const useRealtimeManager = () => {
  return RealtimeManager.getInstance();
};
