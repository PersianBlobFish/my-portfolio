 "use client";

import * as React from "react";
import Image from "next/image";

import { Section, Container } from "@/components/ds";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeatureModal, type FeatureModalConfig } from "@/components/feature-modal";
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

const projectModalCopy = [
  {
    title: "VEX Robotics",
    description: "VEX Robotics Competition (VRC)",
    body:
      "Led a competitive VEX Robotics team in the design, construction, and programming of an autonomous and driver-controlled robot for the VEX Robotics Competition. The project required close coordination between mechanical design, electronics, and software under strict competition constraints.",
  },
  {
    title: "OpenBCI",
    description: "Brain–Computer Interface Data Analysis Project",
    body:
      "Developed a data acquisition and analysis pipeline using OpenBCI, an open-source brain–computer interface platform, to measure and record electrical brain activity (EEG). The project focused on transforming raw biosignals into usable data for real-world exploratory applications.",
  },
  {
    title: "Wow extension",
    description: "Private Chrome Extension for Internal Form Automation",
    body:
      "Collaborated with a small team to develop a private Google Chrome extension used internally within our school to automate repetitive Google Form workflows. The tool was designed as a side project to improve student productivity and provide a practical efficiency advantage in managing routine academic tasks.",
  },
];

function getProjectModalCopy(project: PortfolioProject, index: number) {
  return (
    projectModalCopy[index] ?? {
      title: project.title,
      description: "A closer look at this project.",
      body: project.description,
    }
  );
}

function getProjectModalConfig(
  project: PortfolioProject,
  index: number,
): FeatureModalConfig {
  const modalCopy = getProjectModalCopy(project, index);

  return {
    title: modalCopy.title,
    description: modalCopy.description,
    content: (
      <div className="grid gap-6 text-foreground md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-lg border">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={720}
            height={480}
            unoptimized={isSignedSupabaseImage(project.imageUrl)}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">{project.title}</h3>
          <p className="font-light leading-[1.5] text-muted-foreground">
            {modalCopy.body}
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground">{project.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
          </div>
        </div>
      </div>
    ),
    contentClassName:
      "inset-0 top-0 left-0 h-dvh max-h-dvh max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none p-5 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[calc(100vh-2rem)] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:p-6",
  };
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
                        <FeatureModal
                          config={getProjectModalConfig(project, index)}
                          trigger={<Button className="mt-4 w-fit">View project</Button>}
                        />
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
