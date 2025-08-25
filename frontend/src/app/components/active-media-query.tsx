"use client"
import { useState, useEffect } from "react";

const breakpoints = {
  sm: 640, // Tailwind sm: 640px
  md: 768, // Tailwind md: 768px
  lg: 1024, // Tailwind lg: 1024px
  xl: 1280, // Tailwind xl: 1280px
  "2xl": 1536, // Tailwind 2xl: 1536px
};

const getActiveBreakpoint = (width: number) => {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs"; // Default for screens smaller than `sm`
};

export default function ActiveMediaQuery() {
  const [activeBreakpoint, setActiveBreakpoint] = useState(() =>
    getActiveBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setActiveBreakpoint(getActiveBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg text-gray-700 bottom-0 z-10">
      <p>
        <strong>Active Breakpoint:</strong> {activeBreakpoint}
      </p>
    </div>
  );
}
