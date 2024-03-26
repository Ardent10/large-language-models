import { Section } from "@/modules/common/section";
import { Layout } from "@common/layout/layout";
import { Hero } from "../components/hero";

export function Home() {
  return (
    <Layout>
      <Hero />
      <Section>
        <h1 className="text-4xl font-bold text-center">
          Welcome to the home page
        </h1>
      </Section>
      <Section>
        <h1 className="text-4xl font-bold text-center">
          Welcome to the home page
        </h1>
      </Section>
      <Section>
        <h1 className="text-4xl font-bold text-center">
          Welcome to the home page
        </h1>
      </Section>
    </Layout>
  );
}
