import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const isActive = (link: string) => {
    return location.pathname === link;
  };

  const socialLinks = [
    {
      icon: <Twitter size={20} />,
      href: "https://x.com/rahimdeveloper",
      label: "Twitter",
    },
    {
      icon: <Github size={20} />,
      href: "https://github.com/rahimsiddiqui",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/in/rahimdeveloper",
      label: "LinkedIn",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:rahimsiddiqui122@gmail.com",
      label: "Email",
    },
  ];

  const siteLinks = [
    {
      title: "Explore",
      content: [
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Legal",
      content: [
        { name: "Terms", href: "/terms" },
        { name: "Privacy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="w-full pb-10 pt-16 px-5.5 sm:px-7 border-t border-border bg-surface transition-colors duration-200">
      <div className="mx-auto flex max-w-6xl flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-6">
          <p
            className="font-black text-2xl sm:text-3xl opacity-95 hover:opacity-100 transition-opacity duration-200 font-space-grotesk tracking-tight cursor-pointer text-primary"
            onClick={() => navigate("/")}
          >
            Rahim Dev
          </p>
          <p className="text-secondary text-md max-w-md text-center md:text-left font-medium">
            Crafting digital experiences with clarity, precision, and soul.
            Specializing in scalable frontend architecture, design systems, and
            minimalist interfaces.
          </p>
          <a
            href="mailto:rahimsiddiqui122@gmail.com"
            className="inline-flex items-center gap-3 text-primary font-medium group px-5 py-3 bg-background/80 border border-border rounded-full hover:border-border-secondary transition-all duration-300"
          >
            {window.innerWidth >= 450 && <Mail size={20} />}
            <span>rahimsiddiqui122@gmail.com</span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-center gap-10 md:gap-30 lg:gap-48 md:mx-20 items-center md:items-start text-center md:text-left lg:mr-40 xl:mr-50">
          {siteLinks.map((section, idx) => (
            <div key={idx}>
              <p className="text-md text-primary font-medium mb-4">
                {section.title}
              </p>
              <div className="flex flex-col gap-3.5">
                {section.content.map((link, linkIdx) => (
                  <Link
                    key={linkIdx}
                    to={link.href}
                    className={`hover:text-primary ${isActive(link.href) ? "text-primary font-semibold" : "text-secondary"} transition-colors duration-200 text-sm`}
                    aria-label={link.name}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="w-full border-border my-10 mb-5 max-w-6xl mx-auto" />
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-6 md:gap-0 justify-between items-center">
        <p className="text-secondary/80 text-sm font-medium">
          © {currentYear} Rahim Dev. All rights reserved.
        </p>
        <p className="text-sm text-secondary">
          Built with React • Tailwind • Motion
        </p>
        <div className="flex items-center gap-2">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-secondary hover:text-primary transition-colors duration-200 p-2 hover:bg-surface rounded-full"
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
