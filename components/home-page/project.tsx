 "use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Section, Container } from "@/components/ds";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/lib/supabase/queries";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ProjectProps = {
  projects: PortfolioProject[];
};

function isSignedSupabaseImage(src: string) {
  return src.includes("/storage/v1/object/sign/");
}

const Project = ({ projects }: ProjectProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const updateSelectedIndex = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    updateSelectedIndex();
    api.on("select", updateSelectedIndex);
    api.on("reInit", updateSelectedIndex);

    return () => {
      api.off("select", updateSelectedIndex);
      api.off("reInit", updateSelectedIndex);
    };
  }, [api]);

  return (
    <Section id="projects">
      <Container>
        <h2 className="!mt-0 mb-4 text-3xl font-medium md:text-4xl" data-reveal>
          Projects
        </h2>
        <p className="font-light leading-[1.4] opacity-70 text-muted-foreground" data-reveal>
          My experiences and projects.
        </p>
        <Carousel
          className="mt-6 w-full px-2 py-4 sm:px-5"
          setApi={setApi}
          data-reveal
        >
          <CarouselContent className="-ml-2 md:-ml-1">
            {projects.map((project, index) => (
              <CarouselItem
                key={project.id}
                className="basis-[86%] pl-2 md:basis-1/2 md:pl-1 lg:basis-1/2"
              >
                <div className="py-1 pr-2 md:p-1">
                  <Card
                    className={cn(
                      "relative mx-1 overflow-hidden transition-opacity duration-300 md:mx-2 md:opacity-100",
                      index === selectedIndex ? "opacity-100" : "opacity-25",
                    )}
                  >
                    <CardContent className="not-prose flex aspect-square flex-col items-start justify-end gap-4 p-0">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={720}
                        height={480}
                        unoptimized={isSignedSupabaseImage(project.imageUrl)}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/100 via-black/50 to-transparent p-5 text-white">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="mt-2 max-w-sm text-sm text-white/80">
                          {project.description}
                        </p>
                        {project.href ? (
                          <Button className="mt-4 w-fit" asChild>
                            <Link href={project.href} target="_blank" rel="noreferrer">
                              View project
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="sr-only sm:not-sr-only">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </Container>
    </Section>
  );
};

export default Project;
