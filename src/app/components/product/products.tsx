"use client";
import { useEffect, useState } from "react";
import Product from "./product";
import { ProductType } from "../../types/components/ProductType";
import SideBar from "../SideBar/SideBar";

import { SkeletonCard } from "../Skeleton/SkeletonCard";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null as ProductType[] | null);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

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
        if (error instanceof Error) {
          setError(error.message || "Failed to fetch products");
        } else {
          setError("Failed to fetch products");
        }
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCartAdd = (product: ProductType) => {
    const newCartItems = [...cartItems];
    const productInCart = newCartItems.find((item) => item.id === product.id);

    if (productInCart) {
      const updatedItems = newCartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity ?? 0) + 1 }
          : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...newCartItems, { ...product, quantity: 1 }]);
    }
  };
  const handleCartRemove = (product: ProductType) => {
    const newCartItems = [...cartItems];
    const productInCart = newCartItems.find((item) => item.id === product.id);

    if (productInCart) {
      const updatedItems = newCartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity ?? 0) - 1 }
          : item
      );
      setCartItems(updatedItems.filter((item) => item.quantity !== 0));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[30px] p-3">
      <div className="grid gap-[39px]">
        <h1 className="font-semibold text-4xl text-title">Desserts</h1>

        <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-[22px]">
          {error && (
            <div>
              There was a error trying to load your desserts, please try again.
            </div>
          )}

          {loading && <SkeletonCard quantity={12} />}

          {!loading &&
            products?.map((product, index) => {
              const productInCart = cartItems.find(
                (item) => item.id === product.id
              );
              product.quantity = productInCart?.quantity ?? 0;

              return (
                <Product
                  product={product}
                  key={index}
                  handleCartAdd={handleCartAdd}
                  handleCartRemove={handleCartRemove}
                />
              );
            })}
        </div>
      </div>
      <SideBar cartItems={cartItems} handleCartRemove={handleCartRemove} />
    </div>
  );
}
