import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { ClassNameProps, cn } from "@/lib/utils";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

export default function HeroSection({ className }: ClassNameProps) {
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
        Capture ideas.
      </TextAnimate>

      <TextAnimate
        className="mb-8 text-5xl font-bold tracking-tight text-balance text-foreground md:text-8xl"
        animation="slideUp"
        by="character"
        as="h1"
      >
        Stay organized.
      </TextAnimate>

      <TextAnimate
        className="mx-auto mb-12 px-8 text-base text-balance wrap-break-word text-muted-foreground md:text-2xl"
        animation="slideUp"
        by="character"
        as="p"
      >
        A beautiful, lightning-fast note-taking app designed for your personal
        productivity. No distractions, just pure focus.
      </TextAnimate>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button size="lg" className="bg-foreground px-8 py-6 text-base">
          <Link href="/sign-up">Start writing free</Link>
          <ArrowRightIcon className="ml-2 size-5" />
        </Button>

        <Button size="lg" variant="outline" className="px-8 py-6 text-base">
          View demo
        </Button>
      </div>
    </section>
  );
}
