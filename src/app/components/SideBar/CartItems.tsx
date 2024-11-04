"use client";
import Image from "next/image";
import React from "react";

import { cartItemsType } from "@/app/types/components/CartItems";
import { cn } from "@/lib/utils";

function CartItems({
  cartItems,
  handleCartRemove,
  placeOrder,
  isLoading,
  setPromoCode,
  promoCode,
  formattedFinalPrice,
  handlePromoCode,
  isPromoApplied,
  discount,
  noItems,
}: cartItemsType) {
  return (
    <>
      <ul>
        {cartItems.map((product) => {
          const { name, price, id, quantity } = product || {};
          const formattedPrice = parseFloat(price.toString()).toFixed(2);
          const totalItemPrice = parseFloat(
            (price * (quantity || 1)).toString()
          ).toFixed(2);
          return (
            <li
              key={id}
              className="grid grid-cols-[1fr_auto] items-center border-b py-[20px]"
            >
              <div className="">
                <p className="text-[11px] font-semibold text-sideBarItemName">
                  {name}
                </p>
                <div className="grid grid-cols-[auto_1fr] gap-[15px] items-center mt-1">
                  <p className="text-itemsTimesPrice font-semibold text-[13px] flex flex-col">
                    {quantity}x
                  </p>
                  <div className="flex gap-[4px]">
                    <p className="text-[12px] font-bold text-itemTotalPrice">
                      @{formattedPrice}
                    </p>
                    <p className="text-[12px] font-bold text-itemTotalPrice">
                      ${totalItemPrice}
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src="/images/delete.png"
                alt="Delete icon"
                width={18}
                height={18}
                onClick={() => handleCartRemove(product)}
                className="w-[18px] h-[18px] cursor-pointer hover:opacity-70 transition-all"
              />
            </li>
          );
        })}
      </ul>
      <div className="grid grid-cols-[1fr_auto] py-[31px] items-center">
        <p className="text-orderTotal font-semibold text-[12px]">
          Order Total:
        </p>
        <p className="text-orderTotalPrice font-bold text-[21px]">
          ${formattedFinalPrice}
        </p>
      </div>
      <div className="mt-4 mb-6 flex flex-row md:flex-col items-center md:items-start gap-1">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-placeOrderBackground text-sideBarItemName"
        />
        <button
          onClick={handlePromoCode}
          className={cn(
            "mt-2 px-4 py-2 bg-placeOrderBackground text-placeOrderText rounded-md font-semibold",
            "hover:text-buttonBackground transition-all"
          )}
        >
          Apply Code
        </button>
        {isPromoApplied && (
          <p className="text-green-600 mt-2">
            Discount applied: ${discount.toFixed(2)}
          </p>
        )}
      </div>
      <div className="flex gap-[9px] py-[17px] items-center justify-center bg-carbonFreeBackground">
        <Image
          src={"/images/tree.png"}
          alt="Image of a tree"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
        <p className="font-semibold text-[12px] text-carbonFreeText">
          This is a{" "}
          <span className="font-semibold text-[13px] text-carbonFreeSpan">
            carbon-neutral
          </span>{" "}
          delivery
        </p>
      </div>
      <button
        onClick={placeOrder}
        disabled={isLoading || noItems}
        className="w-full bg-placeOrderBackground text-placeOrderText py-2 rounded-lg mt-4 font-semibold hover:text-buttonBackground transition-all"
      >
        {isLoading ? "Confirming Order..." : "Confirm Order"}
      </button>
    </>
  );
}

export default CartItems;
