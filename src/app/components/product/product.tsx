import { ProductsType } from "@/app/types/components/ProductType";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Product = ({
  product,
  handleCartAdd,
  handleCartRemove,
}: ProductsType) => {
  const { image, name, category, price, id, quantity = 0 } = product || {};
  const formattedPrice = parseFloat(price.toString()).toFixed(2);

  return (
    <div key={id} className="group">
      <div className="relative">
        <div
          className={cn(
            "overflow-hidden",
            "rounded-lg border-2 border-transparent",
            "group-hover:border-addItems ",
            "[&_img]:duration-700 group-hover:[&_img]:scale-110",
            quantity && "border-addItems"
          )}
        >
          <Image
            src={image.desktop}
            alt={name}
            width={251}
            height={240}
            className={cn("w-full h-auto")}
          />
        </div>

        {!quantity && (
          <button
            onClick={() => handleCartAdd(product)}
            className={cn(
              "bg-buttonBackground px-[27px] py-[13px] grid grid-cols-[19px_1fr] gap-[9px] items-center rounded-full border border-border absolute -bottom-[22px] mx-auto left-1/2 transform -translate-x-1/2 whitespace-nowrap text-addCart font-semibold",
              "group-hover:text-addItems transition-all"
            )}
          >
            <Image
              src={"/images/cart.png"}
              alt={name}
              width={20}
              height={20}
              className="w-[19px] h-[18px]"
            />
            Add to cart
          </button>
        )}
        {quantity > 0 && (
          <div className="bg-addItems w-[160px] absolute -bottom-[22px] mx-auto left-1/2 transform -translate-x-1/2 rounded-full p-[13px] grid grid-cols-[18px_1fr_18px]">
            <button
              onClick={() => handleCartAdd(product)}
              className="hover:opacity-70 transition-all"
            >
              <Image
                src={"/images/plus.png"}
                alt={name}
                width={20}
                height={20}
                className="w-[19px] h-[18px]"
              />
            </button>
            <span className="text-center text-sm font-semibold text-productQuantity ">
              {quantity}
            </span>
            <button
              onClick={() => handleCartRemove(product)}
              className="hover:opacity-70 transition-all"
            >
              <Image
                src={"/images/minus.png"}
                alt={name}
                width={20}
                height={20}
                className="w-[19px] h-[18px]"
              />
            </button>
          </div>
        )}
      </div>
      <div className="py-[40px] flex flex-col gap-[6px]">
        <p className="font-semibold text-[12px] text-categoryColor">
          {category}
        </p>
        <h2 className="text-productName font-bold text-[14px]">{name}</h2>
        <p className="text-priceColor font-bold text-[13px] ">
          ${formattedPrice}
        </p>
      </div>
    </div>
  );
};

export default Product;
