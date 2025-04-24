"use client";

import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
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

const Marker = () => <MapPin className="h-8 w-8 text-primary -mt-8" />;

export function Map({ 
  center, 
  zoom = 14, 
  height = "400px",
  disableUI = false
}: MapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Simple example without actual API key
  // In a real application, you would use a proper API key
  const dummyApiKey = "YOUR_API_KEY";
  
  // This is a mock implementation for display purposes
  // In production, you'd handle this properly
  const mapOptions = {
    disableDefaultUI: disableUI,
    zoomControl: !disableUI,
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#ffffff"
          },
          {
            weight: 2
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#e9e9e9"
          }
        ]
      }
    ]
  };

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) {
    return (
      <div 
        style={{ height, width: "100%" }}
        className="bg-muted flex items-center justify-center text-muted-foreground"
      >
        Loading map...
      </div>
    );
  }

  return (
    <div style={{ height, width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: dummyApiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={mapOptions}
      >
        <Marker
          lat={center.lat}
          lng={center.lng}
        />
      </GoogleMapReact>
    </div>
  );
}