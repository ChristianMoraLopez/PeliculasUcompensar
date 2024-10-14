// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kwfaeyekevcfvvpouyks.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZmFleWVrZXZjZnZ2cG91eWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NDk1MDgsImV4cCI6MjA0NDQyNTUwOH0.FyysS16damIGAYIWdMO70sTR8zC_f7QE1XMQ3r4PFTg';

export const supabase = createClient(supabaseUrl, supabaseKey);
