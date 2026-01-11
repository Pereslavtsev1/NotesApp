import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { ClassNameProps, cn } from "@/lib/utils";
import { ArrowRightIcon, CheckCircle2Icon, SparklesIcon } from "lucide-react";
import Link from "next/link";

export default function CtaSection({ className }: ClassNameProps) {
  return (
    <section className={cn("text-center", className)}>
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5">
        <SparklesIcon className="size-3.5" />
        <AnimatedShinyText className="text-sm text-foreground">
          Your personal workspace
        </AnimatedShinyText>
      </div>

      <TextAnimate
        className="mb-8 text-5xl font-bold tracking-tight text-balance text-foreground md:text-8xl"
        animation="slideUp"
        by="character"
        as="h1"
      >
        Ready to get organized?
      </TextAnimate>

      <TextAnimate
        className="mx-auto mb-12 px-8 text-base text-balance wrap-break-word text-muted-foreground md:text-2xl"
        animation="slideUp"
        by="character"
        as="p"
      >
        Join thousands who&apos;ve transformed their note-taking. No credit card
        required.
      </TextAnimate>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button size="lg" className="bg-foreground px-8 py-6 text-base" asChild>
          <Link href="/sign-up" className="inline-flex items-center gap-2">
            Start writing free
            <ArrowRightIcon className="size-5" />
          </Link>
        </Button>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2Icon className="size-5" />
          <span>No credit card</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2Icon className="size-5" />
          <span>Free forever</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2Icon className="size-5" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
