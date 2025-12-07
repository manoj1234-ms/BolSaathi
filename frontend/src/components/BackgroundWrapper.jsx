import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

export default function BackgroundWrapper({ children }) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const backgroundRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Destroy existing effect before creating new one
    if (vantaEffect) {
      vantaEffect.destroy();
      setVantaEffect(null);
    }

    if (backgroundRef.current) {
      const isDark = theme === "dark";
      const effect = NET({
        el: backgroundRef.current,
        THREE: THREE,
        color: isDark ? 0x7f00ff : 0x4a90e2,
        backgroundColor: isDark ? 0x060818 : 0xf5f7fa,
        points: 8.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: true,
      });
      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [theme]);

  return (
    <div className="relative w-full min-h-screen">
      <div
        ref={backgroundRef}
        className="fixed inset-0 w-full h-full z-0"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

