"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ProductType } from "../../types/components/ProductType";

function SideBar({ cartItems }: { cartItems: ProductType[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const noItems = cartItems?.length === 0;
  const totalItems = cartItems?.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );
  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const placeOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity || 1,
      }));

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: orderItems }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      console.log("Order success:", data);
      setOrderSuccess(true);
    } catch (error) {
      console.error("Order failed:", error);
      setOrderSuccess(false);
      setError(
        error instanceof Error ? error.message : "Failed to place order"
      );
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };
  return (
    <div className="bg-white">
      <p>{`Your Cart (${totalItems || 0})`}</p>
      {!cartItems && (
        <Image
          src={"/images/empty_cart.png"}
          alt="Image of a cake to symbolise an empty cart."
          width={100}
          height={100}
          className="w-auto h-auto"
        />
      )}
      {noItems && <p>Your added items will appear here</p>}
      {!noItems && (
        <>
          <ul>
            {cartItems.map((product) => {
              const { image, name, price, id } = product || {};
              return (
                <li key={id}>
                  <Image
                    src={image?.desktop}
                    alt={name}
                    width={100}
                    height={100}
                    className="w-auto h-auto"
                  />
                  <p>{name}</p>
                  <p>{price}</p>
                </li>
              );
            })}
          </ul>
          <p>Order Total: {totalPrice}</p>
          <button
            onClick={placeOrder}
            disabled={isLoading || noItems}
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                {orderSuccess ? (
                  <h3 className="text-lg font-semibold text-green-600">
                    Order Placed Successfully!
                  </h3>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-red-600">
                      Order Failed
                    </h3>
                    <p className="text-gray-600">{error}</p>
                  </>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SideBar;
