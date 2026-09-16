import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorColor?: string;
}

export function Typewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 38,
  pauseDuration = 2200,
  className = "",
  cursorColor = "currentColor",
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || words.length === 0) {
      setCurrentText(words[0] || "");
      return;
    }

    const currentWord = words[wordIndex % words.length];

    // Finished typing current word -> pause then start deleting
    if (!isDeleting && currentText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    // Finished deleting current word -> move to next word
    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Step typing / deleting
    const delay = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? currentWord.slice(0, prev.length - 1)
          : currentWord.slice(0, prev.length + 1)
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    prefersReducedMotion,
  ]);

  if (prefersReducedMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      <span>{currentText}</span>
      <span
        aria-hidden="true"
        className="inline-block ml-0.5 font-light animate-pulse select-none"
        style={{ color: cursorColor }}
      >
        |
      </span>
    </span>
  );
}
