 "use client";

import Image from "next/image";

import { EditorialSection } from "@/components/ds";
import { FeatureModal, type FeatureModalConfig } from "@/components/feature-modal";
import type { PortfolioProject } from "@/lib/supabase/queries";
import { ArrowRight } from "lucide-react";

type ProjectProps = {
  projects: PortfolioProject[];
};

function isSignedSupabaseImage(src: string) {
  return src.includes("/storage/v1/object/sign/");
}

type ProjectModalCopy = {
  title: string;
  description: string;
  body: string;
  category: string;
  chromeStoreHref?: string;
};

// Matched against the resolved project title (not array position) so the
// copy follows its project even if rows are reordered in the database.
const projectModalCopyByKeyword: Array<{
  keywords: string[];
  copy: ProjectModalCopy;
}> = [
  {
    keywords: ["vex"],
    copy: {
      title: "VEX Robotics",
      description: "VEX Robotics Competition (VRC)",
      category: "Robotics",
      body:
        "Led a competitive VEX Robotics team in the design, construction, and programming of an autonomous and driver-controlled robot for the VEX Robotics Competition. The project required close coordination between mechanical design, electronics, and software under strict competition constraints.",
    },
  },
  {
    keywords: ["openbci", "bci", "eeg"],
    copy: {
      title: "OpenBCI",
      description: "Brain–Computer Interface Data Analysis Project",
      category: "Data Analysis",
      body:
        "Developed a data acquisition and analysis pipeline using OpenBCI, an open-source brain–computer interface platform, to measure and record electrical brain activity (EEG). The project focused on transforming raw biosignals into usable data for real-world exploratory applications.",
    },
  },
  {
    keywords: ["wow", "extension"],
    copy: {
      title: "Wow extension",
      description: "Private Chrome Extension for Internal Form Automation",
      category: "Chrome Extension",
      body:
        "Collaborated with a small team to develop a private Google Chrome extension used internally within our school to automate repetitive Google Form workflows. The tool was designed as a side project to improve student productivity and provide a practical efficiency advantage in managing routine academic tasks.",
      chromeStoreHref:
        "https://chromewebstore.google.com/detail/wow-extension/okdaiedanminfdpekdmoegkenfegpbam",
    },
  },
];

function getProjectModalCopy(project: PortfolioProject): ProjectModalCopy {
  const title = project.title.toLowerCase();
  const match = projectModalCopyByKeyword.find(({ keywords }) =>
    keywords.some((keyword) => title.includes(keyword)),
  );

  return (
    match?.copy ?? {
      title: project.title,
      description: "A closer look at this project.",
      category: "Project",
      body: project.description,
    }
  );
}

function getProjectModalConfig(project: PortfolioProject): FeatureModalConfig {
  const modalCopy = getProjectModalCopy(project);
  const modalActions = modalCopy.chromeStoreHref
    ? [
        {
          label: "View on Chrome Web Store",
          href: project.href ?? modalCopy.chromeStoreHref,
          target: "_blank" as const,
        },
      ]
    : undefined;

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
      "inset-0 top-0 left-0 grid h-dvh max-h-dvh max-w-none grid-rows-[auto_minmax(0,1fr)_auto] translate-x-0 translate-y-0 overflow-hidden rounded-none p-5 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[calc(100vh-2rem)] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:p-6",
    bodyClassName: "min-h-0 overflow-y-auto pr-1",
    actions: modalActions,
  };
}

const Project = ({ projects }: ProjectProps) => {
  return (
    <EditorialSection number="2" label="Selected work" id="projects">
      <div className="not-prose flex flex-col" data-reveal>
        {projects.map((project, index) => {
          const copy = getProjectModalCopy(project);

          return (
            <FeatureModal
              key={project.id}
              config={getProjectModalConfig(project)}
              trigger={
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-4 border-b border-border py-6 text-left"
                  data-reveal
                >
                  <h3 className="text-2xl font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground md:text-4xl">
                    {project.title}
                  </h3>
                  <span className="flex shrink-0 items-center gap-4">
                    <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:inline">
                      {copy.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {String(projects.length - index).padStart(2, "0")}
                    </span>
                    <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </span>
                </button>
              }
            />
          );
        })}
      </div>
    </EditorialSection>
  );
};

export default Project;
