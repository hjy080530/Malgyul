import { supabase } from './supabase';

async function getRandomQuote() {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) throw error;
  return data;
}