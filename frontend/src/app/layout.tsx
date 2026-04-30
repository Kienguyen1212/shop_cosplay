import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Hạ Thủy Cosplay | Cho thuê trang phục cosplay cao cấp",
  description:
    "Hạ Thủy Shop Cosplay - Chuyên cho thuê trang phục cosplay anime, game chất lượng cao tại TP.HCM. Giao hàng toàn quốc, giá hợp lý.",
  keywords: ["cosplay", "cho thuê trang phục", "anime", "game", "TP.HCM"],
  openGraph: {
    title: "Hạ Thủy Cosplay | Cho thuê trang phục cosplay cao cấp",
    description:
      "Sống trong nhân vật yêu thích - trang phục chất lượng cao, giá thuê hợp lý, giao hàng tận nơi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
