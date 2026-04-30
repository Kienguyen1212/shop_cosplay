import { fetchCharacters } from "@/lib/api";
import CharactersClient from "@/components/characters/CharactersClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nhân vật Cosplay | Hạ Thủy Cosplay",
  description: "Khám phá bộ sưu tập trang phục cosplay cao cấp. Lọc theo trạng thái, tìm kiếm và xem chi tiết từng nhân vật.",
};

export default async function CharactersPage() {
  const characters = await fetchCharacters();
  return <CharactersClient characters={characters} />;
}
