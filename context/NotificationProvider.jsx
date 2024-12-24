"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const [pt, setPt] = useState("pt-28");

  const handleCloseNotification = () => setIsNotificationOpen(false);

  useEffect(() => {
    setPt(isNotificationOpen ? "pt-28" : "pt-20");
  }, [isNotificationOpen]);

  return (
    <NotificationContext.Provider
      value={{ pt, isNotificationOpen, handleCloseNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
