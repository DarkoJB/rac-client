import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";
import CarsProvider from "./contexts/CarsContext.tsx";
import ToastProvider from "./contexts/ToastContext.tsx";
import LoaderProvider from "./contexts/LoaderContext.tsx";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home/Home.tsx"));
const Cars = lazy(() => import("./pages/Cars/Cars.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.tsx"));
const AboutPage = lazy(() => import("./pages/About/AboutPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.tsx"));

function App() {
  return (
    <>
      <LoaderProvider>
        <ToastProvider>
          <CarsProvider>
            <Navigation />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </CarsProvider>
        </ToastProvider>
      </LoaderProvider>
    </>
  );
}

export default App;
