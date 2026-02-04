import { motion } from "framer-motion";

const Terms = () => {
  const sections = [
    {
      title: "1. Agreement to Terms",
      content:
        "By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use this website.",
    },
    {
      title: "2. Intellectual Property",
      content:
        "All content on this website, including but not limited to text, graphics, logos, images, and code, is the property of Rahim Dev or its content suppliers and is protected by international copyright laws.",
    },
    {
      title: "3. Use of Content",
      content:
        "You are granted a limited, non-exclusive license to access and use the content for personal, non-commercial purposes. Any other use, including reproduction, modification, distribution, or transmission of the content, is strictly prohibited without prior written consent.",
    },
    {
      title: "4. Limitation of Liability",
      content:
        "In no event shall Rahim Dev be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website.",
    },
    {
      title: "5. Modifications",
      content:
        "We reserve the right to modify these Terms of Service at any time. Your continued use of the website after any changes indicates your acceptance of the new terms.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-200 pb-20">
      <section className="flex flex-col justify-center items-center sm:items-start max-w-lg sm:max-w-5xl mx-auto pt-10 px-5.5 sm:px-7">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-primary text-4xl sm:text-5xl text-center sm:text-left font-bold font-space-grotesk mb-4"
        >
          Terms of{" "}
          <span className="text-blue-600 dark:text-blue-500">Service</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-secondary text-md mb-10"
        >
          Last Updated: 4<sup>th</sup> February 2026
        </motion.p>

        <motion.hr
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full border-border mb-12 origin-left"
        />

        <div className="flex flex-col gap-10">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="flex flex-col justify-center items-center sm:items-start gap-3"
            >
              <h2 className="text-primary text-2xl font-bold font-space-grotesk">
                {section.title}
              </h2>
              <p className="text-secondary text-md text-center sm:text-left max-w-3xl leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Terms;
