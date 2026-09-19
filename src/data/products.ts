import { Product } from "../types/shop";

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 128GB",
    slug: "iphone-15-128gb",
    description:
      "Apple iPhone 15 mit 128 GB Speicher. Modernes Smartphone mit leistungsstarker Kamera und USB-C.",
    price: 649.99,
    oldPrice: 699.99,
    category: "Smartphones",
    categorySlug: "smartphones",
    image: "/images/products/iphone-15.jpg",
    rating: 4.8,
    reviews: 124,
    stock: 8,
    condition: "Neu",
    brand: "Apple",
    featured: true,
  },

  {
    id: "2",
    name: "Samsung Galaxy S24",
    slug: "samsung-galaxy-s24",
    description:
      "Samsung Galaxy S24 mit hochwertigem Display, leistungsstarkem Prozessor und moderner Kamera.",
    price: 579.99,
    category: "Smartphones",
    categorySlug: "smartphones",
    image: "/images/products/galaxy-s24.jpg",
    rating: 4.7,
    reviews: 98,
    stock: 6,
    condition: "Neu",
    brand: "Samsung",
    featured: true,
  },

  {
    id: "3",
    name: "Lenovo ThinkPad Business Laptop",
    slug: "lenovo-thinkpad-business",
    description:
      "Zuverlässiger Business-Laptop für Arbeit, Schule und Studium.",
    price: 449.99,
    oldPrice: 499.99,
    category: "IT & Computer",
    categorySlug: "it-computer",
    image: "/images/products/thinkpad.jpg",
    rating: 4.6,
    reviews: 75,
    stock: 4,
    condition: "Refurbished",
    brand: "Lenovo",
    featured: true,
  },

  {
    id: "4",
    name: "USB-C Schnellladegerät 65W",
    slug: "usb-c-schnellladegeraet-65w",
    description:
      "Kompaktes 65W USB-C Ladegerät für Smartphones, Tablets und kompatible Laptops.",
    price: 24.99,
    category: "Handy-Zubehör",
    categorySlug: "handy-zubehoer",
    image: "/images/products/charger.jpg",
    rating: 4.5,
    reviews: 62,
    stock: 25,
    condition: "Neu",
    featured: true,
  },

  {
    id: "5",
    name: "Bluetooth Kopfhörer",
    slug: "bluetooth-kopfhoerer",
    description:
      "Kabellose Bluetooth-Kopfhörer mit klarer Audioqualität und langer Akkulaufzeit.",
    price: 39.99,
    category: "Elektronik",
    categorySlug: "elektronik",
    image: "/images/products/headphones.jpg",
    rating: 4.4,
    reviews: 51,
    stock: 15,
    condition: "Neu",
    featured: true,
  },

  {
    id: "6",
    name: "Herren Hoodie Classic",
    slug: "herren-hoodie-classic",
    description:
      "Bequemer Herren-Hoodie für Alltag und Freizeit.",
    price: 34.99,
    category: "Bekleidung",
    categorySlug: "bekleidung",
    image: "/images/products/hoodie.jpg",
    rating: 4.5,
    reviews: 31,
    stock: 20,
    condition: "Neu",
    brand: "FH Collection",
    featured: true,
  },

  {
    id: "7",
    name: "iPhone 13 128GB Refurbished",
    slug: "iphone-13-refurbished",
    description:
      "Professionell geprüftes und aufbereitetes iPhone 13 mit 128 GB Speicher.",
    price: 329.99,
    category: "Refurbished",
    categorySlug: "refurbished",
    image: "/images/products/iphone-13.jpg",
    rating: 4.6,
    reviews: 86,
    stock: 5,
    condition: "Refurbished",
    brand: "Apple",
    featured: true,
  },

  {
    id: "8",
    name: "Premium Smartphone Case",
    slug: "premium-smartphone-case",
    description:
      "Schützende Smartphone-Hülle mit modernem Design.",
    price: 14.99,
    category: "Handy-Zubehör",
    categorySlug: "handy-zubehoer",
    image: "/images/products/case.jpg",
    rating: 4.3,
    reviews: 43,
    stock: 30,
    condition: "Neu",
    featured: false,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter(
    (product) => product.categorySlug === categorySlug
  );
}