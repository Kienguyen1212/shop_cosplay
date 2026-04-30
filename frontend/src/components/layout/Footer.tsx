"use client";

import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Play,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080516] border-t border-white/8 pt-12 sm:pt-14 pb-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={17} className="text-violet-400" />
              <span
                className="text-white/90"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                }}
              >
                Hạ Thủy Cosplay
              </span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed mb-5">
              Chuyên cho thuê trang phục cosplay cao cấp, mang nhân vật anime
              và game yêu thích của bạn đến đời thực.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Globe, label: "Facebook" },
                { icon: Camera, label: "Instagram" },
                { icon: Play, label: "Youtube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-violet-400 hover:border-violet-500/50 transition-all duration-150"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white/80 text-xs uppercase tracking-widest mb-4">
              Điều hướng
            </h4>
            <ul className="space-y-2.5">
              {[
                ["Trang chủ", "/"],
                ["Nhân vật", "/characters"],
                ["Về chúng tôi", "/about"],
                ["Liên hệ", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/45 hover:text-white/80 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/80 text-xs uppercase tracking-widest mb-4">
              Dịch vụ
            </h4>
            <ul className="space-y-2.5">
              {[
                "Cho thuê trang phục",
                "Tư vấn cosplay",
                "May đặt theo yêu cầu",
                "Giao hàng toàn quốc",
                "Hỗ trợ sự kiện",
              ].map((s) => (
                <li key={s}>
                  <span className="text-white/45 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/80 text-xs uppercase tracking-widest mb-4">
              Liên hệ
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/45 text-sm">
                <MapPin
                  size={14}
                  className="text-violet-400 flex-shrink-0 mt-0.5"
                />
                123 Đường Hoa Anh Đào, Quận 3, TP.HCM
              </li>
              <li className="flex items-center gap-2.5 text-white/45 text-sm">
                <Phone size={14} className="text-violet-400 flex-shrink-0" />
                0901 234 567
              </li>
              <li className="flex items-center gap-2.5 text-white/45 text-sm">
                <Mail size={14} className="text-violet-400 flex-shrink-0" />
                hathuy.cosplay@gmail.com
              </li>
            </ul>
            <div className="mt-5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs">
              🟢 Đang hoạt động · 8:00 – 22:00 hàng ngày
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © 2026 Hạ Thủy Shop Cosplay. Bảo lưu mọi quyền.
          </p>
          <div className="flex items-center gap-4">
            {["Chính sách bảo mật", "Điều khoản", "Cookie"].map((link) => (
              <button
                key={link}
                className="text-white/25 hover:text-white/50 text-xs transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
