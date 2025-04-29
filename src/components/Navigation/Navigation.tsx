import { FC } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

const navigationLinks = [
  { path: "/", label: "Home" },
  { path: "/cars", label: "Browse Cars" },
  { path: "/dashboard", label: "My Dashboard" },
  { path: "/login", label: "Sign In" },
];

const Navigation: FC = () => {
  const Logo = () => (
    <div className="logo">
      <img
        src="/images/logo.webp"
        alt="Rent a Caravan Logo"
        className="logo-image"
      />
      <span className="logo-text">Rent a Caravan</span>
    </div>
  );

  return (
    <header className="navigation">
      <Logo />
      <nav className="nav-links">
        {navigationLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={link.path === "/login" ? "nav-button" : "nav-link"}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navigation;
