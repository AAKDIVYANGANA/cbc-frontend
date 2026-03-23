import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LandingPage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((res) => {
            setFeaturedProducts(res.data.slice(0, 4));
        }).catch(() => {});
    }, []);

    return (
        <div className="w-full overflow-y-auto h-full" style={{ fontFamily: "'Georgia', serif" }}>

            
            <div
                className="w-full relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[620px] px-6"
                style={{ background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 45%, #6b2d4a 75%, #c4527a 100%)" }}
            >
            
                <div className="absolute top-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #f9a8c9, transparent)" }} />
                <div className="absolute bottom-[-40px] right-[-40px] w-[280px] h-[280px] rounded-full opacity-15"
                    style={{ background: "radial-gradient(circle, #f472b6, transparent)" }} />
                <div className="absolute top-[30%] left-[8%] w-[100px] h-[100px] rounded-full opacity-10 border border-pink-300" />
                <div className="absolute top-[15%] right-[12%] w-[70px] h-[70px] rounded-full opacity-10 border border-pink-200" />
                <div className="absolute bottom-[20%] left-[20%] w-[50px] h-[50px] rounded-full opacity-10 border border-pink-300" />

            
                {["top-[12%] left-[25%]", "top-[60%] right-[20%]", "bottom-[25%] right-[35%]", "top-[35%] left-[5%]"].map((pos, i) => (
                    <span key={i} className={`absolute ${pos} text-pink-300 opacity-30 text-xl`}
                        style={{ animation: `bounce ${2.5 + i * 0.5}s infinite` }}>✦</span>
                ))}

                <div className="relative z-10 max-w-2xl mx-auto">
                    <span className="text-xs font-semibold tracking-[0.35em] uppercase mb-5 block"
                        style={{ color: "#f9a8c9", letterSpacing: "0.3em" }}>
                        ✦ &nbsp; Welcome to &nbsp; ✦
                    </span>
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-5 leading-tight">
                        Crystal <span style={{ color: "#f9a8c9" }}>Beauty</span><br />Clear
                    </h1>
                    <div className="w-20 h-[2px] mx-auto mb-6 rounded-full"
                        style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                    <p className="text-lg leading-relaxed mb-10 max-w-md mx-auto" style={{ color: "#f0c4d8" }}>
                        Premium beauty crafted for your skin. Natural ingredients, luxurious results.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-10 py-4 rounded-full font-semibold text-base text-white transition-all"
                        style={{
                            background: "linear-gradient(135deg, #e879a0, #c4527a)",
                            boxShadow: "0 6px 30px rgba(232,121,160,0.5)",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        Shop Now
                    </button>
                </div>

            
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px]">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#fdf6f9" />
                    </svg>
                </div>
            </div>

        
            <div className="w-full py-12 px-6" style={{ background: "#fdf6f9" }}>
                <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
                    {[
                        { icon: "🌿", label: "Natural Ingredients", desc: "100% pure & organic" },
                        { icon: "✨", label: "Premium Quality", desc: "Dermatologist tested" },
                        { icon: "💝", label: "Cruelty Free", desc: "Ethically sourced" },
                    ].map((item) => (
                        <div key={item.label}
                            className="flex flex-col items-center gap-2 py-6 px-4 rounded-2xl"
                            style={{ background: "#fff", boxShadow: "0 4px 20px rgba(232,121,160,0.08)", border: "1px solid #f0c4d8" }}>
                            <span className="text-4xl mb-1">{item.icon}</span>
                            <span className="text-sm font-bold" style={{ color: "#6b2d4a" }}>{item.label}</span>
                            <span className="text-xs" style={{ color: "#c4527a" }}>{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            
            <div className="w-full py-16 px-6" style={{ background: "#fff" }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: "#e879a0" }}>
                            Our Collection
                        </span>
                        <h2 className="text-4xl font-bold mb-3" style={{ color: "#1a0a0f" }}>Featured Products</h2>
                        <div className="w-16 h-1 mx-auto rounded-full"
                            style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
                    </div>

                    {featuredProducts.length === 0 ? (
                        <div className="flex justify-center py-12">
                            <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                                style={{ borderColor: "#f0c4d8", borderTopColor: "#e879a0" }} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <div
                                    key={product.productId}
                                    onClick={() => navigate(`/overview/${product.productId}`)}
                                    className="rounded-3xl cursor-pointer overflow-hidden group transition-all duration-300"
                                    style={{
                                        background: "#fff",
                                        border: "1px solid #f0c4d8",
                                        boxShadow: "0 4px 16px rgba(232,121,160,0.08)",
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 40px rgba(232,121,160,0.25)"}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,121,160,0.08)"}
                                >
                                    <div className="w-full h-52 overflow-hidden"
                                        style={{ background: "linear-gradient(135deg, #fdf0f5, #fce7f3)" }}>
                                        <img
                                            src={product.image || product.images?.[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/300x300?text=CBC"; }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-sm truncate mb-1" style={{ color: "#3d1a2e" }}>
                                            {product.name}
                                        </h3>
                                        <p className="font-bold text-base" style={{ color: "#e879a0" }}>
                                            LKR {product.price?.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate("/products")}
                            className="px-12 py-4 rounded-full font-semibold text-base text-white transition-all"
                            style={{
                                background: "linear-gradient(135deg, #e879a0, #c4527a)",
                                boxShadow: "0 6px 24px rgba(232,121,160,0.4)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            View All Products
                        </button>
                    </div>
                </div>
            </div>

        
            <div
                className="w-full py-20 px-6 text-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 50%, #6b2d4a 100%)" }}
            >
                <div className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-5"
                    style={{ background: "white", transform: "translate(-50%,-50%)" }} />
                <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-5"
                    style={{ background: "white", transform: "translate(33%,33%)" }} />
                <div className="max-w-2xl mx-auto relative z-10">
                    <span className="text-xs font-bold tracking-widest uppercase block mb-4" style={{ color: "#f9a8c9" }}>
                        Our Promise
                    </span>
                    <h2 className="text-4xl font-bold text-white mb-5">Why Crystal Beauty Clear?</h2>
                    <div className="w-16 h-[2px] mx-auto mb-6 rounded-full"
                        style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                    <p className="text-lg leading-relaxed" style={{ color: "#f0c4d8" }}>
                        We believe beauty starts with clean, natural ingredients. Every product is carefully
                        formulated to nourish and enhance your natural glow.
                    </p>

                    <div className="grid grid-cols-3 gap-6 mt-12">
                        {[
                           
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl font-bold mb-1" style={{ color: "#f9a8c9" }}>{stat.number}</div>
                                <div className="text-sm" style={{ color: "#f0c4d8" }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            
            <div className="w-full py-8 px-6 text-center" style={{ background: "#0f0508" }}>
                <div className="text-2xl mb-3">🌸</div>
                <p className="font-bold mb-1" style={{ color: "#f9a8c9", fontFamily: "'Georgia', serif" }}>
                    Crystal Beauty Clear
                </p>
                <p className="text-xs" style={{ color: "#6b2d4a" }}>
                    © 2024 Crystal Beauty Clear. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default function HomePage() {
    return (
        <div className="w-full h-screen">
            <Header />
            <div className="w-full h-[calc(100vh-70px)] overflow-y-auto">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkOut" element={<CheckoutPage />} />
                    <Route path="/*" element={<h1>404 not found</h1>} />
                </Routes>
            </div>
        </div>
    );
}