

import { cn } from "@/lib/utils";

interface JobOpening {
  title: string;
  location?: string;
  url: string;
}

interface JobCategory {
  category: string;
  openings: JobOpening[];
}

interface Careers4Props {
  heading?: string;
  jobs?: JobCategory[];
  className?: string;
}

const Speciality = ({
  heading = "Skills & Speciality",
  jobs = [
    {
      category: "AI Engineering",
      openings: [
        { title: "LLM Application Development", url: "#" },
        { title: "AI Workflow Automation", url: "#" },
        { title: "AI Agent Development", url: "#" },
        { title: "Prompt Engineering", url: "#" },
        { title: "Retrieval-Augmented Generation (RAG)", url: "#" },
        { title: "Model Evaluation & Prompt Optimization", url: "#" },
      ],
    },
    {
      category: "System Design & Backend",
      openings: [
        { title: "Scalable System Design", url: "#" },
        { title: "REST API Development", url: "#" },
        { title: "Database Design (SQL)", url: "#" },
        { title: "Asynchronous Programming", url: "#" },
        { title: "Authentication & Integrations", url: "#" },
      ],
    },
  ],
  className,
}: Careers4Props) => {
  return (
    <section id="skills" className={cn("py-32", className)} >
      <div className="container mx-auto p-4 sm:p-6" data-reveal>
        <h2 className="text-3xl font-medium md:text-4xl">{heading}</h2>
        <div className="mt-6 flex flex-col gap-16 md:mt-14" data-reveal>
          {jobs.map((jobCategory) => (
            <div key={jobCategory.category} className="grid" data-reveal>
              <h2 className="border-b pb-4 text-xl font-semibold md:text-2xl" data-reveal>
                {jobCategory.category}
              </h2>
              {jobCategory.openings.map((job) => (
                <div
                  key={job.title}
                  className="flex items-center justify-between border-b py-4" data-reveal
                >
                  <div>
                    <a className="font-small text-primary transition-colors hover:text-primary/80" href={job.url}>
                      {job.title}
                    </a>
                    {job.location ? (
                      <p className="text-sm text-muted-foreground">
                        {job.location}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Speciality };
