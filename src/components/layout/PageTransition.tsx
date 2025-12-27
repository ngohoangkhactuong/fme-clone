import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  locationKey?: string;
};

export const PageTransition = ({ children, locationKey }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger exit state briefly then enter for smooth transition
    setMounted(false);
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    return () => cancelAnimationFrame(id);
  }, [locationKey]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out will-change-transform ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
