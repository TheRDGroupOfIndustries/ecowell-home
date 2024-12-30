"use client";

import { useNotification } from "@/context/NotificationProvider";
import { RxCross1 } from "react-icons/rx";

const Notification = () => {
  const { handleCloseNotification } = useNotification();
  return (
    <div className="w-full h-fit flex-between bg-primary-clr p-2 px-3 md:px-8 overflow-hidden">
      <div className="text-sm text-white font-bold">Welcome to the Ecowell</div>
      <RxCross1
        // onClick={() => signOut()}
        onClick={handleCloseNotification}
        title="Close Notification"
        color="white"
        className="cursor-pointer active:scale-90 ease-in-out duration-200"
      />
    </div>
  );
};

export default Notification;
