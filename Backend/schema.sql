-- SQL DDL untuk Supabase SQL Editor
-- Membuat tabel catatan dengan relasi pengguna dan Row Level Security (RLS)

-- 1. Buat Tabel Catatan (Notes)
CREATE TABLE IF NOT EXISTS public.notes (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT DEFAULT '' NOT NULL,
  content TEXT DEFAULT '' NOT NULL,
  ai_tag TEXT DEFAULT NULL,
  is_favorite BOOLEAN DEFAULT FALSE NOT NULL,
  is_archived BOOLEAN DEFAULT FALSE NOT NULL,
  notebook TEXT DEFAULT '' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan RLS (Penting agar data terisolasi per-pengguna)
CREATE POLICY "Users can select their own notes" 
  ON public.notes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes" 
  ON public.notes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
  ON public.notes FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
  ON public.notes FOR DELETE 
  USING (auth.uid() = user_id);
