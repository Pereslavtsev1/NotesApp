"use client";
import { cn } from "@/lib/utils";
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
import { loginSchema } from "@/schemas/login-schema";
import { Icons } from "../ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;
type LoginFormProps = {
  className?: string;
};

export default function LoginForm({ className }: LoginFormProps) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (error) => {
          console.error(error.error);
          toast.error(
            error.error.message || "Something went wrong. Please try again.",
          );
        },

        onSuccess: () => {
          router.push("/notes");
        },
      },
    );
  };

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  return (
    <Card
      className={cn(
        "mx-auto w-full max-w-sm bg-background border shadow-sm rounded-xl",
        className,
      )}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Login to Notes App</CardTitle>
        <CardDescription className="font-semibold text-muted-foreground">
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="-space-y-3">
            <Field>
              <Button
                variant="outline"
                type="button"
                className="w-full gap-2"
                onClick={signInWithGoogle}
              >
                <Icons.google />
                Login with Google
              </Button>
            </Field>

            <FieldSeparator className="mt-4 font-medium *:data-[slot=field-separator-content]:bg-background">
              Or continue with
            </FieldSeparator>

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
          </FieldGroup>

          <Button type="submit" size="lg" className="w-full font-semibold">
            Login
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
