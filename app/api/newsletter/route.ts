import { NextResponse } from "next/server";
import { z } from "zod";

// The footer form in footer.php had no working submit handler either
// (Contact Form 7 was referenced in functions.php but never actually
// rendered — see PROJECT-README.md §3.4). New endpoint, not a port.
// Email-only signup (the footer's "Stay in the loop" field).
const payloadSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission" },
      { status: 400 }
    );
  }

  // TODO: replace with a real notification (e.g. Resend/SES email, CRM webhook).
  console.log("[newsletter] submission received:", parsed.data);

  return NextResponse.json({ ok: true });
}
