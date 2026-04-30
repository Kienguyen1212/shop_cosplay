"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0820] text-white">
      {/* Hero */}
      <div className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 text-xs mb-4"
        >
          <Sparkles size={11} /> Liên hệ
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-white mb-3"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
        >
          Liên hệ với chúng tôi
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="text-white/45 text-sm max-w-md mx-auto"
        >
          Có câu hỏi? Hãy gửi tin nhắn, chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-4 sm:space-y-5"
          >
            {[
              { icon: MapPin, label: "Địa chỉ", value: "123 Đường Hoa Anh Đào, Quận 3, TP.HCM" },
              { icon: Phone, label: "Điện thoại", value: "0901 234 567" },
              { icon: Mail, label: "Email", value: "hathuy.cosplay@gmail.com" },
              { icon: Clock, label: "Giờ mở cửa", value: "8:00 – 22:00 hàng ngày" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/3">
                <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-0.5">{label}</p>
                  <p className="text-white/85 text-sm">{value}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden h-40 sm:h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={24} className="text-violet-400/50 mx-auto mb-2" />
                <p className="text-white/30 text-xs">Bản đồ Google Maps</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
              >
                <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
                <h3 className="text-white text-lg mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  Gửi thành công!
                </h3>
                <p className="text-white/50 text-sm">
                  Chúng tôi sẽ phản hồi sớm nhất có thể.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Họ tên *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1.5 block">Số điện thoại</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                    placeholder="0901 234 567"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1.5 block">Nội dung *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all resize-none"
                    placeholder="Tôi muốn thuê trang phục..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-900/40 disabled:opacity-50"
                >
                  {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                  <Send size={15} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
