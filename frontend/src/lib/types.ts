/** TypeScript interfaces matching Django models */

export interface CostumeComponent {
  icon: string;
  name: string;
}

export interface Character {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "Available" | "In Stock" | "Limited Availability" | "Out of Stock";
  rental_price: number;
  accent_color: string;
  image_url: string | null;
  components: CostumeComponent[];
  rating: number;
  review_count: number;
  sizes_available: string[];
  origin_game: string;
  is_featured: boolean;
  gallery: CharacterImage[];
  created_at: string;
  updated_at: string;
}

export interface CharacterListItem {
  id: string;
  name: string;
  slug: string;
  status: "Available" | "In Stock" | "Limited Availability" | "Out of Stock";
  rental_price: number;
  accent_color: string;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_featured: boolean;
}

export interface CharacterImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface OrderItem {
  id?: number;
  character: string;
  character_name?: string;
  character_image?: string;
  size: string;
  daily_price: number;
  rental_days: number;
  subtotal?: number;
}

export interface Order {
  id: string;
  status: string;
  total_amount: number;
  deposit_amount: number;
  payment_method: string;
  rental_start: string;
  rental_end: string;
  rental_days: number;
  notes: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  character: CharacterListItem;
  size: string;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  is_vip: boolean;
}
