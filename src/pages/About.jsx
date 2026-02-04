import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    duration: "2026 - Present",
    description:
      "Built and deployed production-ready websites and web apps for clients. Projects include Qubli AI – a modern AI-focused web platform with responsive UI, custom animations, and optimized performance using React, Tailwind CSS, and JavaScript.",
  },
];

const results = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Completed", value: "20+" },
  { label: "Happy Clients", value: "10+" },
  { label: "Cups of Coffee", value: "300+" },
];

const ResultCard = ({ result, index, isLargeScreen }) => {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.2 }}
      initial={isLargeScreen ? "hidden" : false}
      whileInView={isLargeScreen ? "show" : false}
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
                  delay: index * 0.1,
                },
              },
            }
          : {}
      }
      className={`group relative flex flex-col bg-surface/30 backdrop-blur-sm border border-border/40 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 overflow-hidden ${
        !isLargeScreen && inView
          ? (index + 1) % 2 === 0
            ? "slide-in-right"
            : "slide-in-left"
          : ""
      }`}
      style={{
        opacity: isLargeScreen ? undefined : inView ? 1 : 0,
      }}
    >
      {/* Background Number */}
      <span className="absolute -top-4 -right-2 font-space-grotesk text-7xl font-bold text-primary/5 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2">
        0{index + 1}
      </span>

      <div className="relative z-10">
        <span className="text-4xl sm:text-5xl font-bold font-space-grotesk text-blue-600 dark:text-blue-500 mb-3 block">
          {result.value}
        </span>
        <span className="text-secondary text-sm lg:text-[0.75rem] font-bold uppercase tracking-widest font-space-grotesk">
          {result.label}
        </span>
      </div>

      {/* Decorative accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
};

const About = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="min-h-screen w-full h-full bg-background transition-colors duration-200">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center md:items-start max-w-[520px] md:max-w-5xl mx-auto pt-3 px-5.5">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-primary text-4xl sm:text-5xl font-bold font-space-grotesk"
        >
          About <span className="text-blue-600 dark:text-blue-500">Me!</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-primary/90 text-lg text-center md:text-left mt-6 sm:mt-7.5"
        >
          I'm a multidisciplinary developer with a passion for minimalism and
          clean code.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-secondary max-w-4xl text-center md:text-left text-md mt-6 sm:mt-7.5"
        >
          With over 2 years of experience in full-stack development, I bridge
          the gap between design and engineering. I believe that the best
          digital products are those that get out of the user's way, providing
          intuitive solutions to complex problems.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: window.innerWidth > 512 ? 0.5 : 0,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-secondary max-w-4xl text-center md:text-left text-md mt-6 sm:mt-5"
        >
          Currently, I'm exploring the intersection of Generative AI and UI
          interfaces, looking for ways to make interactions more human and
          contextual. When I'm not coding, you can find me taking photos,
          reading about architecture, or brewing the perfect cup of coffee.
        </motion.p>
      </section>

      {/* Experience Section */}
      <section className="flex flex-col justify-center items-center md:items-start max-w-5xl mx-auto px-5.5 mt-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: isLargeScreen ? 0.5 : 0,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-primary text-3xl sm:text-4xl mt-6 font-bold font-space-grotesk"
        >
          Experience
        </motion.h2>
        <motion.hr
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="w-full border-border mt-3 sm:mt-5 mb-7 max-w-6xl mx-auto"
        />
        {[...experiences]
          .sort((a, b) => {
            const yearA = parseInt(a.duration.split(" ")[0]);
            const yearB = parseInt(b.duration.split(" ")[0]);
            return yearB - yearA;
          })
          .map((experience, index) => (
            <motion.div
              initial={{ opacity: 0, x: (index + 1) % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: 0.1 * (index + 1),
                ease: [0.2, 0.8, 0.2, 1],
              }}
              key={index}
              className="flex flex-col lg:flex-row lg:gap-20 mb-8 lg:mb-13"
            >
              <div>
                <p className="text-secondary text-sm md:text-md mt-2 mb-3 font-mono">
                  {experience.duration}
                </p>
              </div>
              <div className="lg:max-w-xl">
                <h3 className="text-primary text-xl md:text-2xl font-bold font-space-grotesk">
                  {experience.title}
                </h3>
                <p className="text-secondary text-sm md:text-md mt-1 mb-4">
                  {experience.company}
                </p>
                <p className="text-secondary max-w-2xl text-md md:text-lg">
                  {experience.description}
                </p>
              </div>
            </motion.div>
          ))}
      </section>

      {/* Results Section */}
      <section className="flex flex-col justify-center items-center md:items-start pb-20 max-w-5xl mx-auto w-full px-5.5 mt-2.5 sm:mt-2">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-primary text-3xl sm:text-4xl font-bold font-space-grotesk"
        >
          The Results
        </motion.h2>
        <motion.hr
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="w-full border-border mt-3 sm:mt-5 mb-10 max-w-6xl mx-auto"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {results.map((result, index) => (
            <ResultCard
              key={index}
              result={result}
              index={index}
              isLargeScreen={isLargeScreen}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
