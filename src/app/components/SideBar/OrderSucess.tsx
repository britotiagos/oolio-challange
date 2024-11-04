"use client";
import Image from "next/image";
import React from "react";
import { OrderSuccessType } from "@/app/types/components/OrderSuccessType";

function OrderSuccess({
  cartItems,
  handleCartRemove,
  formattedFinalPrice,
  isPromoApplied,
  discount,
}: OrderSuccessType) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="green"
        className="size-[50px] color"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <h3 className="text-[41px] font-semibold text-confirmationTitle mt-4 leading-[1.25] ">
        Order Confirmed
      </h3>
      <p className="text-[15px] text-confirmationText mt-2">
        We hope you enjoy your food!
      </p>
      <div className="bg-confirmationItemsBackground px-[25px] rounded-md mt-[30px]">
        {cartItems.map((product) => {
          const { name, price, id, quantity, image } = product || {};
          const formattedPrice = parseFloat(price.toString()).toFixed(2);
          const totalItemPrice = parseFloat(
            (price * (quantity || 1)).toString()
          ).toFixed(2);
          return (
            <div
              key={id}
              className="grid grid-cols-[auto_1fr] gap-4 items-center border-b py-[18px]"
            >
              <Image
                src={image.desktop}
                alt="Delete icon"
                width={48}
                height={49}
                onClick={() => handleCartRemove(product)}
                className="w-[48px] h-[49px] cursor-pointer"
              />
              <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                <div>
                  <p className="text-[11px] font-bold text-sideBarItemName">
                    {name}
                  </p>
                  <div className="grid grid-cols-[auto_1fr] gap-[15px] items-center mt-2">
                    <p className="text-itemsTimesPrice font-semibold text-[13px] flex flex-col">
                      {quantity}x
                    </p>
                    <div className="flex gap-[4px]">
                      <p className="text-sm font-bold text-itemTotalPrice text-[11px]">
                        @${formattedPrice}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[14px] font-bold text-confirmationItemsPrice">
                  ${totalItemPrice}
                </p>
              </div>
            </div>
          );
        })}
        {isPromoApplied && (
          <p className="text-green-600 mt-2">
            Discount applied: ${discount.toFixed(2)}
          </p>
        )}
        <div className="grid grid-cols-[1fr_auto] py-[31px] items-center">
          <p className="text-orderTotal font-semibold text-[12px]">
            Order Total:
          </p>
          <p className="text-orderTotalPrice font-bold text-[21px]">
            ${formattedFinalPrice}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
