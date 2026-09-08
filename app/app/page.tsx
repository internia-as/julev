import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("app", "/app");
}

const App = () => {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is a simple Next.js application.</p>
    </div>
  );
};
export default App;
