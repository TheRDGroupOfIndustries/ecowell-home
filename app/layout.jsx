import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/context/AuthProvider";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ecowell",
  description: "EcoWell - Get yourself some protiens",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider session={session}>
          {children}
          <Toaster richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
