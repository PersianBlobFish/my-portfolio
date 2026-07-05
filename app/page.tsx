import { Main, Section, Container } from "@/components/ds";
import About from "@/components/home-page/about";
import Hero from "@/components/home-page/hero";
import Project from "@/components/home-page/project";
import { getPortfolioProjects } from "@/lib/supabase/queries";

export default async function Page() {
  const projects = await getPortfolioProjects();

  return (
    <Main>
      <Section>
        <Container>
          <Hero />
          <Project projects={projects} />
          <About />
        </Container>
      </Section>
    </Main>
  );
}
