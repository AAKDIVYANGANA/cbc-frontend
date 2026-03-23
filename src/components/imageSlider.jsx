import { useState } from "react";

export default function ImageSlider({ images = [] }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center">
      
      <div className="w-full aspect-square overflow-hidden mb-2">
        <img
          src={activeImage}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

    
      <div className="flex justify-center items-center gap-1 w-full overflow-x-auto py-1">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`cursor-pointer overflow-hidden transition-all duration-200 ${
              activeImage === img 
              ? "border-2 border-[#b32d5b] opacity-100" 
              : "border-2 border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img 
              src={img} 
              alt={`thumb-${idx}`} 
              className="w-[70px] h-[70px] md:w-[85px] md:h-[85px] object-cover" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}