"use client";

import { ProductType } from "@/types";
import Link from "next/link";
import ButtonWishlist from "@/components/ButtonWishlist";

interface CardProductsProps {
  product: ProductType
}

export default function CardProducts({ product }: CardProductsProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col">
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h2>

        <p className="text-gray-600 mt-2 font-bold">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <div className="mt-auto">
          <ButtonWishlist productId={product._id} />
        </div>
      </div>
    </div>
  );
}