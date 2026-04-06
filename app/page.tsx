import { Main, Section, Container } from "@/components/ds";
import About from "@/components/home-page/about";
import Hero from "@/components/home-page/hero";
import Project from "@/components/home-page/project";
import { Speciality } from "@/components/home-page/skill";
import { getPortfolioProjects } from "@/lib/supabase/queries";

export default async function Page() {
  const projects = await getPortfolioProjects();

  return (
    <Main>
      <Section>
        <Container>
          <Hero />
          <About />
          <Speciality />
          <Project projects={projects} />
        </Container>
      </Section>
    </Main>
  );
}
