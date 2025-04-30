import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";
import { ProductType } from "@/types";

export default async function Home() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const data = await fetch(`${url}/api/products`)
  const result: ProductType[] = await data.json()

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-center text-black">
          GAGALORA Products
        </h1>

        <FeaturedProducts products={result} />
      </div>
      <Footer />
    </div>
  );
}
