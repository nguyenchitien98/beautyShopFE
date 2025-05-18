// src/components/Products/Products.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../app/store';
import { setProducts, setLoading, setError, Product } from '../../features/product/productSlice';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Category } from '../../types/category';

const ListProducts = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const navigate = useNavigate();

  // State cho danh mục, tìm kiếm và phân trang
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch danh mục sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ data: Category[] }>('http://localhost:8080/api/categories');
        setCategories(response.data.data);
      } catch (err) {
        console.error('Không thể tải danh mục sản phẩm');
      }
    };
    fetchCategories();
  }, []);

  // Fetch sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get('http://localhost:8080/api/products');
        const formatted: Product[] = response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.imageUrl,
          description: item.description,
          averageRating: item.averageRating,
          discountPrice: item.discountPrice,
          categoryId: item.categoryId,
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

  // Lọc sản phẩm theo danh mục và từ khóa tìm kiếm
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset trang về đầu khi thay đổi danh mục hoặc tìm kiếm
    useEffect(() => {
            setCurrentPage(1);
        }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen container flex gap-6 mt-14 mb-12 py-10">
      {/* Sidebar */}
      <aside className="w-1/4">
            {/* Tiêu đề tìm kiếm */}
            <h2 className="text-lg font-bold mb-2">Tìm kiếm sản phẩm</h2>

            {/* Ô tìm kiếm */}
            <div className="mb-6">
                <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên sản phẩm..."
                className="w-full p-2 border rounded"
                />
            </div>

            {/* Tiêu đề danh mục */}
            <h2 className="text-lg font-bold mb-4">Danh mục</h2>
            <ul className="space-y-2">
                {/* Nút "Tất cả sản phẩm" */}
                <li>
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-4 py-2 rounded ${
                    selectedCategory === null ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                >
                    Tất cả sản phẩm
                </button>
                </li>

                {/* Danh mục khác */}
                {categories.map((category) => (
                <li key={category.id}>
                    <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-4 py-2 rounded ${
                        selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                    >
                    {category.name}
                    </button>
                </li>
                ))}
            </ul>
            </aside> 

      {/* Main Content */}
      <main className="w-3/4">
        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[600px]">
          {paginatedProducts.map((product, index) => (
            <div
            key={product.id}
            className="group w-[150px]"
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            {/* Phần ảnh & nút overlay */}
            <div className="relative h-[220px]">
              <img
                src={`http://localhost:8080${product.image}`}
                alt={product.name}
                className="h-full w-full object-cover rounded-md transition duration-300 group-hover:opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 space-x-2">
                <button className="bg-primary text-white py-1 px-2 text-sm rounded">Order</button>
                <button
                  onClick={() => navigate(`/product/detail/${product.id}`)}
                  className="bg-white text-primary py-1 px-2 text-sm rounded border border-primary"
                >
                  Chi tiết
                </button>
              </div>
            </div>
          
            {/* Thông tin sản phẩm */}
            <div className="mt-2 text-center">
              <h3 className="font-semibold">{product.name}</h3>
              <div className="text-sm">
                {product.discountPrice ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-500 line-through">{product.price}₫</span>
                    <span className="text-red-500 font-semibold">{product.discountPrice}₫</span>
                  </div>
                ) : (
                  <span className="text-gray-600">{product.price}₫</span>
                )}
              </div>
              <div className="flex items-center justify-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{product.averageRating}</span>
              </div>
            </div>
          </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListProducts;