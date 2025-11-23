"use client";
import { cn } from "@/lib/utils";
import { signupSchema } from "@/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
import { FormInput } from "./form";
import { Icons } from "../ui/icons";
import { authClient } from "@/lib/auth-client";
import router from "next/router";
import { toast } from "sonner";

type SignUpFormData = z.infer<typeof signupSchema>;
type SignUpFormProps = {
  className?: string;
};

export default function SignUpForm({ className }: SignUpFormProps) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (form: SignUpFormData) => {
    await authClient.signUp.email(
      {
        name: form.username,
        password: form.password,
        email: form.email,
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
          router.push("/");
        },
      },
    );
  };
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="-space-y-3">
            <Field>
              <Button variant="outline" type="button" className="w-full gap-2">
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

            <FormInput
              name="password"
              label="Password"
              control={form.control}
            />

            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              control={form.control}
            />
          </FieldGroup>

          <Button type="submit" size="lg" className="w-full font-semibold">
            Create account
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
