import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Section, Container } from "@/components/ds";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/lib/supabase/queries";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ProjectProps = {
  projects: PortfolioProject[];
};

const Project = ({ projects }: ProjectProps) => {
  return (
    <Section>
      <Container>
        <h2 className="!mt-0 mb-4">Featured projects</h2>
        <p>
          This carousel now loads from Supabase. Add rows to your <code>projects</code>{" "}
          table and they will appear here automatically.
        </p>
        <Carousel className="mt-6 w-full px-5 py-4">
          <CarouselContent className="-ml-1">
            {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="relative overflow-hidden">
                    <CardContent className="not-prose flex aspect-square flex-col items-start justify-end gap-4 p-0">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={720}
                        height={480}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 text-white">
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
