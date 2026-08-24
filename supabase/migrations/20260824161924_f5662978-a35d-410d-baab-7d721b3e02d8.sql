DROP POLICY IF EXISTS "Anyone can submit a booking request" ON public.design_bookings;
REVOKE INSERT ON public.design_bookings FROM anon;
REVOKE INSERT ON public.design_bookings FROM authenticated;

CREATE TABLE IF NOT EXISTS public.booking_submission_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.booking_submission_log TO service_role;
ALTER TABLE public.booking_submission_log ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_booking_log_ip_created
  ON public.booking_submission_log (ip_hash, created_at DESC);

DROP POLICY IF EXISTS "Admins can read booking uploads" ON storage.objects;
CREATE POLICY "Admins can read booking uploads"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'booking-uploads' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete booking uploads" ON storage.objects;
CREATE POLICY "Admins can delete booking uploads"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'booking-uploads' AND public.has_role(auth.uid(), 'admin'));