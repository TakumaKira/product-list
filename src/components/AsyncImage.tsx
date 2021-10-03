import { createRef, useEffect } from "react";

const AsyncImage = ({src, width, height, cachedImages, className, bgColor, preloadBgColor}:
  {src: string, width: number, height: number, cachedImages: { [url in string]: HTMLImageElement }, className?: string, bgColor?: string, preloadBgColor?: string}) => {

  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    if (preloadBgColor) {
      ctx.beginPath();
      ctx.fillStyle = preloadBgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  
    if (src) {
      const drawContext = (image: HTMLImageElement) => {
        if (bgColor) {
          ctx.beginPath();
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        const imgAR = image.width / image.height;
        const canvasAR = canvas.width / canvas.height;
        if (imgAR < canvasAR) {
          ctx.drawImage(image, (canvas.width - canvas.height * imgAR) / 2, 0, canvas.height * imgAR, canvas.height);
        } else {
          ctx.drawImage(image, 0, (canvas.height - canvas.width / imgAR) / 2, canvas.width, canvas.width / imgAR);
        }
      };

      if (!cachedImages[src]) {
        const image = new Image();
        const handleLoad = () => {
          cachedImages[src] = image;
          drawContext(cachedImages[src]);
        };
        image.addEventListener('load', handleLoad);
        image.src = src;
        return () => {
          image.removeEventListener('load', handleLoad);
        };
      } else {
        drawContext(cachedImages[src]);
      }
    }
  }, [src]);

  return (<canvas ref={canvasRef} className={className}></canvas>);
};

export default AsyncImage;