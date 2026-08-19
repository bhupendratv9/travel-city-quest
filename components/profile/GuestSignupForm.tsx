"use client";

import React, {useEffect} from "react";
import { useForm } from "@tanstack/react-form";
import { imageSchema, nameSchema } from "@/schemas/common-schemsa";
import { z } from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import Image from "next/image";
import { domAnimation, LazyMotion, m } from "motion/react";
import ProfileInput from "@/components/profile/ProfileInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAvatarsQuery } from "@/hooks/queries/get-avatar-query";
import logo from "@/public/Logo.png";
import { useSignInMutation } from "@/hooks/mutations/sign-in-mutation";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { ProfileContentResponse } from "@/types/page-data-types";
import {useGetProfileQuery} from "@/hooks/queries/get-profile-query";

const profileValidationSchema = z.object({
  name: nameSchema,
  image: imageSchema.optional(),
  avatar: z.string().optional(),
});

type ProfileValidationSchema = z.infer<typeof profileValidationSchema>;

type Avatar = {
  id: number;
  image: string;
  name: string;
};

export default function GuestSignupForm() {
  const { data, isLoading } = useGetAvatarsQuery();
  const router = useRouter();

  const { data:profileDate, isLoading:profileLoading} = useGetProfileQuery();

  useEffect(() => {
    if (profileDate?.status && profileDate?.status < 400){
      router.push("/dashboard");
    }
  }, [profileDate, router]);

  if (isLoading || profileLoading)
    return (
      <div className="animate-pulse">
        <Image src={logo} alt="" width={100} height={100} />
      </div>
    );

  const avatars = data?.data?.slice(0, 3) as Avatar[];

  return <GuestSignupFormFields avatars={avatars} />;
}

function GuestSignupFormFields({ avatars }: { avatars: Avatar[] }) {
  const loginMutation = useSignInMutation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("from");

  const { data: pageContent } =
    useGetPageDataQuery<ProfileContentResponse>("signin_page");

  const form = useForm({
    defaultValues: {
      name: "",
      image: undefined,
      avatar: String(avatars[1]?.id) || "",
    } as ProfileValidationSchema,
    validators: {
      onMount: profileValidationSchema,
      onChange: profileValidationSchema,
    },
    onSubmit: ({ value }) => {
      const formData = new FormData();

      formData.append("type", "guest");
      formData.append("name", value.name);
      if (value.image) {
        formData.append("image", value.image);
      } else {
        formData.append("image", value.avatar as string);
      }

      loginMutation.mutate(formData, {
        onSuccess: async () => {

          const authPages = ["/sign-in", "/guest-signup"];
          if (
            redirectUrl &&
            (redirectUrl === "/leaderboard" ||
              redirectUrl === "/my-profile")
          ) {
            router.push(
              `${redirectUrl}?from=${encodeURIComponent(redirectUrl)}`
            );
          } else if (!authPages.includes(pathname)) {
            router.push(redirectUrl || pathname);
          } else if(redirectUrl) {
            router.push(redirectUrl as string);
          }else {
            router.push("/dashboard")
          }
          
          router.refresh();
        },
      });
    },
  });
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, mass: 1, damping: 20 }}
        className="squircle py-10 px-4 gradient-background shadow-lg w-full max-w-sm space-y-6"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <p className="text-white">
            {pageContent?.data?.signin?.profile?.message_2}
          </p>
          <form.Field name="avatar">
            {(field) => (
              <div className="flex gap-6 justify-center h-16">
                {avatars?.map((avatar: Avatar) => {
                  const selected =
                    String(field.state.value) === String(avatar.id);
                  return (
                    <label
                      key={avatar.id}
                      className={`rounded-full overflow-hidden size-16 relative cursor-pointer transition-shadow ${
                        selected ? "ring-2 ring-quest-yellow ring-offset-2" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={String(avatar.id)}
                        checked={selected}
                        onChange={() => field.handleChange(String(avatar.id))}
                        className="sr-only"
                      />
                      <Image
                        src={avatar.image as string}
                        alt={avatar.name}
                        height={200}
                        width={200}
                        className="object-cover size-16"
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </form.Field>
          <form.Field name="image">
            {(field) => {
              const previewUrl = field.state.value
                ? URL.createObjectURL(field.state.value as Blob)
                : null;
              return (
                <Field>
                  <div className="flex items-center gap-2 h-15">
                    {previewUrl && (
                      <div className="rounded-full overflow-hidden size-15 relative">
                        <Image
                          src={previewUrl}
                          alt=""
                          height={200}
                          width={200}
                          className="object-cover size-full"
                        />
                      </div>
                    )}
                    <FieldLabel htmlFor={field.name}>
                      <m.div
                        whileTap={{ y: 2, scale: 0.98 }}
                        className="border border-quest-yellow text-quest-yellow rounded-full py-2 px-4 w-max cursor-pointer"
                      >
                        {field.state.value
                          ? pageContent?.data?.signin?.profile?.button?.button_2
                          : pageContent?.data?.signin?.profile?.button
                              ?.button_1}
                      </m.div>
                    </FieldLabel>
                  </div>

                  <Input
                    name={field.name}
                    id={field.name}
                    aria-label="Profile Image Input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      field.handleChange(e.target.files?.[0] as File)
                    }
                  />
                  {field.state.meta.isDirty &&
                    field.state.meta.errors.length > 0 && (
                      <FieldError>
                        {field.state.meta.errors[0]?.message}
                      </FieldError>
                    )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="name">
            {(field) => {
              return (
                <ProfileInput
                  field={field}
                  placeholder={pageContent?.data?.signin?.profile?.placeholder}
                  type="text"
                  label={pageContent?.data?.signin?.profile?.label}
                />
              );
            }}
          </form.Field>

          <form.Subscribe
            selector={(state) => [
              state.isSubmitting,
              state.canSubmit,
              state.isDirty,
            ]}
          >
            {([isSubmitting, canSubmit, isDirty]) => {
              return (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!canSubmit || !isDirty}
                  className="w-full py-2 h-12.5 disabled:bg-[#D9D9D9] cursor-pointer disabled:text-black font-normal disabled:shadow-none"
                >
                  {isSubmitting || loginMutation.isPending ? pageContent?.data?.signin?.profile?.button?.button_4 : pageContent?.data?.signin?.profile?.button?.button_3}
                </Button>
              );
            }}
          </form.Subscribe>
        </form>
      </m.div>
    </LazyMotion>
  );
}
