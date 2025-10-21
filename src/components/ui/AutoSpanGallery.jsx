import { useState, useEffect } from "react";

export default function AutoSpanGallery({ images }) {
  const [imageSpans, setImageSpans] = useState([]);
//   const gridCol =
//     images.length <= 3
//     ? `grid grid-cols-${images.length}`
//     : "grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]";

    const gridCol =
        images.length === 1
        ? 1
        : images.length === 2
        ? 2
        : 3

    const getSpan = (ratio) => {
        if (ratio > 2.0) return 3;
        if (ratio > 1.2) return 2;
        return 1;
    };
       

  useEffect(() => {
    const loadImages = async () => {
      const spans = await Promise.all(
        images.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = `${import.meta.env.VITE_PUBLIC_URL}${src}`;
            img.onload = () => {
              const ratio = img.naturalWidth / img.naturalHeight;
              resolve(getSpan(ratio)); // threshold can be tuned
            };
            img.onerror = () => resolve(1);
          });
        })
      );
      setImageSpans(spans);
    };
    loadImages();
  }, [images]);


  return (
    <div
      className={`
        grid
        gap-6
        grid-cols-${gridCol}
        justify-evenly
        w-full
      `}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className={`relative w-full row-span-1 col-span-${Math.min(gridCol,imageSpans[i] || 1)}`}
        >
          {/* the image sizing fixed by switching from w-full to w-5xl */}
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}${src}`}
            alt=""
            className="w-5xl transition-transform duration-500 hover:scale-120"
          />
          {/* <div className="text-xl">{gridCol}  span: {imageSpans[i] || 1} col-span-{Math.min(gridCol,imageSpans[i] || 1)}</div> */}
        </div>
      ))}
    </div>
  );
}
