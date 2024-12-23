"use client";

import React, { createContext, useContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);

  const handleCloseNotification = () =>
    setIsNotificationOpen(!isNotificationOpen);

  const pt = isNotificationOpen ? "pt-28" : "pt-20";

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
