import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const page = () => {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <div className="flex min-h-screen w-full max-w-7xl items-center justify-center p-6 md:p-10">
        <form className="max-w-sm space-y-4 rounded-lg border border-muted-foreground/50 p-6 shadow-lg sm:p-8 lg:p-10 w-full">
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <h1 className="text-xl font-bold">Login</h1>
              <p className="text-xs font-medium text-wrap text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="font-medium">Email</label>
                <Input
                  type="email"
                  variant="custom"
                  className="mt-1"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <label className="font-medium">Password</label>
                <Input variant="custom" type="password" className="mt-1" />
              </div>
            </div>
            <Button className="w-full py-5 font-semibold">Login</Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default page;
