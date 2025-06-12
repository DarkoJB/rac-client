import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import useCars from "../../hooks/useCars";
import CarCard from "../../components/CarCard/CarCard";
import { iCarModel } from "../../shared/interfaces";

const Home: FC = () => {
  useEffect(() => {}, []);
  const existingCars = useCars(4);

  const [cars, setCars] = useState<iCarModel[]>([]);

  useEffect(() => {
    setCars(existingCars.cars);
  }, [existingCars]);

  const Hero = () => (
    <section className="hero">
      <div className="hero-content">
        <h1>Drive in Style</h1>
        <p>Premium Station Wagons for Every Journey</p>
        <Link to="/cars" className="hero-button">
          Explore Our Fleet
        </Link>
        <Link to="/about" className="hero-button inverse">
          Find out more
        </Link>
      </div>
    </section>
  );

  // TODO: Rethink and redesign the Features section
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
          {cars.map((car, index) => (
            <CarCard car={car} key={index} />
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
