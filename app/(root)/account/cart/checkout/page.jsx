import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Checkout from "@/components/pages/account/CheckoutPage";

export default async function CheckoutPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");

  return <Checkout />;
}
