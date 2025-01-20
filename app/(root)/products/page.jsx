import Products from "@/components/pages/products/Products";

export default function ProductPage({ searchParams }) {
  const params = searchParams;

  return <Products category={params?.category} search={params?.search} />;
}
