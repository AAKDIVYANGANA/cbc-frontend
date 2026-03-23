import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"

export default function ProductsPage() {
    const [productList, setProductList] = useState([])
    const [productsLoaded, setProductsLoaded] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!productsLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search", {
                params: { search: search.trim() }
            }).then((res) => {
                setProductList(res.data)
                setProductsLoaded(true)
            }).catch((err) => {
                console.error("API error:", err)
                setProductsLoaded(true)
            })
        }
    }, [productsLoaded, search])

    return (
        <div className="w-full min-h-full" style={{ background: "#fdf6f9", fontFamily: "'Georgia', serif" }}>

            
            <div
                className="w-full relative overflow-hidden py-14 px-6 flex flex-col items-center text-center"
                style={{ background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 50%, #6b2d4a 100%)" }}
            >
                
                <div className="absolute top-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full opacity-10 border border-pink-300" />
                <div className="absolute bottom-[-30px] right-[-30px] w-[160px] h-[160px] rounded-full opacity-10 border border-pink-200" />
                <div className="absolute top-[20%] right-[10%] w-[60px] h-[60px] rounded-full opacity-10 border border-pink-300" />

                <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 block" style={{ color: "#f9a8c9" }}>
                    ✦ &nbsp; Explore &nbsp; ✦
                </span>
                <h1 className="text-4xl font-bold text-white mb-3">Our Collection</h1>
                <div className="w-16 h-[2px] rounded-full mb-4"
                    style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                <p className="text-sm max-w-md" style={{ color: "#f0c4d8" }}>
                    Discover premium beauty products crafted with natural ingredients for your radiant glow.
                </p>

                
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[40px]">
                        <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#fdf6f9" />
                    </svg>
                </div>
            </div>

            
            <div
                className="w-full py-6 px-6 sticky top-0 z-10"
                style={{
                    background: "rgba(253,246,249,0.92)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid #f0c4d8",
                }}
            >
                <div className="max-w-2xl mx-auto flex items-center gap-3">
                    <div
                        className="flex flex-1 items-center rounded-2xl overflow-hidden transition-all"
                        style={{
                            background: "#fff",
                            border: "1px solid #f0c4d8",
                            boxShadow: "0 2px 12px rgba(232,121,160,0.08)",
                        }}
                    >
                        <span className="pl-4 text-lg" style={{ color: "#e879a0" }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") setProductsLoaded(false)
                            }}
                            className="flex-1 py-3 px-3 text-sm bg-transparent focus:outline-none"
                            style={{ color: "#3d1a2e" }}
                        />
                        {search && (
                            <button
                                onClick={() => { setSearch(""); setProductsLoaded(false) }}
                                className="pr-4 text-sm transition-colors"
                                style={{ color: "#c4527a" }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setProductsLoaded(false)}
                        className="px-6 py-3 rounded-2xl font-semibold text-sm text-white transition-all whitespace-nowrap"
                        style={{
                            background: "linear-gradient(135deg, #e879a0, #c4527a)",
                            boxShadow: "0 4px 16px rgba(232,121,160,0.35)",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        Search
                    </button>
                </div>
            </div>

        

            
            <div className="max-w-6xl mx-auto px-6 py-6 pb-16">
                {!productsLoaded ? (
                    <div className="flex justify-center py-24">
                        <div className="w-10 h-10 border-4 rounded-full animate-spin"
                            style={{ borderColor: "#f0c4d8", borderTopColor: "#e879a0" }} />
                    </div>
                ) : productList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6"
                            style={{ background: "linear-gradient(135deg, #fdf0f5, #fce7f3)" }}
                        >
                            🔍
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: "#3d1a2e" }}>No products found</h3>
                        <p className="text-sm mb-8" style={{ color: "#c4527a" }}>Try searching with a different keyword</p>
                        <button
                            onClick={() => { setSearch(""); setProductsLoaded(false) }}
                            className="px-8 py-3 rounded-2xl font-semibold text-sm text-white transition-all"
                            style={{
                                background: "linear-gradient(135deg, #e879a0, #c4527a)",
                                boxShadow: "0 4px 16px rgba(232,121,160,0.35)",
                            }}
                        >
                            View All Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productList.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}