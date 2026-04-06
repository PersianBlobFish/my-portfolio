

import { cn } from "@/lib/utils";

interface JobOpening {
  title: string;
  location: string;
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
      category: "Software",
      openings: [
        {
          title: "Frontend Developer",
          location: "React, TypeScript",
          url: "#",
        },
        {
          title: "UI/UX Designer",
          location: "Figma",
          url: "#",
        },
        {
          title: "Software Engineer",
          location: "C++, Python, Java",
          url: "#",
        },
      ],
    },
    {
      category: "Skills",
      openings: [
        {
          title: "Data Analysis",
          location: "SQL (SQLite, MySQL), Python (Pandas, NumPy)",
          url: "#",
        },
        {
          title: "Object-Oriented Design",
          location: "Python, Java, C++",
          url: "#",
        },
      ],
    },
  ],
  className,
}: Careers4Props) => {
  return (
    <section className={cn("py-32", className)} >
      <div className="container mx-auto p-4 sm:p-6" data-reveal>
        <h2 className="text-3xl font-medium md:text-4xl">{heading}</h2>
        <div className="mt-6 flex flex-col gap-16 md:mt-14" data-reveal>
          {jobs.map((jobCategory) => (
            <div key={jobCategory.category} className="grid" data-reveal>
              <h2 className="border-b pb-4 text-xl font-bold">
                {jobCategory.category}
              </h2>
              {jobCategory.openings.map((job) => (
                <div
                  key={job.title}
                  className="flex items-center justify-between border-b py-4" data-reveal
                >
                  <div>
                    <a href={job.url} className="font-semibold hover:underline">
                      {job.title}
                    </a>
                    <p className="text-sm text-muted-foreground">
                      {job.location}
                    </p>
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
