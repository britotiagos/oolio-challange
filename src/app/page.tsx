import Products from "./components/product/products";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="w-full m-auto bg-fuchsia-400 max-w-[1440px] md:pt-[96px] md:px-[115px]">
        <section>
          <Products />
        </section>
      </main>
    </div>
  );
}
