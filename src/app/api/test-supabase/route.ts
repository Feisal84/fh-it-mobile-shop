import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price_cents")
    .limit(5);

  if (error) {
    console.error("Supabase Test Fehler:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, products: data });
}
