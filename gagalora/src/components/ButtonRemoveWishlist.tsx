"use client";

import { useState } from "react";
import Swal from "sweetalert2";

interface ButtonRemoveWishlistProps {
  wishlistId: string;
}

const ButtonRemoveWishlist: React.FC<ButtonRemoveWishlistProps> = ({ wishlistId }) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    try {
      await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/wishlists?id=${wishlistId}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (!res.ok) {
            throw data
          }
          await Swal.fire("Removed!", "Your wishlist has been removed.", "success");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: (error as Error).message || "Something went wrong!",
      })
    } finally {
      setLoading(false);
    };
  };

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      className="mt-auto bg-red-500 text-white px-4 py-2 border-red-500 font-semibold rounded hover:border hover:bg-white hover:text-red-500 transition"
    >
      {loading ? "Removing..." : "Remove from Wishlist"}
    </button>
  );
};

export default ButtonRemoveWishlist;