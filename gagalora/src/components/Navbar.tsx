import { cookies } from "next/headers";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";

export default async function Navbar() {
  const cookiesStore = await cookies();
  const authorization = cookiesStore.get("Authorization")?.value;

  return (
    <nav className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              G A G A L O R A
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 text-sm text-gray-300">
            <Link
              href="/"
              className="px-3 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="px-3 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Products
            </Link>
            <Link
              href="/wishlists"
              className="px-3 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Wishlist
            </Link>
          </div>

          <div className="flex space-x-3 font-sans font-semibold">
            {
              !authorization && (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-1 border border-white text-white rounded hover:bg-white hover:text-black transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-1 bg-white text-black rounded hover:bg-black hover:text-white hover:border hover:border-white transition"
                  >
                    Register
                  </Link>
                </>)
            }
            {
              authorization && (
                <ButtonLogout />
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}