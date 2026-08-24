GRANT SELECT ON public.booking_submission_log TO authenticated;
CREATE POLICY "Admins can read booking submission log"
ON public.booking_submission_log FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));