import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import { FaBars, FaTimes } from "react-icons/fa";
import useSwipe from "../../hooks/useSwipe";

const navigationLinks = [
  { path: "/", label: "Home" },
  { path: "/cars", label: "Browse Cars" },
  { path: "/dashboard", label: "My Dashboard" },
  { path: "/login", label: "Sign In" },
];

const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Toggle body scroll based on menu state
    if (isMenuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const swipeHandlers = useSwipe({
    onSwipedRight: toggleMenu,
  });

  const Logo = () => (
    <Link to="/" className="logo">
      <img
        src="/images/logo.webp"
        alt="Rent a Caravan Logo"
        className="logo-image"
      />
      <span className="logo-text">Rent a Caravan</span>
    </Link>
  );

  return (
    <header className="navigation">
      <Logo />
      <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav
        {...swipeHandlers}
        className={`nav-links ${isMenuOpen ? "active" : ""}`}
      >
        {navigationLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={link.path === "/login" ? "nav-button" : "nav-link"}
            onClick={toggleMenu}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navigation;
