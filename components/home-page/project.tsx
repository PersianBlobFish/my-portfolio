import * as React from "react";
import Image from "next/image";

import { Section, Container } from "@/components/ds";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const photos = [
  {
    src: "/placeholder.jpg",
  },
  {
    src: "/placeholder.jpg",
  },
  {
    src: "/placeholder.jpg",
  },
  {
    src: "/placeholder.jpg",
  },
  {
    src: "/placeholder.jpg",
  },
];

const Project = () => {
  return (
    <Section>
      <Container>
        <h2 className="!mt-0 mb-4">This is a Feature with an Image Carousel</h2>
        <p>
          Use it to showcase your latest images. Get started at
          components.bridgher.to and make sure to install brijr/craft for
          styling.
        </p>
        <Carousel className="mt-6 w-full px-5 py-4">
          <CarouselContent className="-ml-1">
            {photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="relative overflow-hidden">
                    <CardContent className="not-prose flex aspect-square items-center justify-center">
                      <Image
                        src={photo.src}
                        alt="Presets.com Example Image"
                        width={720}
                        height={480}
                        className="absolute inset-0 h-full w-full object-cover"
                      ></Image>
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
