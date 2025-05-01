import { getRandomQuote } from '../../../server/supabase';
async function main() {
  const quote = await getRandomQuote();
  console.log(quote[0]);
}

main();