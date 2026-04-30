import { fetchCharacters } from "@/lib/api";
import HomeClient from "@/components/home/HomeClient";

export default async function HomePage() {
  const characters = await fetchCharacters();
  return <HomeClient characters={characters} />;
}
