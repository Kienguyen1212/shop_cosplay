"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { CharacterListItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const statusColor: Record<string, string> = {
  Available: "text-emerald-400",
  "In Stock": "text-blue-400",
  "Limited Availability": "text-amber-400",
  "Out of Stock": "text-red-400",
};

const statusBg: Record<string, string> = {
  Available: "bg-emerald-400/10 border-emerald-400/30",
  "In Stock": "bg-blue-400/10 border-blue-400/30",
  "Limited Availability": "bg-amber-400/10 border-amber-400/30",
  "Out of Stock": "bg-red-400/10 border-red-400/30",
};

interface HomeClientProps {
  characters: CharacterListItem[];
}

export default function HomeClient({ characters }: HomeClientProps) {
  const [query, setQuery] = useState("");

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0c0820] text-white">
      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="public/images/hero-bg.png"
            alt="Hero background"
            fill
            className="object-cover object-center"
            priority
            quality={85}
          />
        </div>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0820]/60 via-[#0c0820]/30 to-[#0c0820]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0820]/50 via-transparent to-[#0c0820]/50" />

        {/* Stars overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white star-pulse"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                top: Math.random() * 50 + "%",
                left: Math.random() * 100 + "%",
                "--delay": Math.random() * 3 + "s",
                "--duration": Math.random() * 2 + 2 + "s",
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/40 bg-violet-500/10 text-violet-300 text-xs mb-6"
          >
            <Sparkles size={12} />
            Thuê trang phục cosplay cao cấp
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-white mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 7vw, 5rem)",
            }}
          >
            Hạ Thủy
            <br />
            <span className="text-violet-300">Shop Cosplay</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="text-white/65 text-sm sm:text-base mb-8 sm:mb-10 max-w-xl mx-auto"
          >
            Sống trong nhân vật yêu thích, trang phục chất lượng cao, giá thuê
            hợp lý, giao hàng tận nơi.
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="flex items-center gap-0 max-w-lg mx-auto mb-6 sm:mb-8"
          >
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm nhân vật, trang phục..."
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-l-full bg-white/10 border border-white/20 border-r-0 text-white placeholder-white/40 text-sm focus:outline-none focus:bg-white/15 focus:border-violet-400/60 transition-all"
              />
            </div>
            <Link
              href="/characters"
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-r-full bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-sm font-medium transition-all duration-150 border border-violet-500 whitespace-nowrap"
            >
              Tìm kiếm
            </Link>
          </motion.form>

          {/* Search suggestions */}
          {query && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto bg-[#1a1035]/95 border border-white/15 rounded-2xl overflow-hidden text-left mb-6 sm:mb-8 shadow-2xl"
            >
              {filtered.length > 0 ? (
                filtered.map((char) => (
                  <Link
                    key={char.id}
                    href="/characters"
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                    <Image
                      src={char.image_url || "/images/cyrene.jpg"}
                      alt={char.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover object-top"
                    />
                    <div>
                      <p className="text-sm text-white/90">{char.name}</p>
                      <p className={`text-xs ${statusColor[char.status]}`}>
                        {char.status}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="ml-auto text-white/30"
                    />
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-white/40">
                  Không tìm thấy kết quả
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.45 }}
          >
            <Link
              href="/characters"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full border border-white/25 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm"
            >
              Xem tất cả nhân vật
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          <span className="text-white/35 text-xs">Cuộn xuống</span>
        </motion.div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="bg-[#100c28] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-4"
          >
            <div>
              <p className="text-violet-400 text-xs uppercase tracking-widest mb-2">
                Nổi bật
              </p>
              <h2
                className="text-white"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                }}
              >
                Nhân vật nổi bật
              </h2>
            </div>
            <Link
              href="/characters"
              className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              Xem tất cả <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {characters.slice(0, 5).map((char, i) => {
              const displayClass =
                i === 2 ? "hidden sm:block" :
                  i === 3 ? "hidden md:block" :
                    i >= 4 ? "hidden lg:block" : "";

              return (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={displayClass}
                >
                  <Link href="/characters">
                    <motion.div
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ duration: 0.25 }}
                      className="cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#1a1035] shadow-lg hover:shadow-violet-900/40 hover:border-violet-500/40 transition-all duration-300 group"
                    >
                      {/* Image */}
                      <div
                        className="relative overflow-hidden"
                        style={{ height: "clamp(180px, 30vw, 240px)" }}
                      >
                        <Image
                          src={char.image_url || "/images/cyrene.jpg"}
                          alt={char.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1035] via-transparent to-transparent" />
                        {/* Status badge */}
                        <div
                          className={`absolute top-2 sm:top-3 left-2 sm:left-3 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] border ${statusBg[char.status]} ${statusColor[char.status]}`}
                        >
                          {char.status}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="px-3 sm:px-4 pt-2 sm:pt-3 pb-3 sm:pb-4 flex flex-col items-center gap-1.5 sm:gap-2">
                        <h3
                          className="text-white/90 text-center text-sm sm:text-base"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {char.name}
                        </h3>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }, (_, j) => (
                            <Star
                              key={j}
                              size={9}
                              className="text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                        <p className="text-violet-300 text-xs sm:text-sm font-medium">
                          {formatPrice(char.rental_price)}/ngày
                        </p>
                        <span className="mt-0.5 w-full py-1.5 rounded-lg bg-violet-600/80 hover:bg-violet-500 text-white text-xs text-center transition-colors duration-150">
                          Xem chi tiết
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ALBUM MARQUEE ── */}
      <section className="bg-[#0c0820] py-16 sm:py-20 border-t border-white/5 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-8 sm:mb-12 px-4 sm:px-6"
        >
          <p className="text-violet-400 text-xs uppercase tracking-widest mb-2">
            Thư viện ảnh
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            }}
          >
            Album của Hạ Thủy
          </h2>
          <p className="text-white/40 text-sm mt-2">
            Những khoảnh khắc cosplay đáng nhớ từ cửa hàng
          </p>
        </motion.div>

        {/* Row 1 — scroll left */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#0c0820] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#0c0820] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="marquee-left flex gap-3 sm:gap-4 w-max">
              {[...characters, ...characters, ...characters, ...characters].map(
                (char, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group cursor-pointer"
                    style={{
                      width:
                        i % 3 === 0
                          ? "clamp(140px, 15vw, 200px)"
                          : i % 3 === 1
                            ? "clamp(120px, 12vw, 160px)"
                            : "clamp(160px, 17vw, 220px)",
                      height: "clamp(200px, 25vw, 300px)",
                    }}
                  >
                    <Image
                      src={char.image_url || "/images/cyrene.jpg"}
                      alt={char.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 inset-x-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p
                        className="text-white text-sm text-center"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {char.name}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Row 2 — scroll right */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#0c0820] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#0c0820] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="marquee-right flex gap-3 sm:gap-4 w-max">
              {[
                ...characters.slice().reverse(),
                ...characters.slice().reverse(),
                ...characters.slice().reverse(),
                ...characters.slice().reverse(),
              ].map((char, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group cursor-pointer"
                  style={{
                    width:
                      i % 3 === 0
                        ? "clamp(130px, 13vw, 170px)"
                        : i % 3 === 1
                          ? "clamp(170px, 18vw, 230px)"
                          : "clamp(145px, 15vw, 190px)",
                    height: "clamp(160px, 20vw, 240px)",
                  }}
                >
                  <Image
                    src={char.image_url || "/images/cyrene.jpg"}
                    alt={char.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 inset-x-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p
                      className="text-white text-sm text-center"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {char.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
