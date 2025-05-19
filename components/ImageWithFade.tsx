import Image from "next/image";
import { useState, useEffect } from "react";

export function ImageWithFade({ src, alt, className }:{
  src:string,
  alt:string,
  className:string
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (src !== currentSrc) {
      setFade(true);
      const timeout = setTimeout(() => {
        setCurrentSrc(src);
        setFade(false);
      }, 300); 

      return () => clearTimeout(timeout);
    }
  }, [src, currentSrc]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={500}
      height={500}
      className={`${className} transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}
    />
  );
}
