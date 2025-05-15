// src/pages/ProductPage.tsx
import React from "react";
import ProductsCopy from "../components/Products/ProductsCopy";

const ProductPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tất cả sản phẩm</h1>
      <ProductsCopy />
    </div>
  );
};

export default ProductPage;