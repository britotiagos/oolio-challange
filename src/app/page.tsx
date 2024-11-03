"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  console.log("🚀  products:", products);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message || "Failed to fetch products");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error: {error}. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="w-full m-auto bg-fuchsia-400 max-w-[1440px] md:pt-[96px] md:px-[115px]">
        <section>
          <div className="grid grid-cols-[2fr_1fr]">
            <h1 className="font-semibold text-4xl">Desserts</h1>
            <h1 className="font-semibold text-4xl">Desserts</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
