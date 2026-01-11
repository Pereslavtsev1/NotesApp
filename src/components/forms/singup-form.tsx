"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { signupSchema } from "@/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldGroup, FieldSeparator } from "../ui/field";
import { Icons } from "../ui/icons";
import { FormInput, FormPasswordInput } from "./form";

type SignUpFormData = z.infer<typeof signupSchema>;

type SignUpFormProps = {
  className?: string;
};

export default function SignUpForm({ className }: SignUpFormProps) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    await authClient.signUp.email(
      {
        name: data.username,
        password: data.password,
        email: data.email,
        callbackURL: "/",
      },
      {
        onError: (error) => {
          console.error(error.error);
          toast.error(
            error.error.message || "Something went wrong. Please try again.",
          );
        },
        onSuccess: () => {
          redirect("/login");
        },
      },
    );
  };

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/notes",
    });
  };

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <Card
      className={cn(
        "mx-auto w-full max-w-sm bg-background border shadow-sm rounded-xl",
        className,
      )}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Create your account</CardTitle>
        <CardDescription className="font-semibold text-muted-foreground">
          Join us and start using Notes App
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          aria-busy={isSubmitting}
        >
          <FieldGroup className="-space-y-3">
            <Field>
              <Button
                variant="outline"
                type="button"
                className="w-full gap-2"
                disabled={isSubmitting}
                onClick={signInWithGoogle}
              >
                <Icons.google />
                Sign up with Google
              </Button>
            </Field>

            <FieldSeparator className="mt-4 font-medium *:data-[slot=field-separator-content]:bg-background">
              Or continue with
            </FieldSeparator>

            <FormInput
              name="username"
              label="Username"
              control={form.control}
              className="font-semibold"
            />

            <FormInput
              name="email"
              label="Email"
              control={form.control}
              className="font-semibold"
            />

            <FormPasswordInput
              name="password"
              label="Password"
              control={form.control}
            />

            <FormPasswordInput
              name="confirmPassword"
              label="Confirm Password"
              control={form.control}
            />
          </FieldGroup>

          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold underline underline-offset-2"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
