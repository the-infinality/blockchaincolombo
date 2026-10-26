"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof schema>;

const FIELD =
  "h-9 rounded-sm border-[#796753] bg-transparent text-white placeholder:text-white/45 focus-visible:border-white focus-visible:ring-0 dark:bg-transparent";
const SUBMIT =
  "rounded-sm bg-[#796753] px-5 text-[#050b1c] hover:bg-[#796753]/80";

export function GeneralEnquiryForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle"
  );
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "general-enquiry", ...values }),
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className={FIELD} placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className={FIELD} placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className={FIELD} type="email" placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className={`${FIELD} h-auto min-h-24`} placeholder="Message" rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" className={SUBMIT} disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Sending…" : "Submit"}
          </Button>
          {status === "success" && (
            <p className="mt-2 text-sm text-white">
              Thanks — we&rsquo;ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="mt-2 text-sm text-destructive">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
