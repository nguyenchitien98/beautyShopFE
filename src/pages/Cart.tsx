// src/components/Cart.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { removeFromCart, updateQuantity, setShippingFee, setDiscount } from '../features/cart/cartSlice';
import { FaTrash } from 'react-icons/fa';
import { CartItem } from '../types/cart';

const Cart = () => {
  const { items, shippingFee, discount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // Tính tổng giá trị của giỏ hàng
  const calculateTotal = () => {
    const totalPrice = items.reduce((sum: number, item: CartItem) => {
      return sum + (item.discountPrice ? item.discountPrice : item.price) * item.quantity;
    }, 0);
    return totalPrice + shippingFee - discount;
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleApplyDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discountCode = e.target.value;
    if (discountCode === 'DISCOUNT10') {
      dispatch(setDiscount(10)); // Áp dụng giảm giá 10%
    } else {
      dispatch(setDiscount(0)); // Nếu không có mã giảm giá
    }
  };

  useEffect(() => {
    // Giả lập tính phí vận chuyển (ở đây mình giả sử là 50,000đ)
    dispatch(setShippingFee(50000));
  }, [dispatch]);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      <div className="space-y-4">
        {items.map((item: CartItem) => (
          <div key={item.id} className="flex justify-between items-center py-4 border-b">
            <div className="flex gap-4">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.discountPrice ? (
                    <>
                      <span className="line-through text-gray-500">{item.price}₫</span>
                      <span className="text-red-500 ml-2">{item.discountPrice}₫</span>
                    </>
                  ) : (
                    <span>{item.price}₫</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 p-2 rounded"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 p-2 rounded"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 ml-4"
              >
                <FaTrash/>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            className="border p-2 rounded"
            onBlur={handleApplyDiscount}
          />
        </div>

        <div className="text-right">
          <p><strong>Tổng cộng:</strong> {calculateTotal()}₫</p>
          <p><strong>Phí vận chuyển:</strong> {shippingFee}₫</p>
          <p><strong>Mã giảm giá:</strong> {discount}₫</p>
          <button className="bg-primary text-white py-2 px-6 rounded mt-4">Tiến hành thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;