// src/pages/ProductPage.tsx
import React from "react";
import Products from "../components/Products/Products";

const ProductPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tất cả sản phẩm</h1>
      <Products />
    </div>
  );
};

export default ProductPage;