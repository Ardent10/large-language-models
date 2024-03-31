import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FramerCardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: any;
  range: any;
  targetScale: any;
}

export function FramerCard({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}: FramerCardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative top-1/4 h-[500px] w-[1000px] rounded-[25px] p-12 transform origin-top"
      >
        <h2 className="text-center text-2xl font-bold">{title}</h2>
        <div className="flex h-full mt-12 gap-12">
          <div className="w-40% relative top-10%">
            <p className="text-base">{description}</p>
            <span className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                className="text-sm underline cursor-pointer"
              >
                See more
              </a>
              <svg
                className="w-5 h-3 fill-current"
                viewBox="0 0 22 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <div className="w-60% relative">
            <motion.div
              className="relative w-full h-full overflow-hidden"
              style={{ scale: imageScale }}
            >
              <img
                className="object-cover w-full h-full"
                src={`/images/${src}`}
                alt="image"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
