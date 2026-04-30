"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useCartStore } from "@/lib/store";

const NAV_ITEMS = [
  { label: "Trang chủ", path: "/" },
  { label: "Nhân vật", path: "/characters" },
  { label: "Về chúng tôi", path: "/about" },
  { label: "Liên hệ", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.length);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#0c0820]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <Sparkles size={18} className="text-violet-400 sm:w-5 sm:h-5" />
            <span
              className="text-white/95 tracking-wide text-sm sm:text-base"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)",
              }}
            >
              Hạ Thủy Cosplay
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, path }) => (
              <Link
                key={label}
                href={path}
                className={`text-sm transition-colors duration-150 ${
                  pathname === path
                    ? "text-violet-300"
                    : "text-white/55 hover:text-white/90"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/cart"
              className="relative text-white/60 hover:text-white transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-violet-500 rounded-full text-[9px] flex items-center justify-center font-medium">
                {cartCount}
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-14 right-0 bottom-0 z-40 w-64 bg-[#0c0820] border-l border-white/10 p-6 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ label, path }) => (
                  <Link
                    key={label}
                    href={path}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 px-4 rounded-xl text-sm transition-all ${
                      pathname === path
                        ? "text-violet-300 bg-violet-500/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
