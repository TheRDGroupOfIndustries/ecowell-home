"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

const AuthProvider = ({ children, session }) => {
  const [updSession, setUpdSession] = useState(session);
  useEffect(() => {
    console.log("Session:", session);

    setUpdSession(session);
    if (session?.user?._id) {
      () => {
        setUpdSession(session);
      };
    }
  }, [session]);

  return <SessionProvider session={updSession}>{children}</SessionProvider>;
};

export default AuthProvider;
