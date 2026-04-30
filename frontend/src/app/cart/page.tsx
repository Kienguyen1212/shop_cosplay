"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Trash2,
  ShoppingCart,
  ArrowRight,
  Package,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();

  const totalPerDay = items.reduce(
    (sum, item) => sum + item.character.rental_price,
    0
  );
  const depositAmount = Math.ceil(totalPerDay * 0.5);

  return (
    <div className="min-h-screen bg-[#0c0820] text-white">
      {/* Hero */}
      <div className="pt-24 sm:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 text-xs mb-4"
        >
          <Sparkles size={11} /> Giỏ hàng
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-white mb-3"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
          }}
        >
          Giỏ thuê của bạn
        </motion.h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 sm:py-20"
          >
            <Package size={48} className="mx-auto mb-4 text-white/20" />
            <p className="text-white/40 text-sm mb-6">
              Giỏ hàng của bạn đang trống
            </p>
            <Link
              href="/characters"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-900/40"
            >
              Khám phá trang phục <ArrowRight size={15} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/50 text-sm">
                  {items.length} trang phục
                </p>
                <button
                  onClick={clearCart}
                  className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
                >
                  Xóa tất cả
                </button>
              </div>

              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.character.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/10 bg-[#1a1035]/60"
                  >
                    <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.character.image_url || "/images/cyrene.jpg"
                        }
                        alt={item.character.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-white/90 text-sm sm:text-base truncate"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item.character.name}
                      </h3>
                      <p className="text-white/40 text-xs mt-0.5">
                        Size: {item.size}
                      </p>
                      <p className="text-violet-300 text-sm mt-1">
                        {formatPrice(item.character.rental_price)}/ngày
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.character.id)}
                      className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-[#1a1035]/60 p-5 sm:p-6 h-fit sticky top-20"
            >
              <h3
                className="text-white/90 mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                }}
              >
                Tóm tắt đơn hàng
              </h3>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Tổng/ngày</span>
                  <span className="text-white/80">
                    {formatPrice(totalPerDay)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Đặt cọc (50%)</span>
                  <span className="text-violet-300">
                    {formatPrice(depositAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Vận chuyển</span>
                  <span className="text-white/50">Tính sau</span>
                </div>
              </div>

              <div className="border-t border-white/8 pt-4 mb-5">
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm font-medium">
                    Cần thanh toán
                  </span>
                  <span
                    className="text-violet-300"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}
                  >
                    {formatPrice(depositAmount)}
                  </span>
                </div>
                <p className="text-white/30 text-[10px] mt-1">
                  * Thanh toán phần còn lại khi nhận hàng
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-900/40"
              >
                <ShoppingCart size={16} />
                Đặt thuê ngay
              </motion.button>

              <p className="text-white/25 text-[10px] text-center mt-3">
                Miễn phí đổi size trong 48h
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
