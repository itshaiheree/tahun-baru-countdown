"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function Confetti({ x }) {
  const runningRef = useRef(false);

  useEffect(() => {
    if (!x || runningRef.current) return;

    runningRef.current = true;

    const duration = 1000; 
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        resize: true,
        useWorker: true,
        particleCount: 8,
        spread: 360,
        startVelocity: 60,
        decay: 0.9,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.4,
        },
      });

      if (Date.now() < end && runningRef.current) {
        requestAnimationFrame(frame);
      } else {
        runningRef.current = false; // stop
      }
    })();
  }, [x]);

  return null; // tidak render apa-apa
}
