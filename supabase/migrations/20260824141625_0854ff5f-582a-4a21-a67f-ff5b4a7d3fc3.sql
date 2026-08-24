CREATE TABLE public.design_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 80),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 20),
  city TEXT CHECK (city IS NULL OR char_length(city) <= 80),
  occasion TEXT CHECK (occasion IS NULL OR char_length(occasion) <= 60),
  event_date DATE,
  style TEXT CHECK (style IS NULL OR char_length(style) <= 40),
  message TEXT CHECK (message IS NULL OR char_length(message) <= 1000),
  design_image_url TEXT CHECK (design_image_url IS NULL OR char_length(design_image_url) <= 2048),
  source TEXT NOT NULL DEFAULT 'try-on' CHECK (char_length(source) <= 40),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.design_bookings TO anon;
GRANT INSERT ON public.design_bookings TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.design_bookings TO authenticated;
GRANT ALL ON public.design_bookings TO service_role;

ALTER TABLE public.design_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking request"
ON public.design_bookings FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new');

CREATE POLICY "Admins can read bookings"
ON public.design_bookings FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings"
ON public.design_bookings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bookings"
ON public.design_bookings FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_design_bookings_created_at ON public.design_bookings (created_at DESC);