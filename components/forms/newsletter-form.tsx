"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

// Email-only "Stay in the loop" signup: a single outlined field with an
// attached arrow submit button. Replaces the dead newsletter/contact form
// in footer.php (no working action or name attributes in the original —
// see PROJECT-README.md §3.4).
export function NewsletterForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex border border-white">
                <FormControl>
                  <input
                    type="email"
                    placeholder="Your email address..."
                    aria-label="Email address"
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 font-mono text-xs text-white outline-none placeholder:text-white/50"
                    {...field}
                  />
                </FormControl>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  disabled={form.formState.isSubmitting}
                  className="flex w-10 shrink-0 items-center justify-center border-l border-white text-white transition-colors hover:bg-white hover:text-[#050b1c] disabled:opacity-50"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {status === "success" && (
          <p className="mt-2 font-mono text-xs text-white">Thanks — you&rsquo;re on the list.</p>
        )}
        {status === "error" && (
          <p className="mt-2 font-mono text-xs text-destructive">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </Form>
  );
}
