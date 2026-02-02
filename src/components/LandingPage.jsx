import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const part1 = "👋Hi, I am ";
  const part2 = "Rahim!";
  const fullLength = part1.length + part2.length;

  useEffect(() => {
    if (index < fullLength) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 70);
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
    <div className="min-h-screen bg-background px-5.5 pt-3.5">
      <section className="flex flex-col justify-center items-center">
        <p className="uppercase text-xs text-secondary tracking-widest font-semibold">
          Fullstack developer
        </p>
        <div className="text-4xl text-center md:text-left font-bold mt-2.5 font-space-grotesk leading-14 tracking-tight min-h-10">
          {t1.includes("👋") ? (
            <>
              <motion.span
                className="inline-block cursor-default"
                whileHover={{
                  rotate: [0, 8, -8, 8, -4, 8, 0],
                  transition: {
                    duration: 0.9,
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
            <span className="inline-block w-[3px] h-10 bg-blue-600 ml-0.5 -mb-1 animate-pulse"></span>
          )}
        </div>

        <p
          className={`text-lg text-center md:text-left text-secondary mt-5 transition-all duration-700 ease-out ${
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
          className={`flex flex-col md:flex-row gap-4.5 mt-7.5 transition-all duration-1000 ease-out delay-200 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            className="group flex items-center gap-2 bg-primary hover:bg-primary/95  dark:hover:bg-primary/90 cursor-pointer px-10 py-4 text-background rounded-full font-medium hover:scale-102 transition-all duration-200"
            onClick={() => navigate("/projects")}
          >
            View Work
            <span className="inline-block mt-[0.065rem] group-hover:translate-x-1 transition-transform duration-200">
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
            className="bg-surface text-primary border border-border px-10 py-4 rounded-full font-medium transition-all hover:scale-102 cursor-pointer hover:border-border-secondary"
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
