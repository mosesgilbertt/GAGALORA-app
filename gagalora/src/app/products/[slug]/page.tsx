import { ProductType } from "@/types";
import { Footer } from "@/components/Footer";
import ButtonWishlist from "@/components/ButtonWishlist";
import type { Metadata } from "next";
import ProductSlider from "@/components/ProductSlider";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${url}/api/products/${slug}`);
  const product: ProductType = await res.json();

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [...product.images],
    },
  };
}

export default async function DetailProduct({
  params,
}: Props) {
  const { slug } = await params;

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${url}/api/products/${slug}`);
  const product: ProductType = await res.json();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow py-20">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductSlider images={product.images} />

            <div className="p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <p className="text-gray-700 mb-6">{product.description}</p>
              </div>
              <ButtonWishlist productId={product._id} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}