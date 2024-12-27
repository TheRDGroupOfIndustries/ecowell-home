import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import OrderSuccess from "@/components/pages/account/OrderSuccessPage";

export default async function OrderSuccessPage({ searchParams }) {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");

  const params = searchParams;
  return <OrderSuccess orderId={params.orderId} />;
}
