export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  categorySlug: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  stock: number;
  condition?: "Neu" | "Refurbished" | "Gebraucht";
  brand?: string;
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};