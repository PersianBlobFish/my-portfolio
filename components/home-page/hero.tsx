import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EditorialSection } from "@/components/ds";
import SignatureDraw from "@/components/home-page/signature-draw";

const Hero = () => {
  return (
    <div id="home">
      <div className="pt-6 md:pt-10" data-reveal>
        <SignatureDraw className="mb-8 h-[26vh] md:mb-12 md:h-[32vh]" />
      </div>
      <EditorialSection
        number="1"
        label={
          <>
            Nguyen Pham Tran
            <br />
            Computer Science Student
          </>
        }
      >
        <div className="flex flex-col gap-6" data-reveal>
          <h1 className="text-3xl font-medium tracking-tight text-balance md:text-5xl">
            Simple solutions. Thoughtfully built.
          </h1>
          <p className="text-lg font-light leading-snug text-muted-foreground md:text-xl">
            Building AI-powered applications, scalable systems, and
            intelligent workflows.
          </p>
          <Link
            href="/#about"
            className="group not-prose mt-4 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            [About]
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </EditorialSection>
    </div>
  );
};

export default Hero;
