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

  // Redirect if no ID
  useEffect(() => {
    if (!params.id) {
      navigate("/products");
    }
  }, [params.id]);

  // Fetch product
  useEffect(() => {
    if (params.id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${params.id}`)
        .then((res) => {
          if (res.data && res.data.product) {
            setProduct(res.data.product);
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
    return <div className="text-center mt-10 text-xl">Product not found</div>;

  return (
    <div className="w-full h-full flex">
      {/* LEFT SIDE */}
      <div className="w-[50%] h-full">
        {product.images && product.images.length > 0 ? (
          <ImageSlider images={product.images} />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-500">
            No images available
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[50%] h-full p-[40px]">
        <h1 className="text-3xl font-bold text-center mb-[40px]">
          {product.name}{" "}
          <span className="text-3xl mr-[20px] text-gray-500">
            {product.altNames?.join(" | ")}
          </span>
        </h1>

        <div className="w-full flex justify-center mb-[40px]">
          {product.labeledPrice && product.labeledPrice > product.price ? (
            <>
              <h2 className="text-2xl mx-[20px]">
                LKR {product.price.toFixed(2)}
              </h2>
              <h2 className="text-2xl line-through text-gray-500">
                LKR {product.labeledPrice.toFixed(2)}
              </h2>
            </>
          ) : (
            <h2 className="text-2xl mx-[20px]">LKR {product.price.toFixed(2)}</h2>
          )}
        </div>

        <p className="text-lg text-gray-600 text-center mb-[40px]">
          {product.description}
        </p>

        <div className="w-full flex justify-center mb-[40px] gap-4">
          <button
            className="bg-pink-700 border border-pink-700 cursor-pointer text-white p-[12px] rounded-lg hover:bg-white hover:text-pink-800"
            onClick={() => {
              addToCart(product, 1);
              toast.success("Product added to cart");
            }}
          >
            Add to cart
          </button>

          <button
            className="bg-pink-700 border border-pink-700 cursor-pointer text-white p-[12px] rounded-lg hover:bg-white hover:text-pink-800"
            onClick={() =>
              navigate("/checkout", {
                state: {
                  items: [
                    {
                      productId: product.productId,
                      name: product.name,
                      altNames: product.altNames,
                      price: product.price,
                      labeledPrice: product.labeledPrice,
                      images: product.images,
                      quantity: 1,
                    },
                  ],
                },
              })
            }
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}