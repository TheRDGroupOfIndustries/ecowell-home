"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const AuthProvider = ({ children, session }) => {
  const [updSession, setUpdSession] = useState(session);
  useEffect(() => {
    console.log("\nSession:", session);

    setUpdSession(session);
    if (session?.user?._id) {
      console.log("\nsession?.user?._id:", session?.user?._id);

      () => {
        setUpdSession(session);
      };
    }
  }, [session]);

  return <SessionProvider session={updSession}>{children}</SessionProvider>;
};

export default AuthProvider;
