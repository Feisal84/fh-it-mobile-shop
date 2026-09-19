import Link from "next/link";

export function MobileMenu() {
  return <nav className="mobile-menu"><Link href="/shop">Shop</Link><Link href="/cart">Bag</Link></nav>;
}