import React from "react";
import { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ProfileInputProps = {
  label?: string;
  placeholder?: string;
  field: AnyFieldApi;
  type?: "text" | "email" | "password" | "tel";
};

export default function ProfileInput({
  label,
  placeholder,
  field,
  type,
}: ProfileInputProps) {
  const hasError =
    field.state.meta.isDirty && field.state.meta.errors.length > 0;
  return (
    <Field>
      <FieldLabel className="font-normal text-sm text-white">{label}</FieldLabel>
      <Input
        type={type}
        aria-label={label}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "capitalize font-medium placeholder:text-[#0C002F]/40 bg-[#F9F9F9] border-none h-12.5 focus-visible:bg-light-blue",
          hasError
            ? "focus-visible:border-error focus-visible:ring-error focus-visible:ring-1 focus-visible:border"
            : "focus-visible:ring-0 focus-visible:border-none",
        )}
      />
      {hasError && (
        <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
      )}
    </Field>
  );
}
