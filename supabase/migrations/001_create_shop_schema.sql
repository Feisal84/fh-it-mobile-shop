create extension if not exists pgcrypto;

do $$
begin
  create type public.order_status as enum (
    'pending_payment',
    'paid',
    'processing',
    'shipped',
    'cancelled',
    'refunded'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.payment_status as enum (
    'pending',
    'paid',
    'failed',
    'refunded'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  category text not null,
  category_slug text not null,
  price_cents integer not null check (price_cents >= 0),
  old_price_cents integer check (old_price_cents is null or old_price_cents >= price_cents),
  image_url text not null,
  condition text check (condition in ('Neu', 'Refurbished', 'Gebraucht')),
  stock integer not null default 0 check (stock >= 0),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_sequence bigserial unique,
  order_number text unique,
  email text not null,
  status public.order_status not null default 'pending_payment',
  payment_status public.payment_status not null default 'pending',
  currency text not null default 'eur' check (currency = lower(currency)),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  shipping_cents integer not null default 0 check (shipping_cents >= 0),
  total_cents integer not null check (total_cents = subtotal_cents + shipping_cents),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  shipping_name text,
  shipping_address jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_slug text not null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.stripe_webhook_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz,
  processing_error text,
  created_at timestamptz not null default now()
);

create index if not exists products_active_category_idx
  on public.products (category_slug)
  where is_active = true;

create index if not exists orders_status_created_at_idx
  on public.orders (status, created_at desc);

create index if not exists order_items_order_id_idx
  on public.order_items (order_id);

create index if not exists stripe_webhook_events_created_at_idx
  on public.stripe_webhook_events (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.set_order_number()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.order_number is null then
    new.order_number := format(
      'FH-%s-%s',
      to_char(current_date, 'YYYYMMDD'),
      lpad(new.order_sequence::text, 6, '0')
    );
  end if;
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_order_number on public.orders;
create trigger orders_set_order_number
before insert on public.orders
for each row execute function public.set_order_number();

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.stripe_webhook_events enable row level security;

drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products"
on public.products
for select
to anon, authenticated
using (is_active = true);

insert into public.products (
  slug,
  name,
  description,
  category,
  category_slug,
  price_cents,
  old_price_cents,
  image_url,
  condition,
  stock,
  is_featured
)
values
  ('smartphone-premium-5g', 'Smartphone Premium 5G', 'Leistungsstarkes 5G-Smartphone mit brillantem Display und ausdauerndem Akku.', 'Smartphones', 'smartphones', 39999, 44999, '/images/products/smartphone-5g.jpg', 'Neu', 8, true),
  ('business-laptop-156', 'Business Laptop 15,6 Zoll', 'Zuverlässiger 15,6-Zoll-Laptop für Arbeit, Studium und den täglichen Einsatz.', 'IT & Computer', 'it-computer', 64999, 74999, '/images/products/laptop.jpg', 'Neu', 5, true),
  ('wireless-bluetooth-kopfhoerer', 'Wireless Bluetooth Kopfhörer', 'Kabellose Over-Ear-Kopfhörer mit sattem Klang und hohem Tragekomfort.', 'Elektronik', 'elektronik', 4999, 6999, '/images/products/headphones.jpg', 'Neu', 15, true),
  ('smartphone-schutzhuelle', 'Smartphone Schutzhülle', 'Robuste Schutzhülle für sicheren Halt und zuverlässigen Schutz im Alltag.', 'Handy-Zubehör', 'handy-zubehoer', 1499, null, '/images/products/phone-case.jpg', 'Neu', 30, true),
  ('usb-c-schnellladegeraet-65w', 'USB-C Schnellladegerät 65W', 'Kompaktes 65-Watt-Netzteil zum schnellen Laden kompatibler USB-C-Geräte.', 'Handy-Zubehör', 'handy-zubehoer', 2999, null, '/images/products/usb-c-charger.jpg', 'Neu', 25, true),
  ('refurbished-smartphone', 'Refurbished Smartphone', 'Sorgfältig geprüftes Smartphone in sehr gutem technischen Zustand.', 'Refurbished', 'refurbished', 22999, 27999, '/images/products/refurbished-smartphone.jpg', 'Refurbished', 4, true),
  ('herren-casual-hoodie', 'Herren Casual Hoodie', 'Bequemer Hoodie aus weichem Material für entspannte Alltagslooks.', 'Bekleidung', 'bekleidung', 3999, null, '/images/products/hoodie.jpg', 'Neu', 12, true),
  ('premium-usb-c-kabel', 'Premium USB-C Kabel', 'Strapazierfähiges USB-C-Kabel für schnelles Laden und zuverlässige Datenübertragung.', 'Handy-Zubehör', 'handy-zubehoer', 1299, null, '/images/products/usb-c-cable.jpg', 'Neu', 40, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  category_slug = excluded.category_slug,
  price_cents = excluded.price_cents,
  old_price_cents = excluded.old_price_cents,
  image_url = excluded.image_url,
  condition = excluded.condition,
  stock = excluded.stock,
  is_featured = excluded.is_featured,
  is_active = true;