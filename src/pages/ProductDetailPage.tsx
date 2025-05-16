// src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  imageUrl: string;
  brand: string;
  origin: string;
  skinType: string;
  weightOrVolume: string;
  isFeatured: boolean;
  tags: string[];
  categoryId: number;
  categoryName: string;
  averageRating: number;
};


const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        const item = response.data.data;

        const formatted: Product = {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          discountPrice: item.discountPrice,
          stockQuantity: item.stockQuantity,
          imageUrl: item.imageUrl,
          brand: item.brand,
          origin: item.origin,
          skinType: item.skinType,
          weightOrVolume: item.weightOrVolume,
          isFeatured: item.isFeatured,
          tags: item.tags,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          averageRating: item.averageRating,
        };

        setProduct(formatted);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        imageUrl: `http://localhost:8080${product.imageUrl}`,
        quantity: 1,
      }));
      alert('Đã thêm vào giỏ hàng!');
    }
  };

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center mt-10">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Hình ảnh */}
        <div>
          <img
            src={`http://localhost:8080${product.imageUrl}`}
            alt={product.name}
            className="w-full rounded-lg shadow"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2 text-yellow-500">
            <FaStar />
            <span className="text-sm">{product.averageRating}</span>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="text-xl font-semibold text-primary">
            {product.discountPrice ? (
              <div className="flex items-center gap-3">
                <span className="line-through text-gray-500 text-base">
                {product.price.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-red-500">{product.discountPrice.toLocaleString('vi-VN')}₫</span>
              </div>
            ) : (
              <span>{product.price.toLocaleString('vi-VN')}₫</span>
            )}
          </div>

          {/* Thông tin thêm */}
          <div className="text-sm space-y-1 text-gray-700">
            <p><strong>Thương hiệu:</strong> {product.brand}</p>
            <p><strong>Xuất xứ:</strong> {product.origin}</p>
            <p><strong>Loại da phù hợp:</strong> {product.skinType}</p>
            <p><strong>Thể tích/Khối lượng:</strong> {product.weightOrVolume}</p>
            <p><strong>Danh mục:</strong> {product.categoryName}</p>
            <p><strong>Còn lại trong kho:</strong> {product.stockQuantity} sản phẩm</p>
            <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-primary text-white py-2 px-6 rounded hover:bg-primary/90"
          >
            Đặt hàng ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;