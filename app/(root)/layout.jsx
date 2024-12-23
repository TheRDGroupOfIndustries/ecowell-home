import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar companyName="Ecowell" />
      {children}
      <Footer />
    </>
  );
}
