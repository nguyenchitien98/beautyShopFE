import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ScrollToTopButton from "./ScrollToTopButton";

const Menu = [
  // { id: 1, name: "Trang chủ", routeTo: "/" },
  { id: 2, name: "Bán chạy nhất", scrollTo: "products" },
  { id: 3, name: "Tốt nhất", scrollTo: "toprate" },
  { id: 4, name: "Sản phẩm mới", scrollTo: "discount" },
  { id: 5, name: "Phản hồi", scrollTo: "testimonials" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/products" },
  { id: 2, name: "Best Selling", link: "/#" },
  { id: 3, name: "Top Rated", link: "/#" },
];

type NavbarProps = {
  handleOrderPopup: () => void;
  cartCount: number;
};

const Navbar = ({ handleOrderPopup, cartCount }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false); // đóng menu sau khi chọn
  };

  const pathSegments = currentPath.split("/").filter(Boolean); // loại bỏ phần rỗng
  // Xử lý: loại bỏ ID ở cuối nếu là số
  const cleanSegments =
  pathSegments.length > 0 && /^\d+$/.test(pathSegments[pathSegments.length - 1])
  ? pathSegments.slice(0, -1)
  : pathSegments;

  // Mapping tiếng Việt và đường dẫn thực
  const segmentMap: { [key: string]: { label: string; path?: string } } = {
  product: { label: "Sản phẩm", path: "/products" }, // đúng route thực
  detail: { label: "Chi tiết sản phẩm" },
  cart: { label: "Giỏ hàng", path: "/cart" },
  login: { label: "Đăng nhập", path: "/login" },
  register: { label: "Đăng ký", path: "/register" },
  // thêm các route khác nếu cần
  };

  const breadcrumb = currentPath !== "/" && (
    <div className="container flex flex-wrap items-center gap-2 mt-4 text-sm">
      <Link to="/" className="text-primary hover:underline cursor-pointer">
        Trang chủ
      </Link>
      {cleanSegments.map((segment, index) => {
        const isLast = index === cleanSegments.length - 1;
        const pathTo = "/" + cleanSegments.slice(0, index + 1).join("/");
        const mapEntry = segmentMap[segment];
        const label = mapEntry?.label || segment;
  
        return (
          <React.Fragment key={index}>
            <span className="mx-1">{">"}</span>
            {isLast ? (
              <span className="capitalize">{label}</span>
            ) : (
              <Link
                to={mapEntry?.path || pathTo}
                className="text-primary hover:underline capitalize"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-white shadow-md">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex gap-2 items-center text-2xl font-bold">
            <img src={Logo} alt="Logo" className="w-10" />
            Shopsy
          </Link>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 group-hover:text-primary" />
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-3"
            >
              <FaCartShopping className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* DarkMode */}
            <DarkMode />

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden focus:outline-none p-2"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Login/Register Desktop */}
            <div className="gap-2 hidden md:flex">
              <Link
                to="/login"
                className="text-sm px-3 py-1 border border-primary text-primary rounded-full hover:bg-primary hover:text-white"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="text-sm px-3 py-1 border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      {currentPath === "/" && (
  <div data-aos="zoom-in" className="flex justify-center">
    <ul className="md:flex hidden items-center gap-4">
      {Menu.map((data) => (
        <li key={data.id}>
            <ScrollLink
              to={data.scrollTo as string}
              smooth={true}
              duration={500}
              offset={-80}
              className="inline-block px-4 hover:text-primary duration-200 cursor-pointer"
            >
              {data.name}
            </ScrollLink>
        </li>
      ))}
      <li className="group relative cursor-pointer">
        <Link to="#" className="flex items-center gap-[2px] py-2">
          Sản Phẩm
          <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
        </Link>
        <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
          <ul>
            {DropdownLinks.map((data) => (
              <li key={data.id}>
                <Link
                  to={data.link}
                  className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ul>
  </div>
)}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md z-40 py-4">
          <ul className="flex flex-col items-center gap-4">
            {Menu.map((item) =>
                <li key={item.id}>
                  <button onClick={() => scrollToSection(item.scrollTo!)}>{item.name}</button>
                </li>
            )}
            {DropdownLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.link} onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                Đăng ký
              </Link>
            </li>
          </ul>
        </div>
      )}

      {breadcrumb}
      <ScrollToTopButton />
    </div>
  );
};

export default Navbar;