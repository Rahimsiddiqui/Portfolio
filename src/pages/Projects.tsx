import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <div className="min-h-screen w-full h-full bg-background transition-colors duration-200">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto pt-16 px-5.5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col items-center md:items-start text-center md:text-left mb-16"
        >
          <h1 className="text-primary text-4xl sm:text-5xl font-bold font-space-grotesk tracking-tight">
            Selected <span className="text-accent">Projects</span>
          </h1>
          <p className="text-secondary text-lg max-w-xl mt-5">
            A showcase of my recent work, ranging from full-stack applications
            to minimalist frontend experiments. Each project represents a unique
            challenge and solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pb-24">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
