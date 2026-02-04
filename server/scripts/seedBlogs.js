import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/blog.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dns from "dns";
dotenv.config();

// Fix for MongoDB Atlas connection issues locally (querySrv ECONNREFUSED)
dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  console.warn("Could not set custom DNS servers, using system defaults.");
}

// Config dotenv to read from root .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../../.env") });

const mockBlogs = [
  {
    title: "The Future of AI in Web Development",
    slug: "future-of-ai-web-development",
    excerpt:
      "Exploring how Generative AI is reshaping the way we build and interact with the web.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    category: "AI & Tech",
    content: `
      <p>The landscape of web development is undergoing a seismic shift. The traditional ways of building interfaces, writing logic, and managing data are being augmented—and in some cases, replaced—by Generative AI.</p>
      
      <h2>The Rise of AI-First Development</h2>
      <p>We are entering an era where AI is not just a tool, but a collaborator. Developers are now using large language models to generate boilerplate, debug complex logic, and even suggest structural improvements to their codebases. This isn't just about speed; it's about shifting the developer's focus from "how to write" to "what to build".</p>
      
      <blockquote>"AI won't replace developers, but developers who use AI will replace those who don't."</blockquote>
      
      <h2>Impact on User Interfaces</h2>
      <p>Interfaces are becoming more conversational and contextual. Instead of static forms and menus, we're seeing the emergence of intent-driven UIs that adapt to the user's needs in real-time. This shift requires a new way of thinking about frontend architecture, where the UI is a dynamic shell populated by AI-driven logic.</p>
      
      <ul>
        <li><strong>Dynamic Content Generation:</strong> Tailoring every pixel to the individual user's behavior and history.</li>
        <li><strong>Predictive Navigation:</strong> Anticipating the user's next move and pre-loading necessary data or UI states.</li>
        <li><strong>AI-Assisted Accessibility:</strong> Automatically generating alt text, structural labels, and optimizing contrast in real-time.</li>
      </ul>
      
      <h2>The New Developer Skillset</h2>
      <p>As AI handles the repetitive parts of coding, soft skills and high-level architectural thinking become paramount. Understanding how to prompt effectively, how to audit AI-generated code for security and performance, and how to maintain a cohesive user experience across AI-driven components will be the defining skills of the next decade.</p>
      
      <p>As we move forward, the challenge will be to balance the power of AI with the need for security, performance, and human-centric design. The future is bright, but it requires a responsible and thoughtful approach to integration.</p>
    `,
    views: 120,
    tags: ["AI", "Web Development", "Future"],
  },
  {
    title: "Mastering Minimalist Design",
    slug: "mastering-minimalist-design",
    excerpt:
      "Why less is more when it comes to creating intuitive and premium user experiences.",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1000&auto=format&fit=crop",
    category: "Design",
    content: `
      <p>Minimalism is not just about having less; it's about having exactly what you need. In the world of digital design, it's a philosophy that prioritizes clarity, purpose, and user focus over unnecessary decoration.</p>
      
      <h2>The Power of Negative Space</h2>
      <p>Negative space, or white space, is the canvas on which your design lives. It's not "wasted" space; it's a crucial element that provides breathing room for your content and guides the user's eye. Good use of white space increases legibility and creates a sense of luxury and calm.</p>
      
      <h2>Typography as Design</h2>
      <p>When you strip away unnecessary decorations, typography becomes your most powerful design tool. Choosing the right typeface, weight, and spacing can communicate brand personality and hierarchy more effectively than any graphic. In minimalist design, type is often the only visual element needed to tell a story.</p>
      
      <h2>The "Less is More" Checklist</h2>
      <p>When refining a minimalist interface, ask yourself these three questions:</p>
      <ul>
        <li>Does this element serve a specific user goal?</li>
        <li>Can I achieve the same result with fewer colors or fonts?</li>
        <li>Is the information hierarchy clear at a single glance?</li>
      </ul>
      
      <blockquote>"Complexity is easy; simplicity is hard."</blockquote>
      
      <h2>Conclusion</h2>
      <p>A minimalist approach leads to faster load times, better accessibility, and a more timeless aesthetic. It challenges designers to think deeply about every element they include, ensuring it serves a clear and valuable purpose. In a world of digital noise, simplicity is the ultimate sophistication.</p>
    `,
    views: 85,
    tags: ["Design", "Minimalism", "UX"],
  },
  {
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-applications",
    excerpt:
      "Best practices for maintaining clean code and high performance as your project grows.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    category: "Development",
    content: `
      <p>Scaling a React application is more than just adding new features; it's about maintaining a codebase that remains performant, testable, and manageable as it grows from a few hundred lines to tens of thousands. Without a solid foundation, technical debt will eventually halt your progress.</p>
      
      <h2>Architecture Matters: The Modular Approach</h2>
      <p>Choosing the right folder structure and state management strategy early on can save weeks of refactoring later. A modular approach, where components, custom hooks, and business logic are clearly separated, is key to scalability. Each module should be a "black box" that handles its own logic and styling.</p>
      
      <h2>Performance Optimization at Scale</h2>
      <p>As applications grow, bottlenecks inevitably appear. You must be proactive in managing re-renders and bundle size:</p>
      <ul>
        <li><strong>Code-Splitting:</strong> Use <code>React.lazy</code> and <code>Suspense</code> to only load the code the user needs right now.</li>
        <li><strong>Memoization:</strong> Strategic use of <code>useMemo</code> and <code>useCallback</code> to prevent unnecessary calculations.</li>
        <li><strong>Efficient State:</strong> Avoid "prop drilling" and keep state as local as possible to minimize the impact of updates.</li>
      </ul>
      
      <blockquote>"Write code that is easy to delete, not easy to extend."</blockquote>
      
      <h2>The Importance of Documentation and Tooling</h2>
      <p>Scale brings more developers into the mix. Clear, consistent documentation via Storybook or JSDoc ensures that everyone is pulling in the same direction. Coupled with strict Linting and TypeScript, you can catch errors before they ever reach production.</p>
      
      <p>Scalability isn't a destination; it's a continuous process of auditing, refactoring, and optimizing. By focusing on modularity and performance from day one, you ensure your application can grow alongside your users.</p>
    `,
    views: 200,
    tags: ["React", "Scalability", "JavaScript"],
  },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing blogs to avoid duplicates or use update logic
    await Blog.deleteMany({});
    console.log("Cleared existing blogs.");

    await Blog.insertMany(mockBlogs);
    console.log("Seeding complete! Added 3 blogs.");

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
