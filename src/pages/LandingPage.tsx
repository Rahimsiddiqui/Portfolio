import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Briefcase } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { Project, Technology, WorkStep } from "../types";

const technologies: Technology[] = [
  // Languages
  { name: "HTML", icon: "/icons/html.svg" },
  { name: "CSS", icon: "/icons/css.svg" },
  { name: "JavaScript", icon: "/icons/js.svg" },
  { name: "TypeScript", icon: "/icons/ts.svg" },

  // Frontend Frameworks
  { name: "React", icon: "/icons/react.svg" },
  { name: "Tailwind", icon: "/icons/tailwind.svg" },

  // Backend & Database
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "Express", icon: "/icons/express.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" },

  // Version Control
  { name: "Git", icon: "/icons/git.svg" },
];

const featuredWork: Project[] = [
  {
    title: "Qubli AI",
    description:
      "A comprehensive AI-driven platform for automated performance reviews and developer insights.",
    image: "/images/qubli-ai.avif",
    link: "https://qubli-ai.vercel.app",
    github: "https://github.com/Qubli-AI/Qubli-AI",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
  },
  {
    title: "Financial Atelier",
    description:
      "A web app where bespoke strategies turn finance into art with precision and insight.",
    image: "/images/financial-atelier.avif",
    link: "https://financialatelier.vercel.app",
    github: "https://github.com/financialatelier/financialatelier",
    technologies: ["React", "Node.js", "Serverless", "MongoDB", "Tailwind"],
  },
  {
    title: "Macbook Landing Page",
    description:
      "A recreation of Apple's Macbook landing page, built with React and Tailwind for pixel-perfect design and smooth animations.",
    image: "/images/macbook-14.avif",
    link: "https://macbook-14.vercel.app",
    github: "https://github.com/rahimsiddiqui/macbook-14",
    technologies: [
      "React",
      "Node.js",
      "Serverless",
      "MongoDB",
      "Tailwind",
      "Next.js",
    ],
  },
  {
    title: "Todo App",
    description:
      "A modern and responsive todo application built for fast task management, seamless productivity, and smooth user interactions.",
    image: "/images/todo-app.png",
    link: "https://rahim-todo-app.vercel.app",
    github: "https://github.com/rahimsiddiqui/todo-app",
    technologies: ["React", "Localstorage", "Next.js", "Tailwind"],
  },
];

