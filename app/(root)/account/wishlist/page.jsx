import React from "react";
import { WishlistProvider } from "@/context/WishlistContext";
import WishlistPage from "@/components/pages/account/WishlistPage";

const Page = () => {
  return (
    <WishlistProvider>
      <WishlistPage />
    </WishlistProvider>
  );
};

export default Page;