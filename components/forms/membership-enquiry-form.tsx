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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// The old <select> options in contact-us.php were literal placeholders
// ("Membership Category 1", "State 1", ...) with no real values behind
// them. Replaced here with the real membership tiers (membership-types.php)
// and Sri Lankan provinces — the original "State" field was a leftover
// from the Australian template this theme was cloned from (see
// PROJECT-README.md). Confirm the exact category/province list with the client.
const membershipCategories = [
  "Professional Membership",
  "Startup and SME Membership",
  "Enterprise Membership",
] as const;

const provinces = [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa",
] as const;

const businessCategories = [
  "Startup",
  "SME",
  "Enterprise",
  "Individual / Professional",
  "Government",
  "Academia",
  "Other",
] as const;

const schema = z.object({
  membershipCategory: z.enum(membershipCategories, {
    message: "Please select a membership category",
  }),
  province: z.enum(provinces, { message: "Please select a province" }),
  businessCategory: z.enum(businessCategories, {
    message: "Please select a business category",
  }),
  contactName: z.string().min(1, "Contact name is required"),
  businessName: z.string().min(1, "Business name is required"),
  phone: z.string().min(1, "Phone is required"),
  businessUrl: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

// Thin #796753-outlined fields to match the contact section's
// tech-editorial styling.
const FIELD =
  "h-9 rounded-sm border-[#796753] bg-transparent text-white placeholder:text-white/45 focus-visible:border-white focus-visible:ring-0 dark:bg-transparent";
const SUBMIT =
  "rounded-sm bg-[#796753] px-5 text-[#050b1c] hover:bg-[#796753]/80";


export function MembershipEnquiryForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle"
  );
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      contactName: "",
      businessName: "",
      phone: "",
      businessUrl: "",
      email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "membership-enquiry", ...values }),
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
          name="membershipCategory"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={`w-full ${FIELD} data-placeholder:text-white/45 data-[size=default]:h-9`}>
                    <SelectValue placeholder="Membership Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {membershipCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={`w-full ${FIELD} data-placeholder:text-white/45 data-[size=default]:h-9`}>
                    <SelectValue placeholder="Province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessCategory"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={`w-full ${FIELD} data-placeholder:text-white/45 data-[size=default]:h-9`}>
                    <SelectValue placeholder="Business Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className={FIELD} placeholder="Contact Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className={FIELD} placeholder="Business Name" {...field} />
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
          name="businessUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className={FIELD} placeholder="Business URL" {...field} />
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

        <div className="pt-1">
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
