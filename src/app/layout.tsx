import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ProtectedRoutes from "@/components/auth/context/protected-routes";
import QueryContext from "@/components/context/query-context";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoSwachh",
  description:
    "EcoSwachh is a smart waste management platform empowering citizens to report garbage, verify collections, and earn eco-coins. Backed by AI and aligned with Swachh Bharat Abhiyan, EcoSwachh promotes a cleaner, greener, and smarter India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <ProtectedRoutes>
          <main>
            <QueryContext>
              {children}
              <Analytics />
              <Toaster position="bottom-right" reverseOrder={false} />
            </QueryContext>
          </main>
        </ProtectedRoutes>
      </body>
    </html>
  );
}
