import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.collection("users").doc(userId).get();
  const customerId = user.data()?.customerId;

  if (!customerId) return NextResponse.json({ error: "Customer not found" }, { status: 404 });

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.get("origin")}`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
