import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NotificationProvider } from "@/context/NotificationProvider";
import { CartProvider } from "@/context/CartProvider";

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  // if (!session) redirect("/auth/sign-in");
  return (
    <>
      <CartProvider>
        <NotificationProvider>
          <Navbar companyName="Ecowell" />
          {children}
          <Footer />
        </NotificationProvider>
      </CartProvider>
    </>
  );
}
