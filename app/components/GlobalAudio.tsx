"use client";

import { useEffect, useRef } from "react";

export default function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/musica.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const start = () => {
      audio.play().catch(() => {});
    };

    const verified = localStorage.getItem("ageVerified");

    if (verified === "true") {
      start();
    }

    window.addEventListener("startGlobalMusic", start);

    return () => {
      audio.pause();
      window.removeEventListener("startGlobalMusic", start);
    };
  }, []);

  return null;
}
