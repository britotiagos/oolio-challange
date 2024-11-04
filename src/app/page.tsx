import Products from "./components/product/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="w-full m-auto  max-w-[1440px] xl:pt-[96px] xl:px-[115px] bg-foreground">
        <section>
          <Products />
        </section>
      </main>
    </div>
  );
}
