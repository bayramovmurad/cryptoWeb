"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white p-6">
      <div className="max-w-lg w-full text-center p-8 rounded-[20px] border border-white/10 bg-[rgba(18,25,45,0.86)] backdrop-blur shadow-xl">
        {/* 404 */}
        <h1 className="text-6xl font-bold mb-4 bg-linear-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl mb-2">Page not found</h2>

        {/* Description */}
        <p className="text-[#b8c0d9] mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition">
          Go back home
        </Link>
      </div>
    </main>
  );
}
