import { API_BASE } from "./utils";
import type { CharacterListItem, Character, Order } from "./types";

/** Fetch all characters from API, with fallback to local data */
export async function fetchCharacters(): Promise<CharacterListItem[]> {
  try {
    const res = await fetch(`${API_BASE}/characters/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    const characters = data.results || data;
    return characters.map((c: any) => ({
      ...c,
      image_url: c.image_url ? c.image_url.replace(/^https?:\/\/[^/]+/, '') : null,
    }));
  } catch {
    // Fallback to local static data
    return FALLBACK_CHARACTERS;
  }
}

/** Fetch a single character by slug */
export async function fetchCharacter(slug: string): Promise<Character | null> {
  try {
    const res = await fetch(`${API_BASE}/characters/${slug}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("API error");
    const char = await res.json();
    return {
      ...char,
      image_url: char.image_url ? char.image_url.replace(/^https?:\/\/[^/]+/, '') : null,
      gallery: char.gallery ? char.gallery.map((g: any) => ({
        ...g,
        image: g.image.replace(/^https?:\/\/[^/]+/, '')
      })) : [],
    };
  } catch {
    return null;
  }
}

/** Fetch featured characters */
export async function fetchFeaturedCharacters(): Promise<CharacterListItem[]> {
  try {
    const res = await fetch(`${API_BASE}/characters/featured/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("API error");
    const characters = await res.json();
    return characters.map((c: any) => ({
      ...c,
      image_url: c.image_url ? c.image_url.replace(/^https?:\/\/[^/]+/, '') : null,
    }));
  } catch {
    return FALLBACK_CHARACTERS;
  }
}

/** Submit a contact form */
export async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/auth/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/** Create a rental order */
export async function createOrder(orderData: Partial<Order>) {
  const res = await fetch(`${API_BASE}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

/** Fallback data when API is not available */
const FALLBACK_CHARACTERS: CharacterListItem[] = [
  {
    id: "1",
    name: "Cyrene",
    slug: "cyrene",
    status: "Available",
    rental_price: 150,
    accent_color: "#7C3AED",
    image_url: "/images/cyrene.jpg",
    rating: 5.0,
    review_count: 128,
    is_featured: true,
  },
  {
    id: "2",
    name: "Herta",
    slug: "herta",
    status: "In Stock",
    rental_price: 180,
    accent_color: "#1E40AF",
    image_url: "/images/herta.jpg",
    rating: 4.9,
    review_count: 95,
    is_featured: true,
  },
  {
    id: "3",
    name: "Kiana",
    slug: "kiana",
    status: "Limited Availability",
    rental_price: 200,
    accent_color: "#0F766E",
    image_url: "/images/kiana.jpg",
    rating: 5.0,
    review_count: 156,
    is_featured: true,
  },
  {
    id: "4",
    name: "Seele",
    slug: "seele",
    status: "Available",
    rental_price: 170,
    accent_color: "#9D174D",
    image_url: "/images/seele.jpg",
    rating: 4.8,
    review_count: 112,
    is_featured: true,
  },
  {
    id: "5",
    name: "Hanabi",
    slug: "hanabi",
    status: "In Stock",
    rental_price: 160,
    accent_color: "#B91C1C",
    image_url: "/images/hanabi.jpg",
    rating: 4.7,
    review_count: 89,
    is_featured: true,
  },
];
