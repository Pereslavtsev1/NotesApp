"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
type LoginFormInputs = z.infer<typeof LoginFormSchema>;
const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Данные формы:", data);
  };

  return (
    <main className="flex min-h-screen w-full justify-center">
      <div className="flex min-h-screen w-full max-w-7xl items-center justify-center p-6 md:p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm rounded-lg border border-muted-foreground/50 p-6 shadow-lg sm:p-8 lg:p-10"
          noValidate
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <h1 className="text-xl font-bold">Login</h1>
              <p className="text-sm font-medium text-wrap text-muted-foreground">
                Enter your details below to login in your account
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  variant="custom"
                  className="mt-1 py-2 text-sm"
                  placeholder="example@gmail.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-xs text-wrap text-red-500"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  variant="custom"
                  className="mt-1 py-2 text-sm"
                  placeholder="password"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                {errors.password && (
                  <p
                    id="password-error"
                    className="mt-1 text-xs text-wrap text-red-500"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant={isSubmitting ? "ghost" : "default"}
                  className="w-full py-5 font-semibold"
                >
                  Login
                </Button>
                <p className="mt-1 text-center text-sm font-medium">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
