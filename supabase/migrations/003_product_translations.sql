-- Optional product translations.
-- When a translation column is NULL, the app falls back to the German base column.

alter table public.products
  add column if not exists name_en text,
  add column if not exists name_ar text,
  add column if not exists description_en text,
  add column if not exists description_ar text,
  add column if not exists category_en text,
  add column if not exists category_ar text;
