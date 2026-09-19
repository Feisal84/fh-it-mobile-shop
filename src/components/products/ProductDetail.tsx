"use client";

import { useCart } from "@/src/context/CartContext";
import type { Product } from "@/src/types/shop";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  return <section className="product-detail page-wrap"><div className="detail-visual" style={{ backgroundColor: product.color }}><span className="detail-device" /></div><div className="detail-copy"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="detail-price">${product.price}</p><p className="lead">{product.description}</p><button onClick={() => addItem(product)}>Add to bag</button><p className="fine-print">Free standard shipping. 30-day returns.</p></div></section>;
}