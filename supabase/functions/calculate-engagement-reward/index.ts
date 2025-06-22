
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_id, event_type, post_id, source_post_id, metadata } = await req.json()

    if (!user_id || !event_type || !post_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get reward rule for this event type
    const { data: rewardRule, error: ruleError } = await supabaseClient
      .from('reward_rules')
      .select('value')
      .eq('rule_type', event_type)
      .eq('active', true)
      .single()

    if (ruleError || !rewardRule) {
      console.error('No reward rule found for event type:', event_type)
      return new Response(
        JSON.stringify({ error: 'No reward rule found' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const rewardAmount = rewardRule.value

    // Create earnings record
    const { error: earningsError } = await supabaseClient
      .from('earnings')
      .insert({
        user_id,
        type: event_type,
        amount: rewardAmount,
        source_post_id: source_post_id || post_id,
        notes: `${event_type} engagement reward`,
        timestamp: new Date().toISOString()
      })

    if (earningsError) {
      console.error('Error creating earnings record:', earningsError)
      return new Response(
        JSON.stringify({ error: 'Failed to create earnings record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Update user's FPT balance
    const { error: balanceError } = await supabaseClient
      .from('profiles')
      .update({ 
        fpt_balance: supabaseClient.rpc('increment_fpt_balance', {
          increment_amount: rewardAmount
        })
      })
      .eq('id', user_id)

    // Alternative approach if RPC doesn't work - fetch current balance and update
    if (balanceError) {
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('fpt_balance')
        .eq('id', user_id)
        .single()

      if (profile) {
        const newBalance = (profile.fpt_balance || 0) + rewardAmount
        
        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update({ fpt_balance: newBalance })
          .eq('id', user_id)

        if (updateError) {
          console.error('Error updating FPT balance:', updateError)
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        reward_amount: rewardAmount,
        event_type,
        user_id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in calculate-engagement-reward:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
