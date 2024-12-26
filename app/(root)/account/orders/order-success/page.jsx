import OrderSuccess from "@/components/pages/account/OrderSuccessPage";
import React from "react";

export default function OrderSuccessPage({ searchParams }) {
  const params = searchParams;
  return <OrderSuccess orderId={params.orderId} />;
}
