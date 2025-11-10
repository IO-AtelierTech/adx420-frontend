import React from "react";
import BrandShowcase from "../components/BrandVisualizer";
import { currentBrand } from "../config";

const neuroMuse = {
  name: "NeuroMuse",
  tagline: [
    "Technology inspired by creativity.",
    "Tecnología inspirada por la creatividad."
  ],
  palette: {
    base: "#3C3F58", // Midnight Navy: Confidence and reliability
    accent: "#9B5DE5", // Electric Purple: Creativity and individuality
    contrast: "#F15BB5", // Fuchsia Glow: Vibrancy and boldness
    secondary: "#FEE440", // Bright Yellow: Optimism and joy
    neutral: "#E0E7FF", // Soft Lavender: Calm and friendly
    background: "#F8F8FF", // Light Lilac: Clean and uplifting
  },
  typography: {
    logo: "Monoton", // Extravagant display font for an artistic edge
    primary: "Source Sans Pro", // Clean sans-serif for functional readability
    secondary: "Ubuntu", // Approachable sans-serif for inclusive branding
    headers: "Oswald", // Strong and modern sans-serif for impactful statements
  },
};

const nexoraBrand = {
  name: "Nexora",
  tagline: [
    "Digital elegance, redefined.",
    "La elegancia digital, redefinida."
  ],
  palette: {
    base: "#2C3E50", // dark blue
    accent: "#8E44AD", // purple
    contrast: "#F39C12", // amber
    secondary: "#AAB7B8", // light silver
    neutral: "#ECF0F1", // soft white
    background: "#F5F5F5", // off white
  },
  typography: {
    logo: "'Abril Fatface', cursive",
    headers: "'Poppins', sans-serif",
    primary: "'Lato', sans-serif",
    secondary: "'Quicksand', sans-serif",
  },
};


const harmonicFusionBrand = {
  name: "Harmonic Fusion",
  tagline: [
    "Where music meets the blockchain.",
    "Donde la música se encuentra con la blockchain."
  ],
  palette: {
    base: "#1A1A2E", // deep midnight blue
    accent: "#E94560", // vibrant crimson
    contrast: "#0F3460", // rich indigo
    secondary: "#16213E", // dark slate
    neutral: "#EAEAEA", // soft white
    background: "#0A0A23", // dark navy
  },
  typography: {
    logo: "'Bungee', cursive",
    headers: "'Poppins', sans-serif",
    primary: "'Roboto', sans-serif",
    secondary: "'Space Mono', monospace",
  },
};

const App: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <BrandShowcase brand={currentBrand} />
      <BrandShowcase brand={neuroMuse} />
      <BrandShowcase brand={nexoraBrand} />
      <BrandShowcase brand={harmonicFusionBrand} />
    </div>
  );
};

export default App;
