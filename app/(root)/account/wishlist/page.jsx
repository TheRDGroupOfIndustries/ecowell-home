import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import WishlistPage from "@/components/pages/account/WishlistPage";

export default async function Page () {
  const session = await getServerSession();
    if (!session) redirect("/auth/sign-in");
  return <WishlistPage />;
};