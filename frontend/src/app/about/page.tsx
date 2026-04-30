"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const rules = [
  {
    icon: CreditCard,
    color: "violet",
    title: "Đặt cọc & Thanh toán",
    items: [
      { type: "ok", text: "Đặt cọc 50% giá trị thuê khi xác nhận đơn hàng." },
      { type: "ok", text: "Thanh toán phần còn lại khi nhận trang phục." },
      { type: "ok", text: "Chấp nhận chuyển khoản, tiền mặt, Momo, ZaloPay." },
      { type: "warn", text: "Tiền cọc không hoàn lại nếu hủy trong 24h trước ngày nhận." },
      { type: "no", text: "Không nhận thanh toán sau khi đã trả trang phục." },
    ],
  },
  {
    icon: Clock,
    color: "blue",
    title: "Thời gian thuê & Trả hàng",
    items: [
      { type: "ok", text: "Thời gian thuê tối thiểu 1 ngày, tối đa 30 ngày/lần." },
      { type: "ok", text: "Trang phục được giao trước sự kiện tối thiểu 1 ngày." },
      { type: "ok", text: "Trả hàng trong vòng 24 giờ sau ngày kết thúc thuê." },
      { type: "warn", text: "Trả hàng trễ tính thêm phí 20% giá thuê/ngày." },
      { type: "no", text: "Không gia hạn khi đã có đơn đặt tiếp theo." },
    ],
  },
  {
    icon: Shield,
    color: "emerald",
    title: "Bảo quản trang phục",
    items: [
      { type: "ok", text: "Giữ trang phục sạch sẽ, tránh để dính mồ hôi quá lâu." },
      { type: "ok", text: "Bảo quản nơi khô ráo, thoáng mát." },
      { type: "ok", text: "Gấp gọn đúng cách theo hướng dẫn khi hoàn trả." },
      { type: "warn", text: "Tháo phụ kiện riêng và đóng gói cẩn thận trước khi trả." },
      { type: "no", text: "Tuyệt đối không tự sửa chữa, cắt may hay nhuộm màu." },
    ],
  },
  {
    icon: AlertTriangle,
    color: "amber",
    title: "Hư hỏng & Mất mát",
    items: [
      { type: "ok", text: "Kiểm tra kỹ trang phục khi nhận, phản ánh ngay nếu có lỗi." },
      { type: "ok", text: "Hư hỏng nhỏ do sử dụng bình thường sẽ không tính phí." },
      { type: "warn", text: "Hư hỏng nặng bồi thường 30–100% giá trị trang phục." },
      { type: "no", text: "Mất trang phục bồi thường 100% giá trị gốc." },
      { type: "no", text: "Không chấp nhận tự ý sửa chữa thay thế phụ kiện." },
    ],
  },
  {
    icon: Truck,
    color: "pink",
    title: "Vận chuyển & Giao nhận",
    items: [
      { type: "ok", text: "Giao hàng tận nơi trong nội thành TP.HCM (phí 30k–50k)." },
      { type: "ok", text: "Ship toàn quốc qua GHN, GHTK, J&T." },
      { type: "ok", text: "Đóng gói chuyên nghiệp, có túi nilon chống ẩm." },
      { type: "warn", text: "Khách chịu phí vận chuyển cả 2 chiều khi thuê online." },
      { type: "no", text: "Không chịu trách nhiệm hư hỏng do đơn vị vận chuyển." },
    ],
  },
  {
    icon: RotateCcw,
    color: "cyan",
    title: "Đổi trả & Hoàn tiền",
    items: [
      { type: "ok", text: "Đổi size miễn phí nếu thông báo trước 48h và còn hàng." },
      { type: "ok", text: "Hoàn tiền 100% nếu shop không giao được hàng đúng hẹn." },
      { type: "warn", text: "Hoàn 50% tiền cọc nếu hủy trước 48h so với ngày nhận." },
      { type: "no", text: "Không hoàn tiền sau khi đã nhận trang phục." },
      { type: "no", text: "Không chấp nhận đổi trả do thay đổi ý kiến." },
    ],
  },
];

const faqs = [
  {
    q: "Tôi có thể thuê bao nhiêu ngày?",
    a: "Thời gian thuê tối thiểu là 1 ngày, tối đa 30 ngày mỗi lần đặt. Nếu cần lâu hơn, bạn có thể gia hạn bằng cách liên hệ trực tiếp với shop.",
  },
  {
    q: "Tôi không biết size của mình, phải làm sao?",
    a: "Hạ Thủy có hỗ trợ tư vấn size miễn phí! Chỉ cần nhắn chiều cao, cân nặng và số đo 3 vòng, đội ngũ sẽ gợi ý size phù hợp nhất.",
  },
  {
    q: "Có thể mặc thử trước khi thuê không?",
    a: "Hoàn toàn có thể! Bạn có thể đến trực tiếp cửa hàng tại TP.HCM để mặc thử. Vui lòng đặt lịch trước qua Zalo/Facebook.",
  },
  {
    q: "Nếu trang phục bị bẩn sau khi sử dụng thì sao?",
    a: "Bụi bẩn nhẹ do sử dụng bình thường không tính phí thêm. Tuy nhiên các vết bẩn khó tẩy sẽ bị tính phí vệ sinh đặc biệt.",
  },
  {
    q: "Tôi có thể đặt thuê trước bao lâu?",
    a: "Bạn có thể đặt trước tối đa 3 tháng. Khuyến khích đặt ít nhất 1–2 tuần trước để đảm bảo có trang phục.",
  },
];

const typeStyle = {
  ok: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/8" },
  warn: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-400/8" },
  no: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/8" },
};

