import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { TextAnimate } from "@/components/ui/text-animate";
import { ClassNameProps, cn } from "@/lib/utils";
import {
  CheckCircle2Icon,
  LockIcon,
  PenToolIcon,
  SearchIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";

const features = [
  {
    title: "Lightning fast",
    description:
      "Instant search, quick navigation, and blazing-fast performance. Find any note in milliseconds.",
    icon: ZapIcon,
  },
  {
    title: "Private & secure",
    description:
      "Your thoughts are yours alone. End-to-end security with zero tracking or data collection.",
    icon: LockIcon,
  },
  {
    title: "Beautiful editor",
    description:
      "Rich text formatting with markdown support. Write beautifully without distraction.",
    icon: PenToolIcon,
  },
  {
    title: "Powerful search",
    description:
      "Find anything instantly with intelligent search that understands context and keywords.",
    icon: SearchIcon,
  },
  {
    title: "Stay organized",
    description:
      "Tags, folders, favorites, and smart organization. Your notes, your way.",
    icon: CheckCircle2Icon,
  },
  {
    title: "Distraction-free",
    description:
      "Clean, minimal interface that lets you focus on what matters: your ideas.",
    icon: SparklesIcon,
  },
];
export default function FeaturesSection({ className }: ClassNameProps) {
  return (
    <section id="features" className={cn("space-y-32", className)}>
      <div className="text-center">
        <TextAnimate
          className="text-4xl font-bold text-balance text-foreground md:text-6xl"
          animation="slideUp"
          by="character"
          as="h2"
        >
          Everything you need,
        </TextAnimate>

        <TextAnimate
          className="text-4xl font-bold text-balance text-foreground md:text-6xl"
          animation="slideUp"
          by="character"
          as="h2"
        >
          nothing you don&apos;t
        </TextAnimate>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card
              key={feature.title}
              className="relative overflow-hidden rounded-2xl bg-transparent"
            >
              <ShineBorder
                suppressHydrationWarning
                borderWidth={2}
                duration={16}
                shineColor={["rgba(255,255,255,0.30)"]}
              />

              <CardHeader>
                <div className="flex size-14 items-center justify-center rounded-xl bg-foreground">
                  <Icon className="size-6 text-background" />
                </div>
              </CardHeader>
              <CardContent className="text-left">
                <CardTitle className="mb-3 text-2xl font-bold">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
