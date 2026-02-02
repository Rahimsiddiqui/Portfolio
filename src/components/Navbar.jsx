import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll locking when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Handle scroll for sticky navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isActive = (link) => {
    return location.pathname === link;
  };

  const btns = [
    { label: "Home", link: "/" },
    { label: "Projects", link: "/projects" },
    { label: "About", link: "/about" },
    { label: "Blogs", link: "/blogs" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border"
          : "bg-background border-transparent"
      }`}
    >
      <div
        className={`px-5.5 sm:px-7 py-5 flex justify-between items-center max-w-7xl mx-auto ${
          isScrolled ? "" : "pb-7 md:pb-8 md:pt-6"
        } transition-all duration-200`}
      >
        {/* Desktop Navigation */}
        <nav className="flex justify-between items-center relative w-full z-200">
          <div>
            <p
              className="font-black text-xl sm:text-2xl opacity-95 hover:opacity-100 transition-opacity duration-200 font-space-grotesk tracking-tight cursor-pointer"
              onClick={() => navigate("/")}
            >
              Rahim Dev
            </p>
          </div>
          <div className="flex flex-row ml-auto justify-center items-center gap-2 sm:gap-3 md:gap-6">
            <div className="hidden md:flex flex-row justify-center items-center gap-7">
              {btns.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => {
                    navigate(btn.link);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-full text-md ${isActive(btn.link) ? "text-primary font-semibold" : "text-secondary hover:text-primary/80"} transition-colors duration-200 font-medium cursor-pointer`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-surface transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 sm:w-5.75 sm:h-5.75" />
              ) : (
                <Sun className="w-5 h-5 sm:w-5.75 sm:h-5.75" />
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 rounded-full cursor-pointer hover:bg-surface transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-5.75 sm:h-5.75" />
              ) : (
                <Menu className="w-5 h-5 sm:w-5.75 sm:h-5.75" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background w-full h-full"
          >
            <div className="flex flex-col items-center gap-6.5">
              {btns.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => {
                    navigate(btn.link);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-full font-space-grotesk transition-colors duration-200 text-xl ${isActive(btn.link) ? "text-primary font-semibold" : "text-secondary hover:text-primary/80"} font-medium cursor-pointer transition-colors duration-200`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
