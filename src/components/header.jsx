import { Link, useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Contact Us" },
    { to: "/reviews", label: "Reviews" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className="h-[70px] w-full flex items-center justify-between px-8 relative z-50"
        style={{
          background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 60%, #6b2d4a 100%)",
          boxShadow: "0 4px 24px rgba(26,10,15,0.35)",
          fontFamily: "'Georgia', serif",
        }}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-xl font-bold" style={{ color: "#f9a8c9" }}>
            Crystal Beauty
          </span>
          <span className="text-xl font-bold text-white"> Clear</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-semibold relative group transition-all"
              style={{ color: isActive(link.to) ? "#f9a8c9" : "#f0c4d8" }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300"
                style={{
                  width: isActive(link.to) ? "100%" : "0%",
                  background: "linear-gradient(to right, #f9a8c9, #e879a0)",
                }}
              />
              
              <style>{`
                .nav-link-${link.to.replace("/", "nav")}:hover span { width: 100% !important; }
              `}</style>
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <UserData />

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all"
            style={{ color: "#f9a8c9" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(249,168,201,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <BsCart4 className="text-2xl" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all"
            style={{ color: "#f9a8c9" }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(249,168,201,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <GiHamburgerMenu className="text-xl" />
          </button>
        </div>
      </header>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex"
          style={{ background: "rgba(26,10,15,0.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setIsOpen(false)}
        >
          {/* SIDEBAR PANEL */}
          <div
            className="w-[290px] h-full flex flex-col"
            style={{
              background: "linear-gradient(160deg, #1a0a0f 0%, #3d1a2e 60%, #6b2d4a 100%)",
              boxShadow: "4px 0 40px rgba(26,10,15,0.5)",
              fontFamily: "'Georgia', serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* SIDEBAR HEADER */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(249,168,201,0.15)" }}
            >
              <div>
                <span className="text-base font-bold" style={{ color: "#f9a8c9" }}>Crystal Beauty</span>
                <span className="text-base font-bold text-white"> Clear</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                style={{ color: "#f9a8c9" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(249,168,201,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            {/* Decorative line */}
            <div className="mx-6 mt-1 h-[1px] rounded-full opacity-30"
              style={{ background: "linear-gradient(to right, #e879a0, transparent)" }} />

            {/* SIDEBAR LINKS */}
            <nav className="flex flex-col px-4 py-8 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    color: isActive(link.to) ? "#f9a8c9" : "#f0c4d8",
                    background: isActive(link.to) ? "rgba(249,168,201,0.1)" : "transparent",
                    border: isActive(link.to) ? "1px solid rgba(249,168,201,0.2)" : "1px solid transparent",
                  }}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="w-2 h-2 rounded-full"
                      style={{ background: "linear-gradient(135deg, #f9a8c9, #e879a0)" }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* SIDEBAR FOOTER */}
            <div className="mt-auto px-6 py-6"
              style={{ borderTop: "1px solid rgba(249,168,201,0.15)" }}>
              <div className="text-center">
                <div className="text-2xl mb-2">🌸</div>
                <p className="text-xs" style={{ color: "rgba(240,196,216,0.5)" }}>
                  © 2024 Crystal Beauty Clear
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}