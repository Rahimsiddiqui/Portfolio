import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

const technologies = [
  { name: "HTML", icon: "/icons/html.svg" },
  { name: "CSS", icon: "/icons/css.svg" },
  { name: "JavaScript", icon: "/icons/js.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "Express", icon: "/icons/express.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" },
  { name: "Tailwind", icon: "/icons/tailwind.svg" },
];

const featuredWork = [
  {
    title: "Qubli AI",
    image: "/images/qubli-ai.avif",
    link: "https://qubli-ai.vercel.app",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
  },
  {
    title: "Project 2",
    image: "/images/project2.png",
    link: "https://qubli-ai.vercel.app",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
  },
  {
    title: "Project 3",
    image: "/images/project3.png",
    link: "https://qubli-ai.vercel.app",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
  },
  {
    title: "Project 4",
    image: "/images/project4.png",
    link: "https://qubli-ai.vercel.app",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
  },
];

const howIWork = [
  {
    title: "Discovery",
    description:
      "Understanding the problem space, user needs, and business goals.",
  },
  {
    title: "Design",
    description:
      "Iterative prototyping and visual design to create intuitive interfaces.",
  },
  {
    title: "Development",
    description:
      "Writing clean, maintainable code with a focus on performance.",
  },
  {
    title: "Testing",
    description:
      "Rigorous testing to ensure reliability, security, and scalability.",
  },
  {
    title: "Deployment",
    description:
      "Launching the application and monitoring performance in production.",
  },
  {
    title: "Maintenance",
    description:
      "Ongoing support, updates, and improvements to ensure long-term success.",
  },
];

function LandingPage() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const part1 = "👋Hi, I am ";
  const part2 = "Rahim!";
  const fullLength = part1.length + part2.length;

  const controls = useAnimationControls();
  const ITEM_WIDTH = 152; // 120px card + 32px gap
  const LOOP_POINT = -1216; // 152 * 8 technologies
  const xPos = useRef(0);

  const startInfiniteScroll = useCallback(
    (currentX = null) => {
      // If currentX is null, it will start from current position
      const startX = currentX !== null ? currentX : xPos.current;

      // Normalize startX to be within the [LOOP_POINT, 0] range to prevent jumps
      const normalizedX = startX % LOOP_POINT;

      controls.start({
        x: [normalizedX, LOOP_POINT],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40 * ((LOOP_POINT - normalizedX) / LOOP_POINT),
            ease: "linear",
          },
        },
      });
    },
    [controls, LOOP_POINT],
  );

  useEffect(() => {
    startInfiniteScroll(0);
  }, [startInfiniteScroll]);

  useEffect(() => {
    if (index < fullLength) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [index, fullLength]);

  const t1 = part1.slice(0, index);
  const t2 = index > part1.length ? part2.slice(0, index - part1.length) : "";
  const t3 =
    index > part1.length + part2.length
      ? part1.slice(0, index - part1.length - part2.length)
      : "";

  return (
    <div className="min-h-screen bg-background px-5.5 pt-3.5 transition-colors duration-200">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center max-w-6xl mx-auto">
        <p className="uppercase text-xs md:text-[0.8rem] text-secondary tracking-widest font-semibold">
          Fullstack developer
        </p>
        <div className="text-4xl sm:text-5xl md:text-[3.35rem] text-center md:text-left font-bold mt-2.5 sm:mt-4 md:mt-5 lg:mt-6 font-space-grotesk leading-14 tracking-tight min-h-10">
          {t1.includes("👋") ? (
            <>
              <motion.span
                className="inline-block cursor-default"
                whileHover={{
                  rotate: [0, 8, -8, 8, -4, 8, 0],
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                  },
                }}
                style={{ transformOrigin: "bottom right" }}
              >
                👋
              </motion.span>
              {t1.replace("👋", "")}
            </>
          ) : (
            t1
          )}
          {t2 && <span className="text-blue-600 dark:text-blue-500">{t2}</span>}
          {t3}
          {index < fullLength && (
            <span className="inline-block w-[3px] h-11.5 bg-blue-600 ml-0.5 -mb-1 animate-pulse"></span>
          )}
        </div>

        <p
          className={`text-lg text-center max-w-xl text-secondary mt-4.5 sm:mt-6 md:mt-7.5 lg:mt-8.5 transition-all duration-700 ease-out ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          A Fullstack engineer who builds high-performance, accessible web
          applications with React and MongoDB. I blend technical precision with
          creative digital experiences.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4.5 mt-7.5 sm:mt-8 lg:mt-9 transition-all duration-1000 ease-out delay-200 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            className="group flex items-center gap-2 bg-primary hover:bg-primary/95  dark:hover:bg-primary/90 cursor-pointer px-10 py-4 text-background transition-colors transition-transform duration-200 rounded-full font-medium hover:scale-102"
            onClick={() => navigate("/projects")}
          >
            View Work
            <span className="inline-block mt-[0.065rem] group-hover:translate-x-0.75 transition-transform duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
          <button
            className="bg-surface text-primary border border-border px-10 py-4 rounded-full font-medium transition-colors transition-transform duration-200 hover:scale-102 cursor-pointer hover:border-border-secondary"
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </button>
        </div>
        <hr className="w-full border-border mt-20 mb-12 sm:mt-24 sm:mb-13 md:mb-15" />
      </section>

      {/* Technologies Section */}
      <section className="flex flex-col justify-center items-center py-10 max-w-6xl mx-auto w-full overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-semibold text-3xl sm:text-4xl md:text-[2.5rem] mb-14"
        >
          My Tech Stack
        </motion.h2>

        <div className="relative w-full">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10"></div>

          <motion.div
            className="flex gap-8 whitespace-nowrap cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ right: 0, left: LOOP_POINT * 2 }}
            animate={controls}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onUpdate={(latest) => {
              xPos.current = latest.x;
            }}
            onDragStart={() => {
              controls.stop();
            }}
            onDragEnd={(_, info) => {
              const { velocity } = info;
              const currentX = xPos.current;
              const targetX =
                Math.round((currentX + velocity.x * 0.2) / ITEM_WIDTH) *
                ITEM_WIDTH;

              controls
                .start({
                  x: targetX,
                  transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 150,
                    velocity: velocity.x,
                  },
                })
                .then(() => {
                  startInfiniteScroll();
                });
            }}
          >
            {[
              ...technologies,
              ...technologies,
              ...technologies,
              ...technologies,
            ].map((tech, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center min-w-[130px] p-6 bg-surface border border-border rounded-2xl hover:border-border-secondary transition-colors select-none"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className={`w-12 h-12 mb-3 object-contain pointer-events-none ${tech.name === "Express" ? "dark:invert" : ""}`}
                />
                <span className="text-secondary text-sm font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <hr className="w-full border-border mt-26.5 sm:mt-28 md:mt-30 mb-3.5" />
      </section>

      {/* Featured Work Section */}
      <section className="flex flex-col justify-center items-center max-w-6xl mx-auto pt-7 pb-10 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-semibold text-3xl sm:text-4xl md:text-[2.4rem] mb-13.5 lg:mb-15"
        >
          Featured Work
        </motion.h2>
        <div className="grid gap-12.5 max-w-2xl lg:grid-cols-2 lg:max-w-6xl">
          {featuredWork.map((work, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col items-start justify-center w-full transition-colors cursor-pointer select-none group"
                onClick={() => navigate(`/projects/${work.id}`)}
              >
                <img
                  src="https://picsum.photos/800/600?random=1"
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-102 opacity-90 group-hover:opacity-100 duration-400 rounded-xl"
                />
                <span className="text-primary text-xl sm:text-2xl ml-0.5 mt-4 sm:mt-6 font-medium">
                  {work.title}
                </span>
                <span className="text-secondary text-sm ml-0.5 mt-2 font-medium">
                  {work.technologies.join(" • ")}
                </span>
              </motion.div>
            );
          })}
        </div>
        <p
          className="text-primary/90 hover:text-primary text-sm sm:text-md ml-0.5 mt-13 lg:mt-16 font-medium flex justify-center items-center gap-1.5 cursor-pointer group transition-colors transition-transform duration-200"
          onClick={() => navigate("/projects")}
        >
          View All Projects{" "}
          <span className="inline-block mt-[0.0624rem] group-hover:translate-x-0.75 transition-transform duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </p>
        <hr className="w-full border-border mt-24 mb-2" />
      </section>
      {/* How I Work Section */}
      <section className="flex flex-col justify-center items-center max-w-6xl mx-auto pt-8 pb-10 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-semibold text-3xl sm:text-4xl md:text-[2.4rem]"
        >
          How I Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-secondary max-w-xl text-center text-lg mt-5 md:mt-6 mb-13.5 lg:mb-15"
        >
          I follow a structured process to ensure every project is delivered
          with high quality, on time, and exceeds expectations.
        </motion.p>
        <div className="grid gap-7 max-w-2xl md:grid-cols-2 lg:grid-cols-3 lg:max-w-6xl">
          {howIWork.map((work, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col bg-surface/70 rounded-xl shadow-md shadow-primary/10 py-8 px-5 sm:pl-6 md:py-10 items-start justify-center w-full hover:scale-102 transition-transform duration-200 select-none relative group"
              >
                <span className="absolute top-3.5 right-4 font-space-grotesk text-2xl sm:text-3xl text-secondary/60 rounded-full">
                  0{idx + 1}
                </span>
                <span className="text-primary text-md sm:text-lg mb-3 leading-tighter uppercase font-semibold">
                  {work.title}
                </span>
                <span className="text-secondary text-sm font-medium">
                  {work.description}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
