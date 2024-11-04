import { ProductType } from "./ProductType";

export type PaymentModalType = {
  cartItems: ProductType[];
  handleCartRemove: (product: ProductType) => void;
  setIsModalOpen: (value: boolean) => void;
  error: string;
  setOrderSuccess: (value: boolean) => void;
  orderSuccess: boolean;
  formattedFinalPrice: string;
  isPromoApplied: boolean;
  discount: number;
};
