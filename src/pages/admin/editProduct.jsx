import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

async function mediaUpload(file) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(file.name, file, { cacheControl: "3600", upsert: true });
  if (error) throw error;

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(data.path);
  return urlData.publicUrl;
}

export default function EditProductForm() {
  const locationData = useLocation();
  const navigate = useNavigate();

  // Redirect if no product selected
  useEffect(() => {
    if (!locationData.state) {
      toast.error("Please select a product to edit");
      navigate("/admin/products"); 
    }
  }, [locationData.state, navigate]);

  const [productID] = useState(locationData.state?.productId || "");
  const [productName, setProductName] = useState(locationData.state?.name || "");
  const [alternativeNames, setAlternativeNames] = useState(locationData.state?.altNames?.join(", ") || "");
  const [price, setPrice] = useState(locationData.state?.price || "");
  const [labeledPrice, setLabeledPrice] = useState(locationData.state?.labeledPrice || "");
  const [description, setDescription] = useState(locationData.state?.description || "");
  const [stock, setStock] = useState(locationData.state?.stock || "");
  const [images, setImages] = useState([]);

  async function handleSubmit() {
    if (!productID || !productName || !price || !labeledPrice || !description || !stock) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // Upload new images if selected
      let result = locationData.state.images;
      if (images.length > 0) {
        const promisesArray = Array.from(images).map((file) => mediaUpload(file));
        result = await Promise.all(promisesArray);
      }

      const alternativeNamesArray = alternativeNames.split(",").map((n) => n.trim());

      const product = {
        productId: productID,
        name: productName,
        altNames: alternativeNamesArray,
        price: Number(price),
        labeledPrice: Number(labeledPrice),
        description,
        stock: Number(stock),
        images: result,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      // Correct URL: add a slash before product ID
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/${productID}`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response:", response.data);

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error("Product updating failed");
    }
  }

  return (
    <div className="w-full h-full rounded-lg flex items-center justify-center">
      <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Edit Product</h1>
        <input
          disabled
          value={productID}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product ID"
        />
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product Name"
        />
        <input
          value={alternativeNames}
          onChange={(e) => setAlternativeNames(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Alternative Names (comma separated)"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Price"
        />
        <input
          value={labeledPrice}
          onChange={(e) => setLabeledPrice(e.target.value)}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Labeled Price"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-[400px] h-[100px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Description"
        />
        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          multiple
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
        />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Stock"
        />
        <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
          <Link
            to={"/admin/products"}
            className="w-[180px] text-center bg-red-500 text-white rounded-lg p-[10px] hover:bg-red-600"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="w-[180px] ml-[10px] cursor-pointer text-center bg-green-500 text-white rounded-lg p-[10px] hover:bg-green-600"
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}