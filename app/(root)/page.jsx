import Home from "@/components/pages/home/Home";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();
  return (
    // flex flex-col gap-8 row-start-2 items-center sm:items-start
    <main className="w-full">
      <Home session={session} />
    </main>
  );
}
