import { useEffect, useState } from "react";
import img1 from "./assets/pos-carousel/img1.jpg";
import img2 from "./assets/pos-carousel/img2.jpg";
import img3 from "./assets/pos-carousel/img3.jpg";
import logo from './assets/pos.png';

export default function LoginCarousel() {
    
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const images = [img1, img2, img3];

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // يبدأ يختفي
      setTimeout(() => {
        setIndex((i) => (i + 1) % images.length);
        setFade(true); // يظهر الصورة الجديدة
      }, 300);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-4 bg-[#f5f6f1]">
        <img src={logo} className=" self-start" alt="" />
      {/* image */}
      <img
        src={images[index]}
        className={`w-[50%] h-100 object-container rounded transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />

      <p className="text-black text-2xl w-[270px] self-center">Manage sales,inventory and other transactions</p>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-3">
  {images.map((_, i) => (
    <span
      key={i}
      className={`h-2 transition-all duration-300 rounded-full ${
        index === i
          ? "w-6 bg-yellow-400"   // النشطة: مستطيل
          : "w-2 bg-gray-400"     // العادية: دايرة
      }`}
    />
  ))}
</div>
    </div>
  );
}
