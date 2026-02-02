import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <div className="px-5.5 sm:px-7 py-5 mb-2 flex justify-between items-center max-w-7xl mx-auto">
      <nav className="flex justify-between items-center relative w-full z-200">
        <div>
          <p
            className="font-black text-xl font-space-grotesk tracking-tight cursor-pointer"
            onClick={() => navigate("/")}
          >
            Rahim Dev
          </p>
        </div>
        <div className="flex flex-row ml-auto justify-center gap-2 items-center">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-surface transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2.5 rounded-full cursor-pointer hover:bg-surface transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-6.5">
            {btns.map((btn) => (
              <button
                key={btn.label}
                onClick={() => navigate(btn.link)}
                className={`rounded-full font-space-grotesk transition-colors duration-200 text-xl ${isActive(btn.link) ? "text-primary" : "text-secondary"} font-medium cursor-pointer`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
