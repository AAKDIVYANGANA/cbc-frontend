import { useState } from "react";

export default function ReviewsPage() {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const sampleReviews = [
        {
            id: 1,
            name: "Ayesha Fernando",
            rating: 5,
            comment: "Absolutely love this brand! My skin has never felt so smooth and radiant. The natural ingredients make such a difference.",
            date: "March 10, 2024",
            avatar: "A",
        },
        {
            id: 2,
            name: "Dilani Perera",
            rating: 5,
            comment: "I've tried so many beauty products and Crystal Beauty Clear is hands down the best. Worth every penny!",
            date: "February 28, 2024",
            avatar: "D",
        },
        {
            id: 3,
            name: "Nimasha Silva",
            rating: 4,
            comment: "Great quality products. The rose serum is my absolute favourite — so gentle and effective for sensitive skin.",
            date: "February 14, 2024",
            avatar: "N",
        },
        {
            id: 4,
            name: "Kavindi Jayawardena",
            rating: 5,
            comment: "Fast delivery and beautiful packaging. The products smell amazing and feel luxurious. Will definitely order again!",
            date: "January 30, 2024",
            avatar: "K",
        },
        {
            id: 5,
            name: "Sachini Rathnayake",
            rating: 4,
            comment: "Very happy with my purchase. The moisturizer keeps my skin hydrated all day. Love that it's cruelty-free!",
            date: "January 18, 2024",
            avatar: "S",
        },
        {
            id: 6,
            name: "Madara Wickramasinghe",
            rating: 5,
            comment: "Crystal Beauty Clear changed my skincare routine completely. My friends keep asking what I use — it's that good!",
            date: "January 5, 2024",
            avatar: "M",
        },
    ];

    function handleSubmit() {
        if (!name || !rating || !comment) return;
        setSubmitted(true);
    }

    const StarIcon = ({ filled }) => (
        <svg className="w-5 h-5" fill={filled ? "#e879a0" : "none"} stroke="#e879a0" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    );

    const inputStyle = {
        background: "#fff",
        borderColor: "#f0c4d8",
        boxShadow: "0 2px 8px rgba(232,121,160,0.08)",
    };

    return (
        <div className="w-full min-h-screen" style={{ background: "#fdf6f9", fontFamily: "'Georgia', serif" }}>

            {/* HERO BANNER */}
            <div
                className="w-full relative overflow-hidden py-14 px-6 flex flex-col items-center text-center"
                style={{ background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 50%, #6b2d4a 100%)" }}
            >
                <div className="absolute top-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full opacity-10 border border-pink-300" />
                <div className="absolute bottom-[-30px] right-[-30px] w-[160px] h-[160px] rounded-full opacity-10 border border-pink-200" />
                <span className="absolute top-[20%] right-[10%] text-pink-300 opacity-20 text-2xl">✦</span>
                <span className="absolute bottom-[25%] left-[8%] text-pink-300 opacity-20 text-xl">✦</span>

                <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 block" style={{ color: "#f9a8c9" }}>
                    ✦ &nbsp; What our customers say &nbsp; ✦
                </span>
                <h1 className="text-4xl font-bold text-white mb-3">Customer Reviews</h1>
                <div className="w-16 h-[2px] rounded-full mb-4 mx-auto"
                    style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                <p className="text-sm max-w-md" style={{ color: "#f0c4d8" }}>
                    Real experiences from our beautiful community of skincare lovers.
                </p>

                {/* Stats */}
                <div className="flex gap-10 mt-8">
                    {[
                        
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl font-bold" style={{ color: "#f9a8c9" }}>{stat.number}</div>
                            <div className="text-xs" style={{ color: "#f0c4d8" }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[40px]">
                        <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#fdf6f9" />
                    </svg>
                </div>
            </div>

            {/* REVIEWS GRID */}
            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: "#e879a0" }}>
                        Reviews
                    </span>
                    <h2 className="text-3xl font-bold" style={{ color: "#1a0a0f" }}>What They're Saying</h2>
                    <div className="w-12 h-[2px] rounded-full mx-auto mt-3"
                        style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sampleReviews.map((review) => (
                        <div
                            key={review.id}
                            className="rounded-2xl p-6 transition-all duration-300"
                            style={{
                                background: "#fff",
                                border: "1px solid #f0c4d8",
                                boxShadow: "0 4px 16px rgba(232,121,160,0.08)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 36px rgba(232,121,160,0.2)"}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,121,160,0.08)"}
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <StarIcon key={s} filled={s <= review.rating} />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-sm leading-relaxed mb-5" style={{ color: "#6b2d4a" }}>
                                "{review.comment}"
                            </p>

                            {/* Divider */}
                            <div className="h-[1px] mb-4" style={{ background: "#f0c4d8" }} />

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                    style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}
                                >
                                    {review.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-bold" style={{ color: "#3d1a2e" }}>{review.name}</p>
                                    <p className="text-xs" style={{ color: "#c4527a" }}>{review.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WRITE A REVIEW FORM */}
            <div className="w-full py-16 px-6"
                style={{ background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 50%, #6b2d4a 100%)" }}>
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 block" style={{ color: "#f9a8c9" }}>
                            Share Your Experience
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-3">Write a Review</h2>
                        <div className="w-12 h-[2px] rounded-full mx-auto"
                            style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                    </div>

                    <div
                        className="rounded-3xl overflow-hidden"
                        style={{ boxShadow: "0 24px 60px rgba(26,10,15,0.4)" }}
                    >
                        <div className="px-8 py-8" style={{ background: "#fdf6f9" }}>
                            {!submitted ? (
                                <>
                                    {/* Name */}
                                    <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: "#6b2d4a" }}>
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Ayesha Fernando"
                                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none mb-4 transition-all"
                                        style={inputStyle}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                        onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                                    />

                                    {/* Star Rating */}
                                    <label className="text-xs uppercase tracking-widest mb-2 block" style={{ color: "#6b2d4a" }}>
                                        Rating
                                    </label>
                                    <div className="flex gap-2 mb-4">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button
                                                key={s}
                                                onMouseEnter={() => setHoverRating(s)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setRating(s)}
                                                className="text-3xl transition-transform"
                                                style={{ transform: (hoverRating || rating) >= s ? "scale(1.2)" : "scale(1)" }}
                                            >
                                                <span style={{ color: (hoverRating || rating) >= s ? "#e879a0" : "#f0c4d8" }}>★</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: "#6b2d4a" }}>
                                        Your Review
                                    </label>
                                    <textarea
                                        placeholder="Tell us about your experience..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none mb-6 transition-all resize-none"
                                        style={inputStyle}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                        onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                                    />

                                    <button
                                        className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all"
                                        style={{
                                            background: "linear-gradient(135deg, #e879a0, #c4527a)",
                                            boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                        onClick={handleSubmit}
                                    >
                                        Submit Review
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-5"
                                        style={{ background: "linear-gradient(135deg, #fdf0f5, #fce7f3)", border: "2px solid #f0c4d8" }}
                                    >
                                        🌸
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2" style={{ color: "#3d1a2e" }}>Thank You!</h3>
                                    <div className="w-10 h-[2px] rounded-full mx-auto mb-4"
                                        style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                                    <p className="text-sm mb-8" style={{ color: "#c4527a" }}>
                                        Your review has been submitted. We appreciate your feedback!
                                    </p>
                                    <button
                                        className="px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                                        style={{
                                            background: "linear-gradient(135deg, #e879a0, #c4527a)",
                                            boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                                        }}
                                        onClick={() => { setName(""); setRating(0); setComment(""); setSubmitted(false); }}
                                    >
                                        Write Another
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="w-full py-8 px-6 text-center" style={{ background: "#0f0508" }}>
                <div className="text-2xl mb-3">🌸</div>
                <p className="font-bold mb-1" style={{ color: "#f9a8c9" }}>Crystal Beauty Clear</p>
                <p className="text-xs" style={{ color: "#6b2d4a" }}>© 2024 Crystal Beauty Clear. All rights reserved.</p>
            </div>
        </div>
    );
}