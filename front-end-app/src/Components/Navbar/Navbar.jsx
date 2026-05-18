import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets";
import { NavbarMenu } from "../../mockData/data";
import { useLanguage } from "../../useLanguage";

const Navbar = ({ currentSection, scrollToSection, isFixed }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { lang, toggle, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getSectionIdFromTitle = (title) => {
    switch (title.toLowerCase()) {
      case "home":
        return "home";
      case "program":
        return "program";
      case "transformation":
        return "transformation";
      case "about us":
        return "about-us";
      case "subscribe":
        return "subscribe";
      default:
        return title.toLowerCase().replace(/\s+/g, "-");
    }
  };

  const handleNavClick = (title) => {
    const sectionId = getSectionIdFromTitle(title);
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      navigate(`/?s=${sectionId}`);
    }
  };

  const handleInstagramClick = () =>
    window.open("https://www.instagram.com/coach_fitness_fb", "_blank");
  const handleTikTokClick = () =>
    window.open("https://www.tiktok.com/@coach.98fitness", "_blank");
  const handleFacebookClick = () =>
    window.open("https://www.facebook.com/fa.res.648560", "_blank");

  return (
    <nav
      className={`w-full z-50 transition-all duration-500
        ${isFixed ? "fixed top-0 left-0 right-0" : ""}
        ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-violet-900/40 shadow-lg shadow-violet-950/30"
            : "bg-black border-b border-gray-800/60"
        }`}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between h-20 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="w-16 flex-shrink-0">
          <img
            className="rounded-2xl ring-2 ring-violet-700/40 shadow-lg shadow-violet-900/30"
            src={assets.Logo}
            alt="logo"
          />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-2 text-white font-semibold uppercase">
          {NavbarMenu.map((item) => {
            const sectionId = getSectionIdFromTitle(item.title);
            const isActive = currentSection === sectionId;
            const isSubscribe = item.title === "Subscribe";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.title)}
                className={`px-5 py-2 rounded-2xl text-sm transition-all duration-300
                  ${
                    isSubscribe
                      ? "btn-violet font-bold tracking-wider shadow-md hover:shadow-violet-500/60"
                      : isActive
                        ? "bg-violet-700/30 text-violet-300 border border-violet-600/40"
                        : "hover:bg-violet-900/30 hover:text-violet-300 text-gray-300"
                  }
                `}
              >
                {t(sectionId) || item.title}
              </button>
            );
          })}
        </div>

        {/* Social icons + burger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-sm px-3 py-1 border rounded text-white"
          >
            {lang === "en" ? "EN / AR" : "AR / EN"}
          </button>
          <img
            onClick={handleFacebookClick}
            className="rounded-xl w-8 h-8 cursor-pointer hover:shadow-md hover:shadow-blue-500 transition hover:scale-110"
            src={assets.Facebook}
            alt="facebook"
          />
          <img
            onClick={handleInstagramClick}
            className="rounded-xl w-8 h-8 cursor-pointer hover:shadow-md hover:shadow-pink-500 transition hover:scale-110"
            src={assets.instagram}
            alt="instagram"
          />
          <img
            onClick={handleTikTokClick}
            className="rounded-xl w-8 h-8 cursor-pointer hover:shadow-md hover:shadow-gray-400 transition hover:scale-110"
            src={assets.tiktok}
            alt="tiktok"
          />

          {/* Burger button */}
          <button
            className="block md:hidden ml-2 p-2 rounded-lg hover:bg-violet-900/30 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <img src={assets.MenuIcon} alt="menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-violet-900/30 px-4 py-4">
          <ul className="flex flex-col gap-2 text-white font-semibold uppercase">
            {NavbarMenu.map((item) => {
              const sectionId = getSectionIdFromTitle(item.title);
              const isActive = currentSection === sectionId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`block w-full text-start px-4 py-3 rounded-xl transition-all text-sm
                      ${
                        item.title === "Subscribe"
                          ? "btn-violet font-bold"
                          : isActive
                            ? "bg-violet-700/30 text-violet-300 border border-violet-600/40"
                            : "hover:bg-violet-900/30 hover:text-violet-300 text-gray-300"
                      }
                    `}
                    onClick={() => {
                      handleNavClick(item.title);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t(sectionId) || item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
