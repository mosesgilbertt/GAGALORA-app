import Link from "next/link";
import { ProductType } from "@/types";

interface FeaturedProductsProps {
  products: ProductType[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 9).map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2 font-bold">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/products">
          <button className="px-6 py-2 bg-black text-white rounded hover:bg-transparent hover:text-black hover:border hover:border-black transition">
            See All Products
          </button>
        </Link>
      </div>
    </div>
  );
}