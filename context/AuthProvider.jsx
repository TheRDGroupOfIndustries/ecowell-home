"use client";

import { getSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const AuthProvider = ({ children, session: initialSession }) => {
  const [currentSession, setCurrentSession] = useState(initialSession);

  useEffect(() => {
    let intervalId;

    const checkSession = async () => {
      if (!currentSession?.user?._id) {
        const updatedSession = await getSession();
        if (updatedSession?.user?._id) {
          setCurrentSession(updatedSession);
          clearInterval(intervalId); // stoping the interval once the session is updated
        }
      }
    };

    intervalId = setInterval(() => {
      checkSession();
    }, 1000);

    return () => clearInterval(intervalId);
    // if (!currentSession?.user?._id) checkSession();
  }, [currentSession, initialSession]);

  // console.log("Current Session:", currentSession);

  return (
    <SessionProvider session={currentSession?.user?._id && currentSession}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
