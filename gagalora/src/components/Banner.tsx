export default function Banner() {
  return (
    <div className="relative bg-gray-800 flex items-center">
      <img
        src="https://i.pinimg.com/736x/5c/25/80/5c2580d3b869d0bbd45e1ee5989a3fd8.jpg"
        alt="Banner"
        className="w-1/2 h-50 object-cover"
      />
      <div className="w-1/2 text-center text-white bg-black px-10 py-13 h-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-sans">
          Welcome to GAGALORA
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-mono">
          Semoga menyediakan barang-barang yang kamu cari...😅
        </p>
      </div>
    </div>
  )
}