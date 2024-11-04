import { ProductType } from "./ProductType";

export type cartItemsType = {
  cartItems: ProductType[];
  handleCartRemove: (product: ProductType) => void;
  placeOrder: () => void;
  isLoading: boolean;
  setPromoCode: (value: string) => void;
  promoCode: string;
  formattedFinalPrice: string;
  handlePromoCode: () => void;
  isPromoApplied: boolean;
  discount: number;
  noItems: boolean;
};
