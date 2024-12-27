import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Cart from "@/components/pages/account/CartPage";

export default async function CartPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");
  return <Cart />;
}
