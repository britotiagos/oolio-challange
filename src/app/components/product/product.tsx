import { ProductType } from "@/app/types/components/ProductType";
import Image from "next/image";

type ProductProps = {
  product: ProductType;
  handleCartAdd: (product: ProductType) => void;
  handleCartRemove: (product: ProductType) => void;
};

const Product = ({
  product,
  handleCartAdd,
  handleCartRemove,
}: ProductProps) => {
  const { image, name, category, price, id, quantity = 0 } = product || {};

  return (
    <div key={id}>
      <div>
        <Image
          src={image.desktop}
          alt={name}
          width={100}
          height={100}
          className="w-auto h-auto"
        />

        {!quantity && (
          <button onClick={() => handleCartAdd(product)}>Add to cart</button>
        )}
        {quantity > 0 && (
          <div>
            <button onClick={() => handleCartAdd(product)}>+</button>
            <span>{quantity}</span>
            <button onClick={() => handleCartRemove(product)}>-</button>
          </div>
        )}
      </div>
      <h2>{name}</h2>
      <p>{category}</p>
      <p>{price}</p>
    </div>
  );
};

export default Product;
