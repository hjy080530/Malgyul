import supabase from '../../../server/supabase.ts';

export async function fetchRandomLongSutra() {
  const { data, error } = await supabase
    .from('long_document')
    .select('*')
    .order('RANDOM()')
    .limit(1)
    .single();

  if (error) {
    console.error('랜덤 긴 글 불러오기 실패:', error);
    throw error;
  }

  return data;
}