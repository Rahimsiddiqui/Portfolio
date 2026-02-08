import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project, idx }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <motion.div
      key={idx}
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
      className="group flex flex-col bg-surface/30 backdrop-blur-xl border border-border/60 rounded-4xl overflow-hidden hover:border-blue-600/30 transition-colors duration-200 hover:shadow-xl hover:shadow-blue-600/5 cursor-pointer h-full"
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = `https://picsum.photos/800/450?random=${idx}`;
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-primary text-2xl font-bold font-space-grotesk tracking-tight">
            {project.title}
          </h3>
          <div className="flex -mt-2 gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary rounded-full p-3 hover:text-primary hover:bg-surface transition-colors duration-200"
              aria-label="GitHub Repository"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary rounded-full p-3 hover:text-primary hover:bg-surface transition-colors duration-200"
              aria-label="Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <p className="text-secondary text-md mb-6 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIdx) => (
            <span
              key={techIdx}
              className="px-3 py-1 bg-surface border border-border rounded-full text-[0.75rem] font-medium text-secondary uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
