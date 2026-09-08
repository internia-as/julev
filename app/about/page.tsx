import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("about", "/about");
}

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page of our application.</p>
    </div>
  );
};
export default About;
