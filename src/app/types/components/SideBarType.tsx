import { ProductType } from "./ProductType";

export type SideBarType = {
  cartItems: ProductType[];
  handleCartRemove: (product: ProductType) => void;
};
