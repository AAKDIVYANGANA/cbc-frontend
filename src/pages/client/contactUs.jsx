import { useState } from "react";

export default function ContactUs() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit() {
        if (!email || !phone) return;
        setSubmitted(true);
    }

    const inputStyle = {
        background: "#fff",
        borderColor: "#f0c4d8",
        boxShadow: "0 2px 8px rgba(232,121,160,0.08)",
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 50%, #6b2d4a 100%)", fontFamily: "'Georgia', serif" }}
        >
            {/* Decorative blobs */}
            <div className="absolute top-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, #f9a8c9, transparent)" }} />
            <div className="absolute bottom-[-40px] right-[-40px] w-[220px] h-[220px] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #f472b6, transparent)" }} />
            <div className="absolute top-[25%] right-[8%] w-[80px] h-[80px] rounded-full opacity-10 border border-pink-300" />
            <div className="absolute bottom-[20%] left-[6%] w-[60px] h-[60px] rounded-full opacity-10 border border-pink-200" />
            <span className="absolute top-[15%] left-[20%] text-pink-300 opacity-20 text-2xl">✦</span>
            <span className="absolute bottom-[25%] right-[18%] text-pink-300 opacity-20 text-xl">✦</span>

            <div className="w-full max-w-[480px] relative z-10">

                {/* Card */}
                <div
                    className="rounded-3xl overflow-hidden"
                    style={{ boxShadow: "0 24px 60px rgba(26,10,15,0.5)" }}
                >
                    {/* Card top strip */}
                    <div
                        className="px-10 py-8 text-center"
                        style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(249,168,201,0.15)" }}
                    >
                        <div className="text-4xl mb-3">🌸</div>
                        <h1 className="text-3xl font-bold text-white mb-1">Contact Us</h1>
                        <div className="w-12 h-[2px] rounded-full mx-auto mt-3"
                            style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                    </div>

                    {/* Card body */}
                    <div className="px-10 py-8" style={{ background: "#fdf6f9" }}>
                        {!submitted ? (
                            <>
                                <p className="text-sm mb-6" style={{ color: "#c4527a" }}>
                                    We'd love to hear from you. Fill in your details below!
                                </p>

                                <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: "#6b2d4a" }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none mb-4 transition-all"
                                    style={inputStyle}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                    onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                                />

                                <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: "#6b2d4a" }}>
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+94 77 123 4567"
                                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none mb-8 transition-all"
                                    style={inputStyle}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                                    Send Message
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-6">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-5"
                                    style={{ background: "linear-gradient(135deg, #fdf0f5, #fce7f3)", border: "2px solid #f0c4d8" }}
                                >
                                    🌸
                                </div>
                                <h2 className="text-2xl font-bold mb-2" style={{ color: "#3d1a2e" }}>Thank You!</h2>
                                <div className="w-10 h-[2px] rounded-full mx-auto mb-4"
                                    style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                                <p className="text-sm mb-8" style={{ color: "#c4527a" }}>
                                    We've received your details and will get back to you soon.
                                </p>
                                <button
                                    className="px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                                    style={{
                                        background: "linear-gradient(135deg, #e879a0, #c4527a)",
                                        boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => { setEmail(""); setPhone(""); setSubmitted(false); }}
                                >
                                    Send Another
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom tagline */}
                <p className="text-center text-xs mt-6" style={{ color: "rgba(240,196,216,0.4)" }}>
                    © 2024 Crystal Beauty Clear
                </p>
            </div>
        </div>
    );
}