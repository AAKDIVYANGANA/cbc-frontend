import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js"; // ✅ Add this

// ✅ Create supabase client
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ✅ Define mediaUpload function
async function mediaUpload(file) {
    const { data, error } = await supabase.storage
        .from("images")
        .upload(file.name, file, {
            cacheControl: "3600",
            upsert: true,
        });
    if (error) throw error;

    // Get public URL of uploaded image
    const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}

export default function AddProductForm() {

    const [productID, setProductID] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit() {
        // Validate fields
        if (!productID || !productName || !price || !labeledPrice || !description || !stock) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            // Upload all images and get URLs
            const promisesArray = [];
            for (let i = 0; i < images.length; i++) {
                const promise = mediaUpload(images[i]);
                promisesArray[i] = promise;
            }
            const result = await Promise.all(promisesArray);

            const alternativeNamesArray = alternativeNames.split(",").map(n => n.trim());
            const product = {
                productId: productID,
                name: productName,
                altNames: alternativeNamesArray,
                price: Number(price),
                labeledPrice: Number(labeledPrice),
                description: description,
                stock: Number(stock),
                images: result
            };

            const token = localStorage.getItem("token");
            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/product",
                product,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            toast.success("Product added successfully");
            navigate("/admin/products");

        } catch (error) {
            console.log(error);
            toast.error("Product adding failed");
        }
    }

    return (
        <div className="w-full h-full rounded-lg flex items-center justify-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Product</h1>
                <input
                    value={productID}
                    onChange={(e) => setProductID(e.target.value)}
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
                    <Link to={"/admin/products"} className="w-[180px] text-center bg-red-500 text-white rounded-lg p-[10px] hover:bg-red-600">
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        className="w-[180px] ml-[10px] cursor-pointer text-center bg-green-500 text-white rounded-lg p-[10px] hover:bg-green-600">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}