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