const cardColors: Record<string, { border: string; glow: string; badge: string }> = {
  violet: { border: "border-violet-500/30", glow: "hover:shadow-violet-900/30", badge: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
  blue: { border: "border-blue-500/30", glow: "hover:shadow-blue-900/30", badge: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
  emerald: { border: "border-emerald-500/30", glow: "hover:shadow-emerald-900/30", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  amber: { border: "border-amber-500/30", glow: "hover:shadow-amber-900/30", badge: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  pink: { border: "border-pink-500/30", glow: "hover:shadow-pink-900/30", badge: "bg-pink-500/15 text-pink-300 border-pink-500/30" },
  cyan: { border: "border-cyan-500/30", glow: "hover:shadow-cyan-900/30", badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" },
};

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0c0820] text-white">
      {/* ── HERO ── */}
      <section className="relative h-[40vh] sm:h-[52vh] min-h-[280px] sm:min-h-[340px] flex items-end pb-10 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/media/background/background.png" alt="About hero" fill className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0820]/40 via-[#0c0820]/50 to-[#0c0820]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/35 bg-violet-500/10 text-violet-300 text-xs mb-4"
          >
            <Sparkles size={11} /> Về chúng tôi
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="text-white leading-tight mb-3"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}
          >
            Hạ Thủy Shop Cosplay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-white/55 max-w-xl text-sm sm:text-base"
          >
            Chúng tôi mang niềm vui cosplay đến mọi người, minh bạch, uy tín và tận tâm từng chi tiết nhỏ nhất.
          </motion.p>
        </div>
      </section>

      {/* ── INTRO STATS ── */}
      <section className="bg-[#100c28] border-y border-white/5 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { num: "500+", label: "Trang phục" },
            { num: "3K+", label: "Khách hàng" },
            { num: "5★", label: "Đánh giá trung bình" },
            { num: "4+", label: "Năm kinh nghiệm" },
          ].map(({ num, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              <p className="text-violet-300 mb-1" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>{num}</p>
              <p className="text-white/45 text-xs">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── RULES ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="text-violet-400 text-xs uppercase tracking-widest mb-2">Quy định</p>
            <h2 className="text-white mb-3" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}>
              Điều khoản cho thuê
            </h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              Vui lòng đọc kỹ các quy định dưới đây trước khi đặt thuê.
            </p>
          </motion.div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 flex-wrap">
            {[
              { icon: CheckCircle2, color: "text-emerald-400", label: "Được phép" },
              { icon: AlertTriangle, color: "text-amber-400", label: "Lưu ý" },
              { icon: XCircle, color: "text-red-400", label: "Không được" },
            ].map(({ icon: Icon, color, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-white/45">
                <Icon size={13} className={color} /> {label}
              </div>
            ))}
          </div>

          {/* Rule cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {rules.map((rule, ri) => {
              const c = cardColors[rule.color];
              const Icon = rule.icon;
              return (
                <motion.div
                  key={ri}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ri * 0.07, duration: 0.5 }}
                  className={`rounded-2xl border bg-[#1a1035]/70 p-5 sm:p-6 shadow-lg transition-shadow duration-300 ${c.border} ${c.glow}`}
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-xl flex items-center justify-center border ${c.badge}`}>
                      <Icon size={16} />
                    </div>
                    <h3 className="text-white/90 text-sm sm:text-base" style={{ fontFamily: "var(--font-serif)" }}>
                      {rule.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {rule.items.map((item, ii) => {
                      const ts = typeStyle[item.type as keyof typeof typeStyle];
                      const ItemIcon = ts.icon;
                      return (
                        <li key={ii} className={`flex items-start gap-2.5 rounded-lg px-3 py-2 ${ts.bg}`}>
                          <ItemIcon size={14} className={`${ts.color} flex-shrink-0 mt-0.5`} />
                          <span className="text-white/70 text-xs leading-relaxed">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Commitment box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-6 sm:mt-8 rounded-2xl border border-violet-500/30 bg-violet-500/8 px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-3 sm:gap-4"
          >
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
              <Star size={15} className="text-violet-300 fill-violet-300" />
            </div>
            <div>
              <p className="text-violet-200 text-sm mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                Cam kết từ Hạ Thủy
              </p>
              <p className="text-white/50 text-xs leading-relaxed">
                Mọi trang phục đều được kiểm tra, vệ sinh và đóng gói kỹ càng. Nếu nhận được trang phục không đúng mô tả,
                chúng tôi sẽ hoàn tiền 100% hoặc đổi hàng miễn phí. Sự hài lòng của bạn là ưu tiên hàng đầu. 💜
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#100c28] border-t border-white/5 py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <p className="text-violet-400 text-xs uppercase tracking-widest mb-2">Giải đáp</p>
            <h2 className="text-white" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)" }}>
              Câu hỏi thường gặp
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="rounded-xl border border-white/10 bg-[#1a1035]/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 text-left hover:bg-white/3 transition-colors"
                >
                  <span className="text-white/85 text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={16} className="text-violet-400 flex-shrink-0" />
                    : <ChevronDown size={16} className="text-white/40 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="px-4 sm:px-5 pb-4 border-t border-white/5"
                  >
                    <p className="text-white/50 text-xs leading-relaxed pt-3">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-white mb-3" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)" }}>
            Sẵn sàng hóa thân?
          </h2>
          <p className="text-white/45 text-sm mb-6 sm:mb-8 max-w-sm mx-auto">
            Khám phá hàng trăm bộ trang phục cosplay đang chờ bạn.
          </p>
          <Link
            href="/characters"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-violet-900/40"
          >
            Xem trang phục ngay <ArrowRight size={15} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
