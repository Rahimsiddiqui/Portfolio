import { motion } from "framer-motion";

const Privacy = () => {
  const sections = [
    {
      title: "1. Information Collection",
      content:
        "We may collect personal information such as your name and email address when you voluntarily provide it through our contact form. We also automatically collect certain information when you visit our website, such as your IP address and browsing behavior.",
    },
    {
      title: "2. Use of Information",
      content:
        "The information we collect is used to provide and improve our services, communicate with you, and personalize your experience. We do not sell or share your personal information with third parties for their marketing purposes.",
    },
    {
      title: "3. Cookies",
      content:
        "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
    },
    {
      title: "4. Data Security",
      content:
        "We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.",
    },
    {
      title: "5. Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. If you have any questions or requests regarding your privacy, please contact us.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-200 pb-20">
      <section className="flex flex-col justify-center items-center sm:items-start max-w-lg sm:max-w-5xl mx-auto pt-10 px-5.5 sm:px-7">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-primary text-5xl text-center sm:text-left font-bold font-space-grotesk mb-4"
        >
          Privacy <span className="text-accent">Policy</span>
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
              <h2 className="text-primary text-2xl text-center sm:text-left font-bold font-space-grotesk">
                {section.title}
              </h2>
              <p className="text-secondary text-md max-w-3xl text-center sm:text-left leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Privacy;
