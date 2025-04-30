"use client"

import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const uri = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${uri}/api/login`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw data;
      }

      await Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Login success!",
      })

      window.location.href = "/";
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={input.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="email@example.com"
              className="mt-1 block w-full px-4 py-2 border-gray-500 rounded-lg text-sm shadow-sm placeholder-gray-400 text-black focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={input.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border-gray-500 rounded-lg text-sm shadow-sm placeholder-gray-400 text-black focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            className="w-full bg-black text-white py-2 rounded-lg border border-transparent hover:bg-white hover:text-black hover:border-black transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  )
}