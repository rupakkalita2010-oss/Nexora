"use client";

import { motion } from "framer-motion";
import { Download, Heart, ShoppingBag, Star } from "lucide-react";
import { formatCurrency, type Product } from "@/lib/marketplace";
import { ProductArt } from "./ProductArt";

type ProductCardProps = {
  product: Product;
  isLiked: boolean;
  onLike: (id: string) => void;
  onOpen: (product: Product) => void;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, isLiked, onLike, onOpen, onAdd }: ProductCardProps) {
  return (
    <motion.article className="product-card" layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <button type="button" className="product-preview" onClick={() => onOpen(product)} aria-label={`View ${product.title}`}>
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
        <ProductArt product={product} />
      </button>
      <div className="product-card-body">
        <div className="product-heading-row">
          <div>
            <h3>{product.title}</h3>
            <button type="button" className="creator-line" onClick={() => onOpen(product)}>{product.creator}<span>✓</span></button>
          </div>
          <button type="button" className={`like-button ${isLiked ? "liked" : ""}`} aria-label={`Like ${product.title}`} onClick={() => onLike(product.id)}><Heart size={16} fill={isLiked ? "currentColor" : "none"} /></button>
        </div>
        <div className="product-stats"><span><Star size={14} fill="currentColor" /> {product.rating} <small>({product.reviews})</small></span><span><Download size={13} /> {product.downloads.toLocaleString()}</span></div>
        <div className="product-footer"><strong>{formatCurrency(product.price)}</strong><button type="button" onClick={() => onAdd(product)}><ShoppingBag size={15} /> Add</button></div>
      </div>
    </motion.article>
  );
}
