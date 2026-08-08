export type Product = {
  cart_id?: number;
  id: string;
  user_id?: string;
  title: string;
  category: string;
  creator: string;
  initials: string;
  price: number;
  rating: number;
  reviews: number;
  likes: number;
  downloads: number;
  tags: string[];
  art: string;
  description: string;
  image_url?: string;
  download_url?: string;
  badge?: string;
};

export const categories = [
  { name: "Logo", icon: "◈", tint: "violet" },
  { name: "Brand Identity", icon: "✦", tint: "blue" },
  { name: "Social Media", icon: "▦", tint: "pink" },
  { name: "UI Kits", icon: "▣", tint: "cyan" },
  { name: "Illustrations", icon: "✎", tint: "orange" },
  { name: "Icons", icon: "⊞", tint: "green" },
  { name: "Templates", icon: "▤", tint: "purple" },
  { name: "Posters", icon: "▧", tint: "rose" },
];

export const products: Product[] = [
  {
    id: "1",
    title: "Minimal Brand System",
    category: "Brand Identity",
    creator: "Mira Studio",
    initials: "MS",
    price: 24,
    rating: 4.9,
    reviews: 128,
    likes: 842,
    downloads: 1200,
    tags: ["Figma", "Branding", "Minimal"],
    art: "brand",
    description:
      "A considered visual identity system with flexible logo layouts, colour palettes and brand guidelines.",
    badge: "Bestseller",
  },
  {
    id: "3",
    title: "300+ Precision Icons",
    category: "Icons",
    creator: "Nora Pixel",
    initials: "NP",
    price: 18,
    rating: 4.9,
    reviews: 223,
    likes: 1137,
    downloads: 3400,
    tags: ["SVG", "Figma", "Icons"],
    art: "icons",
    description:
      "A clean, consistent icon system for modern interfaces. Fully editable vector files included.",
    badge: "Popular",
  },
 
  {
    id: "5",
    title: "Editorial Story Pack",
    category: "Templates",
    creator: "Atelier Nine",
    initials: "AN",
    price: 15,
    rating: 4.7,
    reviews: 176,
    likes: 703,
    downloads: 980,
    tags: ["Canva", "Stories", "Editorial"],
    art: "editorial",
    description:
      "Sophisticated story templates designed to bring a magazine-quality rhythm to social content.",
  },
  {
    id: "6",
    title: "Flux Dashboard UI Kit",
    category: "UI Kits",
    creator: "Kite Works",
    initials: "KW",
    price: 39,
    rating: 4.8,
    reviews: 64,
    likes: 481,
    downloads: 424,
    tags: ["Figma", "Dashboard", "SaaS"],
    art: "dashboard",
    description:
      "A purposeful Figma UI kit with 160 components, charts and fully responsive dashboard screens.",
    badge: "New",
  },
  {
    id: "7",
    title: "Soft Shapes Illustration Kit",
    category: "Illustrations",
    creator: "Olive Khan",
    initials: "OK",
    price: 22,
    rating: 4.8,
    reviews: 82,
    likes: 547,
    downloads: 510,
    tags: ["SVG", "People", "Colour"],
    art: "illustration",
    description:
      "A friendly, expressive library of people and abstract scenes for memorable digital products.",
  },
  {
    id: "8",
    title: "Studio Poster Series",
    category: "Posters",
    creator: "Form Bureau",
    initials: "FB",
    price: 14,
    rating: 4.7,
    reviews: 57,
    likes: 306,
    downloads: 384,
    tags: ["Print", "Poster", "Typography"],
    art: "poster",
    description:
      "A kinetic set of ready-to-print posters for creative studios, cultural events and launches.",
  },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);