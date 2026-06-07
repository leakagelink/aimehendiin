
-- 1. Restrict gallery uploads to authenticated users only (not anon)
DROP POLICY IF EXISTS "Allow authenticated uploads to gallery" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to gallery"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

-- 2. Remove broad public SELECT (listing) policy on gallery-images.
-- Files remain publicly accessible via the public bucket CDN URL,
-- but the API can no longer list/enumerate objects.
DROP POLICY IF EXISTS "Gallery images are publicly accessible" ON storage.objects;

-- 3. Add explicit admin-only DELETE and UPDATE policies for gallery-images bucket
CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));

-- 4. Add user_id ownership column to generated_designs and tighten policies
ALTER TABLE public.generated_designs
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS generated_designs_user_id_idx
  ON public.generated_designs(user_id);

-- Replace permissive INSERT policy with owner-aware one
DROP POLICY IF EXISTS "Anyone can create non-public designs" ON public.generated_designs;

CREATE POLICY "Users can insert their own designs"
ON public.generated_designs FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can insert anonymous designs"
ON public.generated_designs FOR INSERT TO anon
WITH CHECK (user_id IS NULL AND is_public = false);

-- Allow users to view their own designs (in addition to public ones)
CREATE POLICY "Users can view their own designs"
ON public.generated_designs FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Allow users to update / delete their own designs
CREATE POLICY "Users can update their own designs"
ON public.generated_designs FOR UPDATE TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own designs"
ON public.generated_designs FOR DELETE TO authenticated
USING (auth.uid() = user_id);
