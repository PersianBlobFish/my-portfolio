import { EditorialSection } from "@/components/ds";

const skillCategories = [
  {
    category: "AI Engineering",
    items: [
      "LLM Application Development",
      "AI Workflow Automation",
      "AI Agent Development",
      "Prompt Engineering",
      "Retrieval-Augmented Generation (RAG)",
      "Model Evaluation & Prompt Optimization",
    ],
  },
  {
    category: "System Design & Backend",
    items: [
      "Scalable System Design",
      "REST API Development",
      "Database Design (SQL)",
      "Asynchronous Programming",
      "Authentication & Integrations",
    ],
  },
];

const About = () => {
  return (
    <>
      <div id="about" data-nav-offset="24" />
      <EditorialSection
        number="3"
        label={
          <>
          </>
        }
      >
        <div className="flex flex-col gap-10">
          <h2
            className="!my-0 text-2xl font-medium leading-snug tracking-tight text-balance md:text-4xl"
            data-reveal
          >
            I’m a Computer Science student focused on solving real-world
            problems through technology. I build practical, well-designed
            solutions with strong attention to detail.
          </h2>
          <p
            className="font-light leading-relaxed text-muted-foreground"
            data-reveal
          >
            Always learning, I aim to grow as a developer and create
            meaningful impact — with knowledge in the categories below.
          </p>
          <div id="skills" className="not-prose flex flex-col gap-10">
            {skillCategories.map((group) => (
              <div key={group.category} data-reveal>
                <h3 className="border-b border-border pb-3 text-xl font-semibold md:text-2xl">
                  {group.category}
                </h3>
                <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>
    </>
  );
};

export default About;
