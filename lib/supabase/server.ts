import "server-only";
import { createClient } from "@supabase/supabase-js";

// Uso exclusivo em servidor. A service role key ignora RLS —
// nunca importar este arquivo em Client Component nem expor a chave ao browser.

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam estar definidas em .env.local"
  );
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
