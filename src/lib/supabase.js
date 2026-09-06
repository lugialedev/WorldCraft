import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.Vite_SUPABASE_URL
const supabasePublishableKey = import.meta.env.Vite_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
)
