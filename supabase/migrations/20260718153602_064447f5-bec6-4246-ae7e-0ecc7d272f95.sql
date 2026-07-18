
-- Restrict gallery storage inserts: only admins can insert via client; service_role bypasses RLS
DROP POLICY IF EXISTS "Allow authenticated uploads to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Allow service role to upload gallery images" ON storage.objects;

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));

-- Remove anonymous insert on generated_designs
DROP POLICY IF EXISTS "Anonymous users can insert anonymous designs" ON public.generated_designs;
