// React and Next.js imports
import Link from "next/link";
import Image from "next/image";

// UI component imports
import { Section, Container } from "@/components/ds";
import { Button } from "@/components/ui/button";

// Asset imports
import Placeholder from "@/public/placeholder.jpg";

const About = () => {
  return (
    <>
      <div id="about" data-nav-offset="24" />
      <Section>
        <Container className="grid items-stretch md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-6 py-8" data-reveal>
          <h3 className="!my-0 text-3xl font-medium md:text-4xl">About Me</h3>
          <p className="font-light leading-[1.4] opacity-70">
            I’m a Computer Science student focused on solving real-world problems through technology. <br/>I build practical, well-designed solutions with strong attention to detail. <br/>Always learning, I aim to grow as a developer and create meaningful impact.
          </p>
          <div className="not-prose flex items-center gap-2">
            <Button className="hidden w-fit" asChild>
              <Link href="#">Get Started</Link>
            </Button>
            <Button className="w-fit" variant="link" asChild>
              <Link href="#">Learn More {"->"}</Link>
            </Button>
          </div>
        </div>
        <div
          className="not-prose relative flex h-96 overflow-hidden rounded-lg border"
          data-reveal
        >
          <Image
            src={Placeholder}
            alt="placeholder"
            className="fill object-cover"
          />
        </div>
        </Container>
      </Section>
    </>
  );
};

export default About;
