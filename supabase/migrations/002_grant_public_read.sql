-- RLS policies alone don't grant table-level privileges; anon/authenticated need explicit GRANTs.
grant select on public.products to anon, authenticated;
