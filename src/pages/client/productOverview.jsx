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
  }, [params.id]);

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

  if (status === "loading") return <Loader />;
  if (status === "error" || !product)
    return <div className="text-center mt-10 text-xl font-sans">Product not found</div>;

  return (
    <div className="w-full min-h-screen font-sans bg-white">

      {/* ======== MOBILE LAYOUT ======== */}
      <div className="flex flex-col md:hidden px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          {product.name}
          {product.altNames?.length > 0 && (
            <span className="text-gray-400 font-medium">
              {" | "}{product.altNames.join(" | ")}
            </span>
          )}
        </h1>
        <div className="w-full mb-6">
          <ImageSlider images={product.images} />
        </div>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xl font-bold text-gray-900">LKR: {product.price.toFixed(2)}</span>
          {product.labeledPrice > product.price && (
            <span className="text-lg line-through text-gray-400">LKR: {product.labeledPrice.toFixed(2)}</span>
          )}
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
        <div className="flex gap-3">
          <button
            className="flex-1 bg-[#b22a57] text-white py-3 rounded-md font-medium active:scale-95 transition-transform"
            onClick={() => { addToCart(product, 1); toast.success("Added to cart"); }}
          >Add to Cart</button>
          <button
            className="flex-1 bg-[#b22a57] text-white py-3 rounded-md font-medium active:scale-95 transition-transform"
            onClick={() => navigate("/checkout", { state: { items: [{ ...product, quantity: 1 }] } })}
          >Buy Now</button>
        </div>
      </div>

      {/* ======== DESKTOP LAYOUT ======== */}
      <div className="hidden md:flex flex-row items-center justify-center w-full max-w-[1200px] mx-auto px-10 py-8 gap-16">

        {/* LEFT - Image Slider */}
        <div className="w-1/2 max-w-[500px]">
          <ImageSlider images={product.images} />
        </div>

        {/* RIGHT - Details */}
        <div className="w-1/2 flex flex-col items-center text-center">
          {/* Product Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
            {product.altNames?.length > 0 && (
              <span className="text-gray-500 font-light">
                {" | "}{product.altNames.join(" | ")}
              </span>
            )}
          </h1>
          
          <h3 className="text-xl text-gray-500 mb-4 font-medium">Glow Cream</h3>

          {/* Pricing */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-bold text-gray-900">
              LKR: {product.price.toFixed(2)}
            </span>
            {product.labeledPrice > product.price && (
              <span className="text-xl line-through text-gray-400">
                LKR: {product.labeledPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-[450px]">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full justify-center">
            <button
              className="bg-[#b22a57] text-white px-10 py-3 rounded-lg font-semibold hover:opacity-70 transition-all min-w-[160px]"
              onClick={() => { addToCart(product, 1); toast.success("Product added to cart"); }}
            >
              Add to Cart
            </button>
            <button
              className="bg-[#b22a57] text-white px-10 py-3 rounded-lg font-semibold hover:opacity-70 transition-all min-w-[160px]"
              onClick={() => navigate("/checkout", { state: { items: [{ ...product, quantity: 1 }] } })}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}