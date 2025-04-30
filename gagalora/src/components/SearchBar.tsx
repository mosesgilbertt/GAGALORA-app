"use client";

import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="px-4 py-2 border rounded-l-md w-64 text-black"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-white hover:text-black hover:border hover:border-black"
      >
        Search
      </button>
    </form>
  );
}
