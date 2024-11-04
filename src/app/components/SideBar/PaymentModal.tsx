"use client";

import React from "react";
import OrderSuccess from "./OrderSucess";
import { PaymentModalType } from "@/app/types/components/PaymentModalType";
import { useLockBodyScroll } from "@uidotdev/usehooks";

function PaymentModal({
  cartItems,
  handleCartRemove,
  setIsModalOpen,
  error,
  setOrderSuccess,
  orderSuccess,
  formattedFinalPrice,
  isPromoApplied,
  discount,
}: PaymentModalType) {
  useLockBodyScroll();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white px-6 py-9 rounded-lg max-w-sm w-full">
        {orderSuccess && (
          <OrderSuccess
            cartItems={cartItems}
            handleCartRemove={handleCartRemove}
            formattedFinalPrice={formattedFinalPrice}
            isPromoApplied={isPromoApplied}
            discount={discount}
          />
        )}
        {!orderSuccess && (
          <>
            <h3 className="text-lg font-semibold text-red-600">Order Failed</h3>
            <p className="text-gray-600">{error}</p>
          </>
        )}

        <button
          onClick={() => {
            setIsModalOpen(false);
            setOrderSuccess(false);
            window.location.reload();
          }}
          className="w-full bg-placeOrderBackground text-placeOrderText py-4 rounded-full mt-4 font-semibold hover:text-buttonBackground transition-all"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