const howIWork: WorkStep[] = [
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

const WorkCard = ({
  work,
  idx,
  isLargeScreen,
}: {
  work: WorkStep;
  idx: number;
  isLargeScreen: boolean;
}) => {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.2 }}
      initial={isLargeScreen ? "hidden" : undefined}
      whileInView={isLargeScreen ? "show" : undefined}
      variants={
        isLargeScreen
          ? {
              hidden: { opacity: 0, y: 30 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.8,
                  bounce: 0.3,
                },
              },
            }
          : {}
      }
      className={`flex flex-col bg-surface/30 backdrop-blur-sm border border-border/40 rounded-2xl p-8 lg:p-10 items-start justify-center w-full transition-all duration-300 select-none relative group hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden ${
        !isLargeScreen && inView
          ? idx % 2 === 0
            ? "slide-in-right"
            : "slide-in-left"
          : ""
      }`}
      style={{
        opacity: isLargeScreen ? undefined : inView ? 1 : 0,
      }}
    >
      {/* Background Number */}
      <span className="absolute -top-6 -right-2 font-space-grotesk text-9xl font-bold text-primary/5 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2">
        {idx + 1}
      </span>

      <div className="relative z-10 w-full">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-5 uppercase tracking-widest font-space-grotesk">
          Step 0{idx + 1}
        </span>
        <h3 className="text-primary text-xl font-bold mb-4 font-space-grotesk tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-300">
          {work.title}
        </h3>
        <p className="text-secondary/90 text-[0.935rem] font-medium leading-relaxed">
          {work.description}
        </p>
      </div>

      {/* Decorative accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
};

function LandingPage() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const part1 = "👋Hi, I am ";
  const part2 = "Rahim!";
  const fullLength = part1.length + part2.length;

  const controls = useAnimationControls();
  const ITEM_WIDTH = 180; // 140px card + 40px gap
  const LOOP_POINT = -1440; // 180 * 8 technologies
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
    startInfiniteScroll(null);
  }, [startInfiniteScroll]);

  useEffect(() => {
    if (index < fullLength) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 80);
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
      <section className="flex flex-col justify-center items-center max-w-5xl min-h-135 mx-auto">
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
          {t2 && <span className="text-accent">{t2}</span>}
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
          A Fullstack developer who builds high-performance, accessible web
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
            className="group flex items-center gap-2 bg-primary hover:bg-primary/95 cursor-pointer px-10 py-4 text-background transition-transform duration-200 rounded-full font-medium hover:scale-102"
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
            className="bg-surface text-primary border border-border px-10 py-4 rounded-full font-medium transition-transform duration-200 hover:scale-102 cursor-pointer hover:border-border-secondary"
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </button>
        </div>
        <hr className="w-full border-border mt-20 mb-12 sm:mt-24 sm:mb-13 md:mb-15" />
      </section>

      {/* Technologies Section */}
      <section className="flex flex-col justify-center items-center py-10 max-w-5xl mx-auto w-full overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-semibold text-3xl sm:text-4xl md:text-[2.5rem] mb-14"
        >
          My Tech Stack
        </motion.h2>

        <div className="relative w-full group/slider">
          {/* Gradient Overlays  */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background via-background/60 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background via-background/60 to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex gap-10 whitespace-nowrap cursor-grab active:cursor-grabbing py-4"
            drag="x"
            dragConstraints={{ right: 0, left: LOOP_POINT * 2 }}
            animate={controls}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onUpdate={(latest) => {
              xPos.current = latest.x as number;
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
                className="flex flex-col items-center justify-center min-w-[140px] p-8 bg-surface/30 backdrop-blur-xl border border-border/60 rounded-3xl hover:border-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/5 hover:-translate-y-1.5 transition-all duration-300 select-none group"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className={`w-14 h-14 relative z-10 object-contain pointer-events-none transition-transform duration-300 group-hover:scale-103 ${
                      tech.name === "Express" ? "dark:invert" : ""
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="text-secondary text-sm font-space-grotesk font-bold uppercase tracking-wider transition-colors duration-300 group-hover:text-primary">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <hr className="w-full border-border mt-26.5 sm:mt-28 md:mt-30 mb-3.5" />
      </section>

      {/* Featured Work Section */}
      <section className="flex flex-col justify-center items-center max-w-5xl mx-auto pt-7 pb-10 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-semibold text-3xl sm:text-4xl md:text-[2.4rem] mb-13.5 lg:mb-15"
        >
          Featured Work
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl">
          {featuredWork.map((work, idx) => (
            <ProjectCard key={idx} project={work} idx={idx} />
          ))}
        </div>
        <p
          className="text-primary/90 hover:text-primary text-sm sm:text-md ml-0.5 mt-13 lg:mt-16 font-medium flex justify-center items-center gap-1.5 cursor-pointer group transition-transform duration-200"
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
      <section className="flex flex-col justify-center items-center max-w-5xl mx-auto pt-8 pb-10 w-full overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-semibold text-3xl sm:text-4xl md:text-[2.6rem] font-space-grotesk tracking-tight"
        >
          How I Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-secondary/80 max-w-xl text-center text-lg mt-4 md:mt-5 mb-14 lg:mb-18"
        >
          I follow a structured process to ensure every project is delivered
          with high quality, on time, and exceeds expectations.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4,
              },
            },
          }}
          className="grid gap-6 sm:gap-8 max-w-3xl md:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl w-full"
        >
          {howIWork.map((work, idx) => (
            <WorkCard
              key={idx}
              work={work}
              idx={idx}
              isLargeScreen={isLargeScreen}
            />
          ))}
        </motion.div>
        <hr className="w-full border-border mt-25 mb-5" />
      </section>

      {/* Testimonial Section */}
      <section className="flex flex-col justify-center items-center max-w-5xl mx-auto pt-8 pb-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="mb-7 text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-square w-10 h-10 mx-auto"
              aria-hidden="true"
            >
              <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl max-w-4xl font-display font-medium leading-10 sm:leading-12 md:leading-15 text-primary mb-10">
            "Rahim is a rare breed of developer who understands design and
            functionality. The attention to detail in animations and
            interactions is world-class."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-surface border border-border overflow-hidden">
              <img
                alt="Client Photo"
                className="w-full h-full object-cover"
                src="/images/ahmed.jpg"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text-left">
              <div className="font-bold text-primary">Ahmed Siddiqui</div>
              <div className="text-sm text-secondary">Verified Client</div>
            </div>
          </div>
        </motion.div>
        <hr className="w-full border-border mt-20 mb-6" />
      </section>

      {/* Contact Section */}
      <section className="flex flex-col justify-center items-center max-w-5xl mx-auto pt-6 pb-24 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-surface/30 backdrop-blur-xl border border-border/60 rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden group"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="px-4 py-2 bg-primary/10 text-primary text-xs sm:text-sm font-bold rounded-full mb-8 uppercase tracking-[0.18rem] font-space-grotesk"
            >
              Get in Touch
            </motion.span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold mb-9 tracking-tight text-primary leading-[1.1]">
              Ready to build <br className="hidden md:block" />
              something <span className="text-accent">extraordinary?</span>
            </h2>

            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
              I'm currently looking for new opportunities and freelance
              projects. Whether you have a specific idea or just want to chat
              about tech, my inbox is always open.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => navigate("/contact")}
                className="group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary/95 text-background px-7 py-4 rounded-full font-medium text-md hover:scale-102 transition-transform duration-200 cursor-pointer overflow-hidden"
              >
                <Briefcase size={20} />
                <span className="relative z-10">Let's Chat</span>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out] pointer-events-none"></div>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default LandingPage;
