"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Star,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import type { CharacterListItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

const statusMeta: Record<
  string,
  { label: string; color: string; dot: string; bg: string }
> = {
  Available: {
    label: "Còn hàng",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
  },
  "In Stock": {
    label: "Trong kho",
    color: "text-blue-400",
    dot: "bg-blue-400",
    bg: "bg-blue-400/10 border-blue-400/30",
  },
  "Limited Availability": {
    label: "Số lượng có hạn",
    color: "text-amber-400",
    dot: "bg-amber-400",
    bg: "bg-amber-400/10 border-amber-400/30",
  },
  "Out of Stock": {
    label: "Hết hàng",
    color: "text-red-400",
    dot: "bg-red-400",
    bg: "bg-red-400/10 border-red-400/30",
  },
};

const filters = [
  "Tất cả",
  "Còn hàng",
  "Trong kho",
  "Số lượng có hạn",
  "Hết hàng",
];

// Fallback components data for detail view
const CHAR_COMPONENTS: Record<string, { icon: string; name: string }[]> = {
  Cyrene: [
    { icon: "🎩", name: "Mũ phù thủy hoa" },
    { icon: "✨", name: "Gậy phép thuật chi tiết" },
    { icon: "🧤", name: "Găng tay" },
    { icon: "👗", name: "Váy tím xếp tầng & corset" },
    { icon: "👢", name: "Boots cao đùi" },
  ],
  Herta: [
    { icon: "🪆", name: "Phụ kiện rối marionette" },
    { icon: "🦋", name: "Bộ ghim bướm" },
    { icon: "👗", name: "Váy học giả xanh navy" },
    { icon: "🧣", name: "Nơ ren cổ" },
    { icon: "👞", name: "Giày da bóng" },
  ],
  Kiana: [
    { icon: "🗡️", name: "Cặp súng năng lượng" },
    { icon: "⚡", name: "Áo choàng thánh quang" },
    { icon: "👗", name: "Giáp chiến đấu trắng vàng" },
    { icon: "🧤", name: "Găng tay công nghệ" },
    { icon: "👢", name: "Boots chiến đấu cao gót" },
  ],
  Seele: [
    { icon: "🦋", name: "Phụ kiện cánh bướm" },
    { icon: "⚔️", name: "Liềm replica (prop)" },
    { icon: "👗", name: "Váy tím xếp tầng" },
    { icon: "🎀", name: "Nơ tóc & ruy băng" },
    { icon: "🧦", name: "Tất cao đùi" },
  ],
  Hanabi: [
    { icon: "🌸", name: "Phụ kiện tóc hoa anh đào" },
    { icon: "🎋", name: "Áo kimono nghi lễ" },
    { icon: "🩱", name: "Đai obi bọc giáp" },
    { icon: "🧤", name: "Găng tay chiến đấu hở ngón" },
    { icon: "👟", name: "Tất tabi & dép gỗ" },
  ],
};

const CHAR_DESCRIPTIONS: Record<string, string> = {
  Cyrene: "Nữ phù thủy bí ẩn sử dụng phép thuật hắc ám với vẻ đẹp u tối quyến rũ.",
  Herta: "Thiên tài điều khiển rối với trí tuệ lạnh lùng và sự dí dỏm u tối.",
  Kiana: "Người thừa kế sức mạnh cổ đại, chiến binh ánh sáng và thánh hỏa.",
  Seele: "Bướm ảo ảnh trôi dạt giữa sự sống và thế giới khác.",
  Hanabi: "Nữ ninja lửa, nhảy múa giữa cánh hoa và tàn tro.",
};

interface CharactersClientProps {
  characters: CharacterListItem[];
}

