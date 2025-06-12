import { FC } from "react";
import "./about.css";

const AboutPage: FC = () => {
  return (
    <div className="page-container">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About This Project</h1>
          <p>A MERN stack project to level up full stack development skills</p>
        </div>
      </section>
      <section className="about-section">
        <div className="about-content">
          <h2>📦 What is Rent-A-Caravan?</h2>
          <p>
            Rent-A-Caravan is a fictional car rental platform built with the
            MERN stack (MongoDB, Express, React, and Node.js). The goal of this
            project is to strengthen full stack development skills by designing,
            developing, and deploying a modern web app end-to-end.
          </p>

          <h2>🎯 Project Objectives</h2>
          <ul>
            <li>✅ Practice RESTful API design and backend architecture</li>
            <li>
              ✅ Improve frontend skills using React and component-based design
            </li>
            <li>✅ Build reusable UI components and custom hooks</li>
            <li>✅ Learn how to structure scalable codebases</li>
            <li>
              ✅ Deploy a functional and visually consistent MERN app using
              Vercel
            </li>
          </ul>

          <h2>🛠 Tech Stack</h2>
          <p>This project uses:</p>
          <ul className="tech-stack">
            <li>
              <strong>MongoDB</strong> for data storage
            </li>
            <li>
              <strong>Express</strong> for backend APIs
            </li>
            <li>
              <strong>React + TypeScript</strong> for the frontend UI
            </li>
            <li>
              <strong>Node.js</strong> as the runtime environment
            </li>
            <li>
              <strong>Multer</strong> for image uploads
            </li>
            <li>
              <strong>Context API</strong> for state management
            </li>
          </ul>
          <h2>🛠️ A Full-Stack Sandbox</h2>
          <p>
            This project is where I get hands-on with building REST APIs,
            handling data flows, managing state, and designing responsive UI/UX
            — all while simulating a real-world rental experience.
          </p>
          <p>
            Whether it’s adding booking logic, handling search performance with
            debounce, or thinking through user flows, Rent-A-Caravan lets me
            sharpen both front-end and back-end thinking.
          </p>
          <h2>🚗 Why Station Wagons?</h2>
          <p>
            This app centers around renting station wagons — not because they're
            sleek or popular, but precisely because they’re not. As a car
            enthusiast, I’ve always found wagons to be one of the ugliest
            chassis types out there. Still, I can’t deny their utility: perfect
            for road trips, camping, or hauling bulky gear.
          </p>
          <p>
            You might not want to <strong>own</strong> one, but you might
            definitely want to <strong>rent</strong> one. That contrast—between
            form and function—makes for a fun fictional product idea that lets
            me focus on solving real-world full-stack problems.
          </p>
        </div>
      </section>
      <section className="about-section contact-section">
        <div className="about-content">
          <h2>📬 You can check me out</h2>
          <div className="contact-icon-row">
            <a
              href="https://www.linkedin.com/in/darko-bozic/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <img src="/images/linkedin-black.png" alt="LinkedIn icon" />
            </a>
            <a
              href="https://github.com/DarkoJB"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <img src="/images/github-black.png" alt="GitHub icon" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
