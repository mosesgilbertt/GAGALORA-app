import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">G A G A L O R A</h3>
            <p className="text-gray-400">
              GAGALORA adalah platform e-commerce yang menyediakan berbagai produk berkualitas dengan harga terbaik. Kami berkomitmen untuk memberikan pengalaman belanja online yang mudah, aman, dan menyenangkan.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Service</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/wishlists" className="hover:text-white transition">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: support@gagalora.com
            </p>
            <p className="text-gray-400">
              Telepon: +62 812-3456-7890
            </p>
            <p className="text-gray-400">
              Alamat: Jl. I Aja Dulu Bwannkk, Jalan-jalan, Bumi
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} GAGALORA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
