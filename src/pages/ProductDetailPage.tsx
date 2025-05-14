// src/pages/ProductDetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();

  // TODO: Fetch product detail by ID, placeholder below
  const product = {
    id,
    name: "Sản phẩm demo",
    price: 199000,
    description: "Mô tả chi tiết sản phẩm...",
    image: "/assets/product.jpg",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-64 mb-4" />
      <p className="text-xl font-semibold">Giá: {product.price.toLocaleString()}đ</p>
      <p className="mt-4 text-gray-700 dark:text-gray-300">{product.description}</p>
      <button className="mt-6 px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700">
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductDetailPage;