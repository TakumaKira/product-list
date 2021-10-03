import { createRef, useEffect } from "react";

const AsyncImage = ({src, className, width, height}:
  {src: string, className: string, width: number, height: number}) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.fillStyle = 'hsl(0, 0%, 75%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    if (src) {
      const image = new Image();
      const handleLoad = () => {
        ctx.beginPath();
        ctx.fillStyle = 'hsl(0, 0%, 100%)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const imgAR = image.width / image.height;
        const canvasAR = canvas.width / canvas.height;
        if (imgAR < canvasAR) {
          ctx.drawImage(image, (canvas.width - canvas.height * imgAR) / 2, 0, canvas.height * imgAR, canvas.height);
        } else {
          ctx.drawImage(image, 0, (canvas.height - canvas.width / imgAR) / 2, canvas.width, canvas.width / imgAR);
        }
      };
      image.addEventListener('load', handleLoad);
      image.src = src;
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [src]);

  return (<canvas ref={canvasRef} className={className}></canvas>);
};

export default AsyncImage;