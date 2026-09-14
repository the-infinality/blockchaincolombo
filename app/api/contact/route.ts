import { NextResponse } from "next/server";
import { z } from "zod";

// Neither contact-us.php form ever had a working `action`/submit handler in
// the legacy site (see PROJECT-README.md §3.4) — this is genuinely new,
// not a port. Validates and logs for now; wire `sendNotification` up to a
// real provider (Resend, SES, a CRM webhook, etc.) before going live.
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

  // TODO: replace with a real notification (e.g. Resend/SES email, CRM webhook).
  console.log("[contact] submission received:", parsed.data);

  return NextResponse.json({ ok: true });
}
