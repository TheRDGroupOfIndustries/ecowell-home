import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import MyOrders from "@/components/pages/account/MyOrdersPage";

export default async function OrderPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");

  return <MyOrders />;
}
