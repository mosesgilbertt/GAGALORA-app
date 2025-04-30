"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface ButtonWishlistProps {
  productId: string;
}

interface WishlistItem {
  product: {
    _id: string;
  };
}

export default function ButtonWishlist({ productId }: ButtonWishlistProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkWishlist = async () => {
    try {
      const res = await fetch("/api/wishlists");
      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      const exists = data.some((item: WishlistItem) => item.product._id === productId);
      setIsInWishlist(exists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddWishlist = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/wishlists", {
        method: "POST",
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add to wishlist");
      }

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Product added to wishlist ❤️",
      });

      setIsInWishlist(true);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: (error as Error).message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkWishlist();
  }, []);

  return (
    <button
      onClick={handleAddWishlist}
      disabled={isInWishlist || loading}
      className={`mt-4 w-full py-2 rounded transition font-semibold ${isInWishlist
        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
        : "bg-black text-white hover:bg-transparent hover:text-black hover:border hover:border-black"
        }`}
    >
      {loading
        ? "Adding..."
        : isInWishlist
          ? "Already in Wishlist ❤️"
          : "Add to Wishlist ❤️"}
    </button>
  );
}
