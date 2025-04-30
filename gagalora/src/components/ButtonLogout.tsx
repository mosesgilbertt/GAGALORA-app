"use client";

import { handleLogout } from "@/action";

export default function ButtonLogout() {
  return (
    <button
      onClick={async () => {
        handleLogout();
      }}
      className="px-4 py-1 bg-red-500 text-white border-red-500 rounded hover:bg-black hover:text-red-500 hover:border hover:border-red transition"
    >
      Logout
    </button>
  )
}