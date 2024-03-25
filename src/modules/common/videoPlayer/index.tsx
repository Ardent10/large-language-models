import { useRef, useEffect } from "react";
interface VideoPlayerProps {
  className?: string;
  poster: string;
  videoSrc: string;
}
export function VideoPlayer({ poster, videoSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current !== null && videoRef.current !== undefined) {
      (videoRef.current as HTMLVideoElement).playbackRate = 0.3;
    }
  }, []);

  return (
    <video
      autoPlay
      playsInline
      muted
      loop
      className={
        "absolute inset-0 w-full h-full object-cover border border-green-600"
      }
      poster={poster}
      ref={videoRef}
    >
      <source src={videoSrc} type="video/mp4" />
      <source src={videoSrc} type="video/webm" />
    </video>
  );
}
