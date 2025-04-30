"use client";

import { Footer } from "@/components/Footer";
import CardProducts from "@/components/CardProducts";
import { ProductType } from "@/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "@/components/SearchBar";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const response = await fetch(`/api/products?page=${page}&search=${search}`);
    const data: ProductType[] = await response.json();

    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    setProducts((prev) => {
      const newProducts = [...prev, ...data];

      const uniqueProducts = newProducts.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p._id === product._id)
      );

      return uniqueProducts;
    });
    setPage((prev) => prev + 1);
  };

  const handleSearch = (value: string) => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setSearch(value);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-center text-black mb-10">
          Products
        </h1>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={hasMore}
          loader={<h4 className="text-center my-4">Loading...</h4>}
          endMessage={
            <p className="text-center text-gray-500 mt-6">
              <b>No more products</b>
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <CardProducts key={product._id} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
}
