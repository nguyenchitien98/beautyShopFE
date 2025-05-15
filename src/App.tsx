// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import ProductDetailPage from "./pages/ProductDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar cartCount={cartCount} handleOrderPopup={handleOrderPopup} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/detail" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
