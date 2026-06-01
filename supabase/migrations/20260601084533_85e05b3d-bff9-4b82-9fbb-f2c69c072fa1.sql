-- 1. Drop session_id column (was unused in app, enabled cross-session tracking)
ALTER TABLE public.generated_designs DROP COLUMN IF EXISTS session_id;

-- 2. Replace permissive INSERT policy with a constrained one
DROP POLICY IF EXISTS "Anyone can create designs" ON public.generated_designs;

CREATE POLICY "Anyone can create non-public designs"
ON public.generated_designs
FOR INSERT
TO anon, authenticated
WITH CHECK (is_public = false);