export type Product = {
  id: string;
  name: string;
  /** Base price, always stored in USD. */
  priceUSD: number;
  likes: number;
  likesLabel: string;
  category: string;
  image: string;
  badge?: string;
  trending?: boolean;
};

export const PRODUCTS: Product[] = [
  { id: "smart-watch-9", name: "Smart Watch Series 9", priceUSD: 299.99, likes: 2100, likesLabel: "2.1k", category: "Wearables", image: "/products/smart-watch.svg", badge: "New", trending: true },
  { id: "earbuds-pro", name: "Wireless Earbuds Pro", priceUSD: 129.99, likes: 1600, likesLabel: "1.6k", category: "Audio", image: "/products/earbuds.svg", trending: true },
  { id: "bt-speaker", name: "Portable Bluetooth Speaker", priceUSD: 59.99, likes: 1200, likesLabel: "1.2k", category: "Audio", image: "/products/speaker.svg", trending: true },
  { id: "wireless-charger", name: "3-in-1 Wireless Charger", priceUSD: 49.99, likes: 980, likesLabel: "980", category: "Accessories", image: "/products/charger.svg", trending: true },
  { id: "camera-drone", name: "4K Camera Drone", priceUSD: 499.99, likes: 1800, likesLabel: "1.8k", category: "Gadgets", image: "/products/drone.svg", badge: "Hot", trending: true },
  { id: "smartphone-gimbal", name: "Smartphone Gimbal", priceUSD: 89.99, likes: 760, likesLabel: "760", category: "Accessories", image: "/products/gimbal.svg", trending: true },
  { id: "anc-headphones", name: "Studio ANC Headphones", priceUSD: 249.99, likes: 1400, likesLabel: "1.4k", category: "Audio", image: "/products/headphones.svg" },
  { id: "flagship-phone", name: "Flagship 5G Smartphone", priceUSD: 999.0, likes: 3200, likesLabel: "3.2k", category: "Gadgets", image: "/products/phone.svg", badge: "New" },
  { id: "pro-tablet", name: "Pro Tablet 11-inch", priceUSD: 649.0, likes: 1100, likesLabel: "1.1k", category: "Gadgets", image: "/products/tablet.svg" },
  { id: "mech-keyboard", name: "Mechanical RGB Keyboard", priceUSD: 119.99, likes: 890, likesLabel: "890", category: "Accessories", image: "/products/keyboard.svg", badge: "Sale" },
  { id: "ergo-mouse", name: "Ergonomic Wireless Mouse", priceUSD: 39.99, likes: 640, likesLabel: "640", category: "Accessories", image: "/products/mouse.svg", badge: "Sale" },
  { id: "smart-desk-lamp", name: "Smart LED Desk Lamp", priceUSD: 79.99, likes: 520, likesLabel: "520", category: "Smart Home", image: "/products/lamp.svg" },
];

export const TRENDING = PRODUCTS.filter((p) => p.trending);

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
