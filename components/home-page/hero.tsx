// React and Next.js imports
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";
import { Camera } from "lucide-react";

// Local component imports
import { Section, Container } from "@/components/ds";
import { Button } from "@/components/ui/button";
import SignatureDraw from "@/components/home-page/signature-draw";

const Hero = () => {
  return (
    <Section id="home">
      <Container className="flex flex-col items-center text-center">
        <SignatureDraw />
        <h1 className="!mb-0 italic" data-reveal>
          <Balancer>
            Simple solutions. Thoughtfully built.
          </Balancer>
        </h1>
        <h3 className="text-muted-foreground" data-reveal>
          <Balancer>
            Front-end developer, UI/UX designer, software engineer, and lifelong learner.
          </Balancer>
        </h3>
        <div className="hidden not-prose mt-6 flex gap-2 md:mt-12" data-reveal>
          <Button asChild>
            <Link href="/posts">
              <Camera className="mr-2" />
              Lorem Ipsum
            </Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link href="/posts">Dolor Sit Amet -{">"}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
