"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean; // externally controlled trigger
  tag?: React.ElementType;
}

export function TextScramble({
  text,
  className,
  trigger,
  tag: Tag = "span",
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<number>(0);
  const iterRef = useRef(0);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scramble = useCallback(() => {
    if (prefersReduced) return;
    cancelAnimationFrame(frameRef.current);
    iterRef.current = 0;

    const step = () => {
      const progress = iterRef.current / (text.length * 2);
      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iterRef.current / 2) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayed(result);

      if (progress < 1) {
        iterRef.current += 0.5;
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayed(text);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [text, prefersReduced]);

  // Trigger on external prop change
  useEffect(() => {
    if (trigger) scramble();
  }, [trigger, scramble]);

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TagComponent = Tag as any;

  return (
    <TagComponent
      className={className}
      onMouseEnter={scramble}
      data-text={text}
      aria-label={text}
    >
      {displayed}
    </TagComponent>
  );
}
