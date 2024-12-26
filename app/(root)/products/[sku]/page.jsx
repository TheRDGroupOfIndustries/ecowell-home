import { redirect } from "next/navigation";
import { headers } from "next/headers";
import ProductDetail from "@/components/pages/products/ProductDetail";

export default function ProductDetailPage({ params }) {
  if (!params.sku || params.sku === "undefined") {
    const headersList = headers();
    const referer = headersList.get("referer");
    redirect(referer || "/products");
  }

  return <ProductDetail productSku={params.sku} />;
}
