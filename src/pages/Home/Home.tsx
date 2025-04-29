import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import useCars from "../../shared/useCars";
import CarCard from "../../components/CarCard/CarCard";

const Home: FC = () => {
  useEffect(() => {}, []);
  const cars = useCars(4);

  const Hero = () => (
    <section className="hero">
      <div className="hero-content">
        <h1>Drive in Style</h1>
        <p>Premium Station Wagons for Every Journey</p>
        <Link to="/cars" className="hero-button">
          Explore Our Fleet
        </Link>
      </div>
    </section>
  );

  // const Features = () => (
  //   <section className="features">
  //     <div className="feature-card">
  //       <div className="feature-icon">🚗</div>
  //       <h3>Top Models</h3>
  //       <p>Carefully selected vehicles from trusted brands</p>
  //     </div>
  //     <div className="feature-card">
  //       <div className="feature-icon">💰</div>
  //       <h3>Affordable Luxury</h3>
  //       <p>Transparent pricing and premium service</p>
  //     </div>
  //     <div className="feature-card">
  //       <div className="feature-icon">⚡</div>
  //       <h3>Instant Booking</h3>
  //       <p>Reserve your car in just a few clicks</p>
  //     </div>
  //   </section>
  // );

  const FeaturedCars = () => {
    return (
      <section className="featured-cars">
        <h1>Featured Vehicles</h1>
        <div className="car-grid">
          {cars.map((car) => (
            <CarCard car={car} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="page-container">
      <Hero />
      {/* <Features /> */}

      <FeaturedCars />

      <section className="cta-section">
        <h2>Adventure Awaits</h2>
        <Link to="/cars" className="cta-button">
          Book Your Station Wagon
        </Link>
      </section>
    </div>
  );
};

export default Home;
