// src/components/Products/Products.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { setProducts, setLoading, setError, Product } from '../../features/product/productSlice';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get('http://localhost:8080/api/products');
        console.log(response)
        const formatted: Product[] = response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.imageUrl,
          description: item.description,
          averageRating: item.averageRating
        }));
        dispatch(setProducts(formatted));
      } catch (err) {
        dispatch(setError('Không thể tải danh sách sản phẩm'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div id="products" className="mt-14 mb-12 py-10">
          <div className="container">
            {/* Header section */}
            <div className="text-center mb-10 max-w-[600px] mx-auto">
              <p data-aos="fade-up" className="text-sm text-primary">
                Top Selling Products for you
              </p>
              <h1 data-aos="fade-up" className="text-3xl font-bold">
                Products
              </h1>
              <p data-aos="fade-up" className="text-xs text-gray-400">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
                asperiores modi Sit asperiores modi
              </p>
            </div>
            {/* Body section */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
                {/* card section */}
                {products.map((product, index) => (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 200}
                    key={product.id}
                    className="space-y-3"
                  >
                    <img
                      src={`http://localhost:8080${product.image}`} 
                      alt={product.name}
                      className="h-[220px] w-[150px] object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">Giá: {product.price}</p>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span>{product.averageRating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* view all button */}
              <div className="flex justify-center">
                <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
                  Xem thêm sản phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Products;