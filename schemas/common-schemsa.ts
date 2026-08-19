import { z } from "zod";

export const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const MAX_FILE_SIZE = 1024 * 1024;

export const capitalizeName = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const nameSchema = z
  .string()
  .min(2, "Name is required")
  .regex(nameRegex, "Only letters allowed")
  .transform(capitalizeName);

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\d{7,15}$/, {
    message: "Phone number must contain 7–15 digits",
  });

export const otpSchema = z
  .string()
  .trim()
  .min(4, "OTP must be 4 digits")
  .max(4, "OTP must be 4 digits")
  .refine((val) => /^\d+$/.test(val), {
    message: "OTP can contain only numbers",
  });

export const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "Image size must be less than 1MB",
  )
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
        file.type,
      ),
    "Only JPG, JPEG, PNG, and WEBP images are allowed",
  );
