import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <>
      <header
        className={`sticky top-0 z-250 w-full transition-colors duration-200 border-b ${
          isScrolled || mobileMenuOpen
            ? "bg-background/80 backdrop-blur-md"
            : "bg-background"
        } ${
          isScrolled && !mobileMenuOpen ? "border-border" : "border-transparent"
        }`}
      >
        <div
          className={`px-5.5 sm:px-7 py-5 flex justify-between items-center max-w-7xl mx-auto ${
            isScrolled || mobileMenuOpen ? "" : "pb-7 md:pb-8 md:pt-6"
          } transition-all duration-200`}
        >
          {/* Desktop Navigation */}
          <nav className="flex justify-between items-center relative w-full">
            <div>
              <p
                className="font-black text-xl sm:text-2xl opacity-95 hover:opacity-100 transition-opacity duration-200 font-space-grotesk tracking-tight cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
              >
                Rahim Dev
              </p>
            </div>
            <div className="flex flex-row ml-auto justify-center items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6">
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
                className="hidden md:flex py-2 px-6 bg-primary hover:bg-primary/95 transition-all duration-200 hover:scale-102 rounded-full font-medium cursor-pointer text-background"
                onClick={() => navigate("/contact")}
              >
                Let's Talk
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
      </header>

      {/* Mobile Navigation Content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex flex-col items-center justify-end bg-background/60 backdrop-blur-sm md:hidden pointer-events-auto"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.8 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setMobileMenuOpen(false);
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-full bg-background border-t border-border rounded-t-[2.5rem] pb-14 p-12 flex flex-col items-center gap-9 shadow-[0_-15px_40px_-5px_rgba(0,0,0,0.2)] dark:shadow-[0_-15px_40px_-5px_rgba(0,0,0,0.7)] touch-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-1.5 bg-border rounded-full mb-2 opacity-60 cursor-grab active:cursor-grabbing" />
              <div className="flex flex-col items-center gap-7">
                {btns.map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => {
                      navigate(btn.link);
                      setMobileMenuOpen(false);
                    }}
                    className={`rounded-full font-space-grotesk transition-colors duration-200 text-xl ${isActive(btn.link) ? "text-primary font-bold" : "text-primary/80 font-medium hover:text-primary"} cursor-pointer transition-colors duration-200`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
