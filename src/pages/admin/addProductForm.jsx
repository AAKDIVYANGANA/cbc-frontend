import { Link } from "react-router-dom";

export default function AddProductForm() {
    
    return (
        <div className="w-full h-full rounded-lg flex items-center justify-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Product</h1>
                <input
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                placeholder="product ID"
                />
                <input
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                placeholder="product Name"
                />
                <input
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                placeholder="Alternative Names"
                />
                <input
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                placeholder="Price"
                />
                <input
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                placeholder="Labeled Price"
                />
                <textarea
                className="w-[400px] h-[100px] border border-gray-500 rounded-xl text-center m-[5px]"
                placeholder="Description"
                />
                <input
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                placeholder="Stock"
                />
            
            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"/admin/products"} className="w-[180px] text-center bg-red-500 text-white rounded-lg p-[10px] hover:bg-red-600">Cancel</Link>
                <button className="w-[180px] ml-[10px] cursor-pointer text-center bg-green-500 text-white rounded-lg p-[10px] hover:bg-green-600">Add Product</button>
            </div>
        </div>
        </div>
    );
}