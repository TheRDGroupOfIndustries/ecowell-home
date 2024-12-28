import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ProfilePage from "@/components/pages/account/ProfilePage";

export default async function AccountPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");
  return <ProfilePage />;
}
