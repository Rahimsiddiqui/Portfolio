import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  MapPin,
  Copy,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "rahimsiddiqui122@gmail.com",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "rahimsiddiqui122@gmail.com",
      link: "mailto:rahimsiddiqui122@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Karachi, Pakistan",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      link: "https://github.com/rahimsiddiqui",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      link: "https://linkedin.com/in/rahimdeveloper",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      link: "https://x.com/rahimdeveloper",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!");
  };

  return (
    <div className="min-h-screen w-full h-full bg-background transition-colors duration-200">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto pt-16 px-5.5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h1 className="text-primary text-4xl sm:text-5xl font-bold font-space-grotesk tracking-tight">
            Let's <span className="text-accent">Connect!</span>
          </h1>
          <p className="text-secondary text-lg max-w-lg mt-5">
            Have a project in mind or just want to chat about tech? I'm always
            open to new opportunities and collaborations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pb-24"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-10">
            <div>
              <h2 className="text-primary text-2xl font-bold font-space-grotesk mb-6">
                Contact Info
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-3 bg-surface border border-border rounded-xl text-accent">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-secondary text-[0.85rem] font-medium uppercase tracking-wide">
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          onClick={() => copyEmail(info.value)}
                          className="text-primary text-sm sm:text-md inline-flex justify-center items-center font-medium group cursor-pointer"
                        >
                          {info.value}
                          <Copy
                            size={16}
                            className="ml-3 group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                          />
                        </a>
                      ) : (
                        <p className="text-primary text-sm sm:text-md font-medium">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-primary text-xl font-bold font-space-grotesk mb-6">
                Follow Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-surface border border-border rounded-full text-secondary hover:text-primary hover:border-border-secondary transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative Card */}
            <div className="p-8 bg-blue-600/5 border border-blue-600/10 rounded-3xl hidden md:block">
              <p className="text-primary font-medium italic">
                "Design is not just what it looks like and feels like. Design is
                how it works."
              </p>
              <p className="text-secondary text-sm mt-4">— Steve Jobs</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-surface/30 backdrop-blur-xl border border-border/60 rounded-4xl py-8 px-4 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-secondary ml-1"
                  >
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 bg-background border border-border rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 text-primary"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-secondary ml-1"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-5 py-3.5 bg-background border border-border rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 text-primary"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-secondary ml-1"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    className="w-full px-5 py-3.5 bg-background border border-border rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 text-primary resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-background py-4 rounded-2xl font-medium text-md hover:scale-102 transition-transform duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
