import { ProductType } from "./ProductType";

export type OrderSuccessType = {
  cartItems: ProductType[];
  handleCartRemove: (product: ProductType) => void;
  formattedFinalPrice: string;
  isPromoApplied: boolean;
  discount: number;
};
