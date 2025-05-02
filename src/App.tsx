import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";
import CarsProvider from "./contexts/CarsContext.tsx";
import ToastProvider from "./contexts/ToastContext.tsx";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home/Home.tsx"));
const Cars = lazy(() => import("./pages/Cars/Cars.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.tsx"));

function App() {
  return (
    <>
      <ToastProvider>
        <CarsProvider>
          <Navigation />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </CarsProvider>
      </ToastProvider>
    </>
  );
}

export default App;
