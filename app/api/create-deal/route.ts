import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const dealId = "SL-" + uuidv4().slice(0, 8).toUpperCase();

    const { error } = await supabase.from("deals").insert([
      {
        deal_id: dealId,
        buyer_name: body.buyer_name,
        seller_name: body.seller_name,
        stone_details: body.stone_details,
        region: body.region,
        commission_percent: body.commission_percent,
        status: "requirement_received",
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      deal_id: dealId,
      message: "Deal created successfully under StoneLedger.",
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
