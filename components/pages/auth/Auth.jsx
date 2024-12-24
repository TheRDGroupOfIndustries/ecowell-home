"use client";

import { useSession } from "next-auth/react";
import { useNotification } from "@/context/NotificationProvider";

const Auth = ({ children }) => {
  const { pt } = useNotification();
  const { data: session } = useSession();
  if (session) return router.replace("/");
  return (
    <>
      <div className={pt}>{children}</div>
    </>
  );
};

export default Auth;
