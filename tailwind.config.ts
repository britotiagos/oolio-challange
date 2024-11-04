import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "490px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        buttonBackground: "var(--button-background)",
        categoryColor: "var(--category-color)",
        productName: "var(--product-name)",
        productQuantity: "var(--product-quantity)",
        priceColor: "var(--price-color)",
        addCart: "var(--add-cart)",
        title: "var(--title)",
        cartTitle: "var(--cart-title)",
        noItems: "var(--no-items)",
        addItems: "var(--add-items)",
        sideBarItemName: "var(--sidebar-item-name)",
        itemsTimesPrice: "var(--items-times-price)",
        itemTotalPrice: "var(--item-total-price)",
        orderTotal: "var(--order-total)",
        orderTotalPrice: "var(--order-total-price)",
        carbonFreeBackground: "var(--carbon-free-background)",
        carbonFreeText: "var(--carbon-free-text)",
        carbonFreeSpan: "var(--carbon-free-span)",
        placeOrderBackground: "var(--place-order-background)",
        placeOrderText: "var(--place-order-text)",
        confirmationTitle: "var(--confirmation-title)",
        confirmationText: "var(--confirmation-text)",
        confirmationItemsBackground: "var(--confirmation-items-backgorund)",
        confirmationItemsPrice: "var(--confirmation-items-price)",
        confirmationItemsTotal: "var(--confirmation-items-total)",
      },
    },
  },
  plugins: [],
};
export default config;
