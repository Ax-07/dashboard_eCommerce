"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ScreenShare,
  TabletIcon,
  Laptop as LaptopIcon,
} from "lucide-react";
import { FaMobileAlt } from "react-icons/fa";
import { Button } from "@/src/components/ui/button";

// Dimensions prédéfinies pour chaque appareil
const DEVICE_DIMENSIONS = {
  mobile: { width: 390, height: 844 },     // iPhone 12
  tablet: { width: 768, height: 1024 },      // iPad mini
  laptop: { width: 1280, height: 712 },      // MacBook Air 13
  desktop: { width: 1920, height: 952 },     // Desktop
};

type DeviceType = "mobile" | "tablet" | "laptop" | "desktop";

interface ResizableDeviceProps {
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement>;
}

export const ResizableDevice: React.FC<ResizableDeviceProps> = ({ children, parentRef }) => {
  // État pour gérer le preset sélectionné (largeur et type d'appareil)
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [width, setWidth] = useState(DEVICE_DIMENSIONS.desktop.width);

  // Ref pour le conteneur de prévisualisation (ici uniquement pour la taille interne, sans drag)
  const containerRef = useRef<HTMLDivElement>(null);

  // Mise à jour du preset via les boutons
  const setDeviceWidthHandler = (newDevice: DeviceType) => {
    setDevice(newDevice);
    setWidth(DEVICE_DIMENSIONS[newDevice].width);
  };

  // Calcul de la hauteur en fonction du ratio d'aspect défini dans le preset
  const currentPreset = DEVICE_DIMENSIONS[device];
  const computedHeight = width * (currentPreset.height / currentPreset.width);

  // Gestion du scale automatique : on observe la taille du conteneur parent via ResizeObserver
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!parentRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: parentWidth, height: parentHeight } = entry.contentRect;
        const scaleX = parentWidth / width;
        const scaleY = parentHeight / computedHeight;
        const newScale = Math.min(scaleX, scaleY, 1);
        setScale(newScale);
      }
    });
    observer.observe(parentRef.current);
    return () => observer.disconnect();
  }, [width, computedHeight, parentRef]);

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Boutons de preset avec variant : actif = default, inactif = outline */}
      {/* <div className="flex flex-col items-center justify-center w-full mb-4"> */}
        <div className="flex items-center gap-2 mb-4">
            <Button variant={device === "mobile" ? "default" : "outline"} onClick={() => setDeviceWidthHandler("mobile")}>
            <FaMobileAlt size={20} className="scale-130"/>
            </Button>
            <Button variant={device === "tablet" ? "default" : "outline"} onClick={() => setDeviceWidthHandler("tablet")}>
            <TabletIcon size={20} className="scale-140"/>
            </Button>
            <Button variant={device === "laptop" ? "default" : "outline"} onClick={() => setDeviceWidthHandler("laptop")}>
            <LaptopIcon size={20} className="scale-160"/>
            </Button>
            <Button variant={device === "desktop" ? "default" : "outline"} onClick={() => setDeviceWidthHandler("desktop")}>
            <ScreenShare size={20} className="scale-130"/>
            </Button>
        </div>
        <p className="text-md">
        Dimensions : {width} <span className="text-xs text-muted-foreground mx-1">x</span> {Math.round(computedHeight)} | Scale : {scale.toFixed(2)}
      </p>
      {/* </div> */}

      {/* Conteneur de prévisualisation avec scale automatique */}
      <div
      className={``}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          height: `${computedHeight*scale + 10}px`,
          transition: "all 0.05s ease",
        }}
      >
        <div
          ref={containerRef}
          className="relative border rounded-2xl overflow-hidden shadow-[0_0_10px_rgb(0,0,0)] shadow-primary"
          style={{ width: `${width-10}px`, height: `${computedHeight}px`, transition: "all 0.1s ease",}}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
