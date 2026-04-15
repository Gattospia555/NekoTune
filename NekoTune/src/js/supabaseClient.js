import { createClient } from '@supabase/supabase-js';

// Replace with your actual project URL and anon public key
const supabaseUrl = 'https://gwpkfsnwrzzluxlekgms.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cGtmc253cnp6bHV4bGVrZ21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MjQzMzAsImV4cCI6MjA5MTEwMDMzMH0.9D-hABDt53Ekd0SEMCOhife1WjvGt00CfL4HMPHmmpA';

document.supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('Supabase initialized successfully');
