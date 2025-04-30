"use client"

import Link from "next/link";
import { Footer } from "@/components/Footer";
import ButtonRemoveWishlist from "@/components/ButtonRemoveWishlist";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ProductType } from "@/types";
import Image from "next/image";

interface WishlistType {
  _id: string;
  product: ProductType;
}

export default function WishlistPage() {
  const [wishlists, setWishlists] = useState<WishlistType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlists = async () => {
    try {
      const res = await fetch("/api/wishlists");
      const data = await res.json();
      if (!res.ok) {
        throw data
      };

      setWishlists(data)
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: (error as Error).message || "Something went wrong!",
      })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWishlists();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-center text-black mb-10">
          My Wishlist
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : wishlists.length === 0 ? (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map((wishlist) => (
              <div
                key={wishlist._id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                <Link href={`/products/${wishlist.product?.slug || ''}`}>
                  <div className="relative w-full h-65">
                    {wishlist.product?.thumbnail ? (
                      <Image
                        src={wishlist.product.thumbnail}
                        alt={wishlist.product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span>Image not available</span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {wishlist.product?.name || 'Unknown Product'}
                  </h2>
                  <p className="text-gray-600 font-bold mb-4">
                    Rp {wishlist.product?.price.toLocaleString("id-ID") || 'N/A'}
                  </p>

                  <ButtonRemoveWishlist wishlistId={wishlist._id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}