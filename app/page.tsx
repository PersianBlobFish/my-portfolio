import { Main, Section, Container } from "@/components/ds";
import About from "@/components/home-page/about";
import Hero from "@/components/home-page/hero";
import Project from "@/components/home-page/project";

export default function Page() {
     return (
       <Main>
         <Section>
           <Container>
             <Hero />
             <About />
             <Project />
           </Container>
         </Section>
       </Main>
     );
   }
