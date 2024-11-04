"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductType } from "../../types/components/ProductType";
import CartItems from "./CartItems";
import PaymentModal from "./PaymentModal";
import { SideBarType } from "@/app/types/components/SideBarType";

function SideBar({ cartItems, handleCartRemove }: SideBarType) {
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const getLowestPriceItem = (items: ProductType[]) => {
    return Math.min(...items.map((item) => item.price));
  };

  const handlePromoCode = () => {
    if (promoCode === "HAPPYHOURS") {
      const discountAmount = totalPrice * 0.18;
      setDiscount(discountAmount);

      setIsPromoApplied(true);
    } else if (promoCode === "BUYGETONE" && cartItems.length > 0) {
      const lowestPrice = getLowestPriceItem(cartItems);
      setDiscount(lowestPrice);

      setIsPromoApplied(true);
    } else {
      setDiscount(0);

      setIsPromoApplied(false);
    }
  };

  useEffect(() => {
    handlePromoCode();
  }, [cartItems, promoCode]);

  const noItems = cartItems?.length === 0;
  const totalItems = cartItems?.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );
  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const finalPrice = totalPrice - discount;
  const formattedFinalPrice = finalPrice.toFixed(2);

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
        body: JSON.stringify({ items: orderItems, couponCode: promoCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

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
    <div className="bg-white h-fit py-[26px] px-[23px]">
      <h2 className="text-cartTitle font-semibold text-lg">{`Your Cart (${
        totalItems || 0
      })`}</h2>
      {noItems && (
        <Image
          src={"/images/empty_cart.png"}
          alt="Image of a cake to symbolise an empty cart."
          width={121}
          height={102}
          priority
          className="w-[121px] h-[122px] rounded-lg overflow-hidden mt-8 mx-auto"
        />
      )}
      {noItems && (
        <p className="text-noItems font-semibold text-sm mx-auto flex justify-center mt-[28px]">
          Your added items will appear here
        </p>
      )}
      {!noItems && (
        <CartItems
          cartItems={cartItems}
          handleCartRemove={handleCartRemove}
          placeOrder={placeOrder}
          isLoading={isLoading}
          setPromoCode={setPromoCode}
          promoCode={promoCode}
          formattedFinalPrice={formattedFinalPrice}
          handlePromoCode={handlePromoCode}
          isPromoApplied={isPromoApplied}
          discount={discount}
          noItems={noItems}
        />
      )}
      {isModalOpen && (
        <PaymentModal
          cartItems={cartItems}
          handleCartRemove={handleCartRemove}
          setIsModalOpen={setIsModalOpen}
          error={error || ""}
          setOrderSuccess={setOrderSuccess}
          orderSuccess={orderSuccess}
          formattedFinalPrice={formattedFinalPrice}
          isPromoApplied={isPromoApplied}
          discount={discount}
        />
      )}
    </div>
  );
}

export default SideBar;
