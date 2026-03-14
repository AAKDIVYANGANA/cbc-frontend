import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[70px] w-full flex items-center justify-between bg-gray-200 px-6 relative">

      {/* MOBILE MENU BUTTON */}
      <GiHamburgerMenu
        className="lg:hidden text-3xl text-accent cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      {/* DESKTOP NAV */}
      <div className="hidden lg:flex w-[500px] items-center justify-evenly text-accent text-xl">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact us</Link>
        <Link to="/reviews">Reviews</Link>
      </div>

      {/* CART ICON */}
      <Link to="/cart" className="text-3xl text-accent">
        <BsCart4 />
      </Link>

      {/* MOBILE SIDEBAR */}
      {isOpen && (
        <div className="fixed z-[9999] top-0 left-0 bg-[#00000060] w-full h-screen flex">

          <div className="w-[300px] h-full bg-white flex flex-col p-6">

            <GiHamburgerMenu
              className="text-3xl text-accent cursor-pointer mb-6"
              onClick={() => setIsOpen(false)}
            />

            <Link to="/" className="text-xl text-accent my-3">Home</Link>
            <Link to="/products" className="text-xl text-accent my-3">Products</Link>
            <Link to="/contact" className="text-xl text-accent my-3">Contact us</Link>
            <Link to="/reviews" className="text-xl text-accent my-3">Reviews</Link>
        

          </div>

        </div>
      )}

    </header>
  );
}