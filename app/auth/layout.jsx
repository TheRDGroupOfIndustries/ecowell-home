import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Auth from "@/components/pages/auth/Auth";

export default async function AuthLayout() {
  const session = await getServerSession();
  if (session) redirect("/");

  return <Auth>{children}</Auth>;
}
