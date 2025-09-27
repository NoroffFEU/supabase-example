import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "";
const supabaseKey = "";

export const supabase = createClient(supabaseUrl, supabaseKey);
