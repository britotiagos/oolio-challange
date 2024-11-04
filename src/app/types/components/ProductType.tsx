export type ProductType = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: {
    desktop: string;
    mobile: string;
  };
  quantity?: number;
};

export type ProductsType = {
  product: ProductType;
  handleCartAdd: (product: ProductType) => void;
  handleCartRemove: (product: ProductType) => void;
};
