"use client";

import { MapPin } from "lucide-react";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  height?: string;
  disableUI?: boolean;
}

export function Map({ 
  center, 
  zoom = 14, 
  height = "400px",
  disableUI = false
}: MapProps) {
  return (
    <div 
      style={{ height, width: "100%" }}
      className="bg-muted flex items-center justify-center text-muted-foreground"
    >
      <div className="text-center">
        <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
        <p>La carte sera disponible prochainement</p>
      </div>
    </div>
  );
}