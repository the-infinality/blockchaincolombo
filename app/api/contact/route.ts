import { NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  type: z.enum(["membership-enquiry", "general-enquiry"]),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.passthrough().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission" },
      { status: 400 }
    );
  }

  // Before going live: submissions are only logged to the server console.
  // Send them somewhere real (e.g. Resend or SES email, or a CRM webhook),
  // keeping any API keys in environment variables on the host.
  console.log("[contact] submission received:", parsed.data);

  return NextResponse.json({ ok: true });
}
