import { FC } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home: FC = () => {
  const featuredCars = [
    {
      id: 1,
      model: "Volvo V90",
      price: 80,
      seats: 5,
      image: "/images/volvo-v90.webp",
      year: 2022,
    },
    {
      id: 2,
      model: "VW Passat",
      price: 65,
      seats: 5,
      image: "/images/vw-passat.webp",
      year: 2021,
    },
    {
      id: 3,
      model: "Audi A6 Avant",
      price: 90,
      seats: 5,
      image: "/images/audi-a6-avant.webp",
      year: 2023,
    },
    {
      id: 4,
      model: "Mercedes E-Class Wagon",
      price: 95,
      seats: 5,
      image: "/images/mercedes-eclass.webp",
      year: 2023,
    },
  ];

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
        <h2>Featured Vehicles</h2>
        <div className="car-grid">
          {featuredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img
                src={car.image}
                alt={car.model}
                className="car-image"
                loading="lazy"
              />
              <div className="car-info">
                <h3>
                  {car.model} <span>({car.year})</span>
                </h3>
                <div className="car-specs">
                  <span>{car.seats} seats</span>
                  <span>${car.price}/day</span>
                </div>
                <Link to={`/cars/${car.id}`} className="view-button">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="home-container">
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
