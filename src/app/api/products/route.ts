import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://orderfoodonline.deno.dev/api/product",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
