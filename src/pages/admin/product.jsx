import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductPage(){

const [products, setProducts] = useState([])
useEffect(
    () => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
        (response) => {
        console.log(response.data)
        setProducts(response.data);
    }
)

    },
    []
)



  return (
    <div className="w-full h-full rounded-lg relative">
        <Link to={"/admin/addproduct"} className="bg-gray-700 text-white absolute p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-5">
        <FaPlus/>
        </Link>
       <table className="w-full">
        <thead>
            <tr>
                <th className="p-2">Product ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Labeled Price</th>
                <th className="p-2">Stock</th>

            </tr>


        </thead>
        <tbody>
            
      {
        products.map(
            (product) =>{
                console.log("Mapping"+product.productId)
                return(
                    <tr key ={product.productId} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-700 hover:text-white">
                        <td className="p-2">{product.productId}</td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.price}</td>
                        <td className="p-2">{product.labeledPrice}</td>
                        <td className="p-2">{product.stock}</td>
                        </tr>
                )
            }
        )
      }
        </tbody>
       </table>
       
            

    


    </div>
  )
}
//https://bhuhgxhxpjdrxmmhabyc.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodWhneGh4cGpkcnhtbWhhYnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDE2MjUsImV4cCI6MjA4NzU3NzYyNX0._l20WlzOQMMiygb4sLkWvB4RR4fuxPZw83gSPaYdjgQ