export default function CharactersClient({
  characters,
}: CharactersClientProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Mặc định");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeOpen, setSizeOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const sortOptions = ["Mặc định", "Giá tăng dần", "Giá giảm dần", "Tên A–Z"];

  const filtered = characters
    .filter((c) => {
      const matchName = c.name.toLowerCase().includes(query.toLowerCase());
      const matchFilter =
        activeFilter === "Tất cả" ||
        statusMeta[c.status]?.label === activeFilter;
      return matchName && matchFilter;
    })
    .sort((a, b) => {
      if (sortBy === "Giá tăng dần") return a.rental_price - b.rental_price;
      if (sortBy === "Giá giảm dần") return b.rental_price - a.rental_price;
      if (sortBy === "Tên A–Z") return a.name.localeCompare(b.name);
      return 0;
    });

  const selectedChar = selectedId
    ? characters.find((c) => c.id === selectedId)
    : null;

  const handleRent = () => {
    if (selectedChar) {
      addItem(selectedChar, selectedSize || "M");
      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0820] text-white">
      {/* ── PAGE HERO ── */}
      <div className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 text-xs mb-4"
        >
          <Sparkles size={11} /> Bộ sưu tập trang phục
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55 }}
          className="text-white mb-3"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
          }}
        >
          Nhân vật Cosplay
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.5 }}
          className="text-white/45 text-sm max-w-md mx-auto"
        >
          Khám phá {characters.length} bộ trang phục cao cấp, hóa thân vào
          nhân vật yêu thích.
        </motion.p>
      </div>

      {/* ── FILTERS & SEARCH ── */}
      <div className="sticky top-14 sm:top-16 z-40 bg-[#0c0820]/90 backdrop-blur-md border-b border-white/8 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-full sm:max-w-xs">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tên..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/6 border border-white/12 text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-2 flex-wrap overflow-x-auto pb-1 sm:pb-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all duration-150 ${
                  activeFilter === f
                    ? "bg-violet-600 text-white border border-violet-500"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/12 text-white/60 hover:text-white/90 hover:bg-white/10 transition-all text-xs"
            >
              <SlidersHorizontal size={13} />
              <span className="hidden sm:inline">{sortBy}</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1.5 w-44 bg-[#1a1035] border border-white/12 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                        sortBy === opt
                          ? "text-violet-300 bg-violet-500/10"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-2">
          <p className="text-white/30 text-xs">
            Hiển thị {filtered.length}/{characters.length} nhân vật
          </p>
        </div>
      </div>

      {/* ── CARDS GRID ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <Search size={36} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">Không tìm thấy nhân vật phù hợp</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5"
          >
            {filtered.map((char, i) => {
              const sm = statusMeta[char.status];
              return (
                <motion.div
                  key={char.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className="group"
                >
                  <motion.div
                    onClick={() => setSelectedId(char.id)}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#1a1035] hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/50 transition-all duration-300"
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: "clamp(160px, 25vw, 220px)" }}
                    >
                      <Image
                        src={char.image_url || "/images/cyrene.jpg"}
                        alt={char.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1035] via-transparent to-transparent opacity-80" />
                      {sm && (
                        <div
                          className={`absolute top-2 sm:top-2.5 left-2 sm:left-2.5 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] border ${sm.bg} ${sm.color}`}
                        >
                          <span
                            className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${sm.dot}`}
                          />
                          {sm.label}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="px-3 sm:px-4 pt-2 sm:pt-3 pb-3 sm:pb-4">
                      <h3
                        className="text-white/90 mb-1 text-sm sm:text-base"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {char.name}
                      </h3>
                      <div className="flex items-center gap-0.5 mb-2">
                        {Array.from({ length: 5 }, (_, j) => (
                          <Star
                            key={j}
                            size={8}
                            className="text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-violet-300 text-xs sm:text-sm">
                          {formatPrice(char.rental_price)}
                          <span className="text-white/30 text-[10px] sm:text-xs">
                            /ngày
                          </span>
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-600/70 text-white text-[10px] sm:text-[11px]">
                          Xem <ArrowRight size={9} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>

      {/* ── CHARACTER DETAIL OVERLAY ── */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            style={{ background: "#0c0820" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Layout */}
            <div className="flex flex-col md:flex-row w-full h-full pt-14 sm:pt-16">
              {/* LEFT — Image (hidden on small mobile, shown on sm+) */}
              <div className="relative w-full md:w-[44%] h-48 sm:h-64 md:h-full flex-shrink-0 overflow-hidden">
                <Image
                  src={selectedChar.image_url || "/images/cyrene.jpg"}
                  alt={selectedChar.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c0820] hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0820] md:opacity-60" />

                {/* Back button */}
                <motion.button
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  onClick={() => {
                    setSelectedId(null);
                    setSelectedSize("");
                    setAdded(false);
                  }}
                  className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 hover:text-white hover:bg-black/60 transition-all text-xs"
                >
                  <ArrowLeft size={13} />
                  Quay lại
                </motion.button>
              </div>

              {/* RIGHT — Detail panel */}
              <div className="flex-1 overflow-y-auto flex flex-col justify-start md:justify-center px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 relative">
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none hidden md:block"
                  style={{ background: selectedChar.accent_color }}
                />

                {/* Status */}
                {statusMeta[selectedChar.status] && (
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border mb-4 w-fit ${
                      statusMeta[selectedChar.status].bg
                    } ${statusMeta[selectedChar.status].color}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusMeta[selectedChar.status].dot}`}
                    />
                    {statusMeta[selectedChar.status].label}
                  </div>
                )}

                {/* Name */}
                <h1
                  className="text-white leading-none mb-3"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 4.5rem)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {selectedChar.name}
                </h1>

                {/* Stars + price */}
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, j) => (
                      <Star
                        key={j}
                        size={13}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                    <span className="text-white/35 text-xs ml-1.5">
                      ({selectedChar.review_count} đánh giá)
                    </span>
                  </div>
                  <span className="text-white/20">·</span>
                  <span
                    className="text-violet-300"
                    style={{
                      fontSize: "1.1rem",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {formatPrice(selectedChar.rental_price)}
                    <span className="text-white/35 text-sm ml-1">/ngày</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/50 text-sm mb-6 sm:mb-7 max-w-sm leading-relaxed">
                  {CHAR_DESCRIPTIONS[selectedChar.name] ||
                    "Trang phục cosplay cao cấp với đầy đủ phụ kiện."}
                </p>

                {/* Size selector */}
                <div className="mb-5 sm:mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="text-white/80 text-xs uppercase tracking-widest">
                      Chọn size
                    </h3>
                    <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                      <ExternalLink size={11} /> Bảng size
                    </button>
                  </div>
                  <div className="relative max-w-xs">
                    <button
                      onClick={() => setSizeOpen(!sizeOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-sm text-white/70 hover:border-violet-500/50 hover:bg-white/8 transition-all"
                    >
                      <span>
                        {selectedSize || "Chọn size (S, M, L, XL)"}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 text-white/40 ${
                          sizeOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {sizeOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full mt-1.5 left-0 right-0 bg-[#1a1035] border border-white/12 rounded-xl overflow-hidden shadow-2xl z-20"
                        >
                          {["S", "M", "L", "XL"].map((size) => (
                            <button
                              key={size}
                              onClick={() => {
                                setSelectedSize(size);
                                setSizeOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                selectedSize === size
                                  ? "text-violet-300 bg-violet-500/10"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Rent button */}
                <div className="mb-6 sm:mb-8">
                  <motion.button
                    onClick={handleRent}
                    disabled={selectedChar.status === "Out of Stock"}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center justify-between w-full max-w-xs px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-white text-sm transition-all duration-200 shadow-lg ${
                      selectedChar.status === "Out of Stock"
                        ? "bg-white/10 cursor-not-allowed text-white/40"
                        : added
                        ? "bg-emerald-600 shadow-emerald-900/40"
                        : "bg-violet-600 hover:bg-violet-500 shadow-violet-900/40 hover:shadow-violet-900/60"
                    }`}
                  >
                    <span>
                      {added
                        ? "Đã thêm vào giỏ!"
                        : selectedChar.status === "Out of Stock"
                        ? "Hết hàng"
                        : "Thuê ngay"}
                    </span>
                    <span className="flex items-center gap-2">
                      <span>
                        {formatPrice(selectedChar.rental_price)}/ngày
                      </span>
                      {added ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <ShoppingCart size={17} />
                      )}
                    </span>
                  </motion.button>
                </div>

                <div className="border-t border-white/8 mb-5 sm:mb-6" />

                {/* Components */}
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-white/80 text-xs uppercase tracking-widest mb-3">
                    Bao gồm
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      CHAR_COMPONENTS[selectedChar.name] || []
                    ).map((comp, ci) => (
                      <div
                        key={ci}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/4 border border-white/8"
                      >
                        <span className="text-base leading-none">
                          {comp.icon}
                        </span>
                        <span className="text-white/60 text-xs leading-snug">
                          {comp.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick info */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Giao hàng tận nơi",
                    "Vệ sinh trước khi giao",
                    "Hỗ trợ 24/7",
                    "Hoàn tiền 100%",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-violet-500/8 border border-violet-500/20 text-violet-300/80 text-[10px] sm:text-[11px]"
                    >
                      <CheckCircle2
                        size={10}
                        className="text-violet-400"
                      />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
