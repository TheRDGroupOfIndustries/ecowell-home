"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/context/NotificationProvider";

const Auth = ({ children }) => {
  const { pt } = useNotification();
  const { data: session } = useSession();
  const router = useRouter();
  if (session) return router.replace("/");
  return <div className={pt}>{children}</div>;
};

export default Auth;
