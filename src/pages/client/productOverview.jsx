import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cart";

export default function ProductOverview() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!params.id) navigate("/products");
  }, [params.id, navigate]);

  useEffect(() => {
    if (params.id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${params.id}`)
        .then((res) => {
          const productData = res.data?.product || res.data;
          if (productData) {
            setProduct(productData);
            setStatus("loaded");
          } else {
            toast.error("Product not found!");
            setStatus("error");
          }
        })
        .catch(() => {
          toast.error("Product is not available!");
          setStatus("error");
        });
    }
  }, [params.id]);

  if (status === "loading") return (
    <div className="w-full h-screen flex items-center justify-center" style={{ background: "#fdf6f9" }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: "#f0c4d8", borderTopColor: "#e879a0" }} />
        <p className="text-sm font-semibold" style={{ color: "#c4527a", fontFamily: "'Georgia', serif" }}>
          Loading product...
        </p>
      </div>
    </div>
  );

  if (status === "error" || !product) return (
    <div className="w-full h-screen flex flex-col items-center justify-center"
      style={{ background: "#fdf6f9", fontFamily: "'Georgia', serif" }}>
      <div className="text-5xl mb-4">🌸</div>
      <h2 className="text-xl font-bold mb-2" style={{ color: "#3d1a2e" }}>Product not found</h2>
      <p className="text-sm mb-6" style={{ color: "#c4527a" }}>This product may no longer be available.</p>
      <button
        onClick={() => navigate("/products")}
        className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}
      >
        Browse Products
      </button>
    </div>
  );

  const discountPercent = product.labeledPrice > product.price
    ? Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100)
    : 0;

  return (
    <div className="w-full min-h-screen" style={{ background: "#fdf6f9", fontFamily: "'Georgia', serif" }}>

      
      <div className="flex flex-col md:hidden px-4 py-8">

        
        <p className="text-xs mb-4" style={{ color: "#c4527a" }}>
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/")}>Home</span>
          {" / "}
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/products")}>Products</span>
          {" / "}
          <span style={{ color: "#3d1a2e" }}>{product.name}</span>
        </p>

      
        <div className="w-full rounded-2xl overflow-hidden mb-6"
          style={{ border: "1px solid #f0c4d8" }}>
          <ImageSlider images={product.images} />
        </div>

        
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#1a0a0f" }}>{product.name}</h1>
        {product.altNames?.length > 0 && (
          <p className="text-sm mb-4" style={{ color: "#c4527a" }}>{product.altNames.join(" | ")}</p>
        )}

        
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold" style={{ color: "#e879a0" }}>
            LKR {product.price.toFixed(2)}
          </span>
          {product.labeledPrice > product.price && (
            <>
              <span className="text-base line-through" style={{ color: "#c4527a", opacity: 0.5 }}>
                LKR {product.labeledPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold px-2 py-1 rounded-lg text-white"
                style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}>
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#6b2d4a" }}>{product.description}</p>

        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all"
            style={{ background: "rgba(232,121,160,0.15)", color: "#e879a0", border: "1px solid #f0c4d8" }}
            onClick={() => { addToCart(product, 1); toast.success("Added to cart"); }}
          >🛒 Add to Cart</button>
          <button
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all"
            style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)", boxShadow: "0 4px 16px rgba(232,121,160,0.4)" }}
            onClick={() => navigate("/checkOut", { state: { items: [{ ...product, quantity: 1 }] } })}
          >Buy Now 🌸</button>
        </div>
      </div>

      
      <div className="hidden md:flex w-full max-w-[1100px] mx-auto px-10 py-14 gap-14 items-start">

        
        <div className="w-[480px] flex-shrink-0">
          <div className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid #f0c4d8", boxShadow: "0 8px 40px rgba(232,121,160,0.12)" }}>
            <ImageSlider images={product.images} />
          </div>
        </div>

        
        <div className="flex-1 flex flex-col">

          
          <p className="text-xs mb-5" style={{ color: "#c4527a" }}>
            <span className="cursor-pointer hover:underline" onClick={() => navigate("/")}>Home</span>
            {" / "}
            <span className="cursor-pointer hover:underline" onClick={() => navigate("/products")}>Products</span>
            {" / "}
            <span style={{ color: "#3d1a2e" }}>{product.name}</span>
          </p>

          
          <h1 className="text-4xl font-bold mb-2 leading-tight" style={{ color: "#1a0a0f" }}>
            {product.name}
          </h1>
          {product.altNames?.length > 0 && (
            <p className="text-sm mb-2" style={{ color: "#c4527a" }}>
              {product.altNames.join(" | ")}
            </p>
          )}

          <div className="w-12 h-[2px] rounded-full mb-6"
            style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />

          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold" style={{ color: "#e879a0" }}>
              LKR {product.price.toFixed(2)}
            </span>
            {product.labeledPrice > product.price && (
              <>
                <span className="text-xl line-through" style={{ color: "#c4527a", opacity: 0.5 }}>
                  LKR {product.labeledPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl text-white"
                  style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}>
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          
          <div
            className="rounded-2xl p-5 mb-8"
            style={{ background: "#fff", border: "1px solid #f0c4d8" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#e879a0" }}>
              Description
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#6b2d4a" }}>
              {product.description}
            </p>
          </div>

          
          <div className="flex gap-3 mb-8">
            {["🌿 Natural", "✨ Premium", "💎 Cruelty Free"].map((tag) => (
              <span key={tag}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: "#fdf0f5", color: "#c4527a", border: "1px solid #f0c4d8" }}>
                {tag}
              </span>
            ))}
          </div>

          
          <div className="flex gap-4">
            <button
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "transparent",
                color: "#e879a0",
                border: "1.5px solid #f0c4d8",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#fdf0f5"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              onClick={() => { addToCart(product, 1); toast.success("Added to cart"); }}
            >
              🛒 Add to Cart
            </button>
            <button
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #e879a0, #c4527a)",
                boxShadow: "0 6px 24px rgba(232,121,160,0.4)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              onClick={() => navigate("/checkOut", { state: { items: [{ ...product, quantity: 1 }] } })}
            >
              Buy Now 🌸
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}