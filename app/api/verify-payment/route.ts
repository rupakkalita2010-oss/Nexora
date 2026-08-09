import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

   if (!isValid) {
  console.log("PAYMENT VERIFICATION FAILED");
  console.log("Order ID:", razorpay_order_id);
  console.log("Payment ID:", razorpay_payment_id);
  console.log("Received signature:", razorpay_signature);
  console.log("Expected signature:", expectedSignature);

  return NextResponse.json(
    {
      success: false,
      reason: "Signature mismatch",
    },
    { status: 400 }
  );
}

    return NextResponse.json({
  success: true,
  verified: isValid,
});
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
} 