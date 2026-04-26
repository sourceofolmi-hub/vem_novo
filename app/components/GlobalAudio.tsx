"use client";

import { useEffect, useRef } from "react";

export default function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startAudio = () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = 0.4;
      audio.loop = true;
      audio.play().catch(() => {});
    };

    window.addEventListener("startGlobalMusic", startAudio);
    document.addEventListener("click", startAudio);

    return () => {
      window.removeEventListener("startGlobalMusic", startAudio);
      document.removeEventListener("click", startAudio);
    };
  }, []);

  return <audio ref={audioRef} src="/musica.mp3" preload="auto" />;
}