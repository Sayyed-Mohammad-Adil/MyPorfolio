import React, { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Center,
  Resize,
  useGLTF,
} from "@react-three/drei";

import { gsap } from "gsap";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

interface WorkspaceIllustrationProps {
  typingLines: string[];
  showLaptop: boolean;
}

// Function to generate a tile texture for the floor
const createTileTexture = (theme: "light" | "dark" = "dark") => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const isDark = theme === "dark";

  // Base tile color
  // Dark: Deep polished slate-900 / obsidian tech floor (#0f172a)
  // Light: Clean luxury porcelain slate-50 / pearl white (#f8fafc)
  ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a";
  ctx.fillRect(0, 0, 512, 512);

  // Subtle interior ambient tile gradient for depth
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  if (isDark) {
    grad.addColorStop(0, "rgba(230, 217, 104, 0.77)");
    grad.addColorStop(1, "rgba(41, 42, 43, 0.5)");
  } else {
    grad.addColorStop(0, "rgba(30, 41, 59, 0.4)");
    grad.addColorStop(1, "rgba(56, 66, 94, 0.7)");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Tile grout/lines
  ctx.strokeStyle = isDark ? "#1e293b" : "#cbd5e1";
  ctx.lineWidth = 4;
  for (let i = 0; i <= 512; i += 128) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Subtle glow dots at intersections
  ctx.fillStyle = isDark ? "#38bdf8" : "#2563eb";
  for (let x = 0; x <= 512; x += 128) {
    for (let y = 0; y <= 512; y += 128) {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  // Repeat to make the tiles balanced across the floor
  texture.repeat.set(64, 64);
  return texture;
};

// Function for Laptop Screen (Realistic IDE code)
const createLaptopScreenTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Editor background
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, 1024, 768);

  // Tab bar
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 0, 1024, 52);

  // Mac window dots
  const dots = ["#ff5f56", "#ffbd2e", "#27c93f"];
  dots.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(30 + i * 24, 26, 7, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  // Editor tab
  ctx.fillStyle = "#0d1117";
  ctx.roundRect(120, 8, 220, 44, 8);
  ctx.fill();
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 20px 'Fira Code', monospace";
  ctx.fillText("Portfolio.tsx", 145, 36);

  // Line numbers gutter
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 52, 70, 716);

  const codeLines = [
    { num: "1", text: "import React from 'react';", color: "#ff7b72" },
    {
      num: "2",
      text: "import { FullStack } from '@/skills';",
      color: "#ff7b72",
    },
    { num: "3", text: "", color: "" },
    { num: "4", text: "export const SayyedAdil = () => {", color: "#d2a8ff" },
    {
      num: "5",
      text: "  const name = 'Sayyed Mohammad Adil';",
      color: "#a5d6ff",
    },
    {
      num: "6",
      text: "  const role = 'Full Stack Developer';",
      color: "#a5d6ff",
    },
    {
      num: "7",
      text: "  const tech = ['React', 'Next.js', 'Three.js'];",
      color: "#7ee787",
    },
    {
      num: "8",
      text: "  const passion = '100% Clean Code 🔥';",
      color: "#7ee787",
    },
    { num: "9", text: "", color: "" },
    { num: "10", text: "  return (", color: "#ff7b72" },
    { num: "11", text: "    <Developer", color: "#7ee787" },
    { num: "12", text: "      creative={true}", color: "#ffa657" },
    {
      num: "13",
      text: "      status='Building Cool Stuff 🚀'",
      color: "#79c0ff",
    },
    { num: "14", text: "    />", color: "#7ee787" },
    { num: "15", text: "  );", color: "#ff7b72" },
    { num: "16", text: "};", color: "#d2a8ff" },
  ];

  ctx.font = "bold 24px 'Fira Code', 'Courier New', monospace";
  codeLines.forEach((item, index) => {
    const y = 92 + index * 40;
    ctx.fillStyle = "#484f58";
    ctx.fillText(item.num, 24, y);

    if (item.text) {
      ctx.fillStyle = item.color;
      ctx.fillText(item.text, 90, y);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
};

// Function to generate a realistic VS Code / IDE screen texture
const updateScreenTexture = (
  canvas: HTMLCanvasElement,
  typingLines: string[],
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background - Dark sleek editor
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, 1024, 512);

  // Top Bar / Window header
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 0, 1024, 38);

  // Window buttons (mac-style dots)
  const dots = ["#ff5f56", "#ffbd2e", "#27c93f"];
  dots.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(22 + i * 18, 19, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  // Editor Tabs
  ctx.fillStyle = "#0d1117";
  ctx.roundRect(85, 6, 160, 32, 6);
  ctx.fill();
  ctx.fillStyle = "#58a6ff";
  ctx.font = "bold 18px 'Fira Code', monospace";
  ctx.fillText("Portfolio.tsx", 100, 28);

  // Sidebar
  ctx.fillStyle = "#090d13";
  ctx.fillRect(0, 38, 65, 474);
  const iconColors = ["#58a6ff", "#8b949e", "#8b949e"];
  iconColors.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.fillRect(20, 60 + i * 45, 25, 25);
  });

  // Draw typing lines dynamically
  ctx.font = "bold 22px 'Fira Code', 'Courier New', monospace";
  ctx.fillStyle = "#7ee787";
  typingLines.forEach((line, index) => {
    ctx.fillText(line, 130, 65 + index * 35);
  });

  // Blinking cursor
  if (Date.now() % 1000 < 500) {
    const lastLineY = 65 + (typingLines.length - 1) * 35;
    const lastLineLength = ctx.measureText(
      typingLines[typingLines.length - 1] || "",
    ).width;
    ctx.fillRect(130 + lastLineLength + 5, lastLineY - 20, 12, 24);
  }

  // Terminal at bottom (VS Code feel - matches editor background)
  ctx.fillStyle = "#30363d";
  ctx.fillRect(65, 380, 959, 1); // Subtle 1px separator

  ctx.fillStyle = "#7ee787";
  ctx.font = "16px 'Fira Code', monospace";
  ctx.fillText("➜  adil-portfolio git:(main) ✗  npm run dev", 90, 415);
  ctx.fillStyle = "#38bdf8";
  ctx.fillText("✓ Compiled successfully in 1250ms 🔥", 90, 445);
  ctx.fillStyle = "#ff5f56";
  ctx.fillText("🔗 Live: https://sayyedmohammadadil.online/", 90, 475);
};

// Function for MY BLOG secondary screen
const updateBlogTexture = (
  canvas: HTMLCanvasElement,
  theme: "light" | "dark",
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const isDark = theme === "dark";
  const primaryColor = isDark ? "#eab308" : "#38bdf8";

  // Background
  ctx.fillStyle = isDark ? "#0f172a" : "#f8fafc";
  ctx.fillRect(0, 0, 512, 1024); // Portrait

  // Header Bar
  ctx.fillStyle = isDark ? "#020617" : "#e2e8f0";
  ctx.fillRect(0, 0, 512, 110);

  ctx.fillStyle = primaryColor;
  ctx.font = "bold 44px 'Fira Code', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("MY BLOG", 256, 55);

  // Content blocks
  const icons = ["⚛️", "✨", "📐", "🚀"];
  const titles = [
    "React 19 Deep Dive",
    "GSAP Web Animations",
    "Three.js 3D Guide",
    "Next.js Architecture",
  ];

  for (let i = 0; i < 4; i++) {
    const cardY = 145 + i * 210;
    ctx.beginPath();
    ctx.roundRect(36, cardY, 440, 185, 14);
    ctx.fillStyle = isDark ? "#1e293b" : "#ffffff";
    ctx.fill();
    ctx.strokeStyle = isDark ? "#334155" : "#cbd5e1";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Vibrant themed image thumbnail box (Blue in light / Yellow in dark)
    ctx.beginPath();
    ctx.roundRect(56, cardY + 25, 120, 135, 10);
    ctx.fillStyle = isDark
      ? "rgba(234, 179, 8, 0.2)"
      : "rgba(56, 189, 248, 0.25)";
    ctx.fill();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Glowing Tech Symbol inside thumbnail
    ctx.fillStyle = primaryColor;
    ctx.font = "38px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(icons[i], 116, cardY + 95);

    // Title
    ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a";
    ctx.font = "bold 20px 'Fira Code', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(titles[i], 195, cardY + 60);

    // Summary lines
    ctx.fillStyle = isDark ? "#94a3b8" : "#64748b";
    ctx.font = "14px sans-serif";
    ctx.fillText("High performance & clean code", 195, cardY + 95);
    ctx.fillText("Read full article →", 195, cardY + 125);
  }
};

// Function for Live Digital Clock
const updateClockTexture = (
  canvas: HTMLCanvasElement,
  theme: "light" | "dark",
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Dark sleek digital clock background
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, 1024, 512);

  // Modern metallic bezel border
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, 1004, 492);

  // Inner OLED screen
  ctx.fillStyle = "#020617";
  ctx.fillRect(24, 24, 976, 464);

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  const neonColor = theme === "dark" ? "#eab308" : "#38bdf8";

  // Time display with neon glow
  ctx.fillStyle = neonColor;
  ctx.shadowColor = neonColor;
  ctx.shadowBlur = 24;
  ctx.font = "bold 130px 'Fira Code', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(timeString, 512, 210);
  ctx.shadowBlur = 0;

  // Date & Day display below
  const dateString = now
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();
  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 42px 'Fira Code', monospace";
  ctx.fillText(dateString, 512, 330);

  // Live indicator
  const isBlink = Math.floor(Date.now() / 500) % 2 === 0;
  ctx.fillStyle = isBlink ? "#22c55e" : "#15803d";
  ctx.beginPath();
  ctx.arc(415, 415, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#64748b";
  ctx.font = "bold 28px 'Fira Code', monospace";
  ctx.textAlign = "left";
  ctx.fillText("LIVE TIME", 440, 415);
};

// Function for Laptop Base (Keyboard + Touchpad)
const createLaptopBaseTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#1e293b"; // Slate gray body
  ctx.fillRect(0, 0, 1024, 1024);

  // Keyboard indent
  ctx.fillStyle = "#0f172a";
  ctx.roundRect(100, 150, 824, 400, 10);
  ctx.fill();

  // Draw keys grid
  ctx.fillStyle = "#020617"; // Black keys
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 15; col++) {
      ctx.roundRect(115 + col * 53, 165 + row * 62, 45, 50, 4);
      ctx.fill();
    }
  }

  // Touchpad
  ctx.fillStyle = "#334155";
  ctx.roundRect(362, 600, 300, 200, 12);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
};

// Function for Coffee Cup Logo / Sleeve (Barista Design)
const createCupTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Creamy ceramic cup base
  ctx.fillStyle = "#faf8f5";
  ctx.fillRect(0, 0, 1024, 512);

  // Debug: Bold RED horizontal stripes to guarantee it shows up!
  ctx.fillStyle = "#ef4444"; // Bright red
  for (let y = 0; y <= 512; y += 20) {
    // Skip the middle area where the barista sleeve goes
    if (y > 130 && y < 380) continue;

    // Draw thick 10px stripes across the entire width
    ctx.fillRect(0, y, 1024, 10);
  }

  // Matte kraft cardboard barista sleeve
  ctx.fillStyle = "#a27b5c";
  ctx.fillRect(0, 140, 1024, 230);

  // Decorative border lines
  ctx.strokeStyle = "#3f2e1f";
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 145, 1024, 220);

  // Repeating barista emblem so it looks great from all angles
  for (const x of [256, 768]) {
    // Outer double ring
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, 255, 85, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#f3e8dc";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, 255, 78, 0, Math.PI * 2);
    ctx.stroke();

    // Coffee icon in the center
    ctx.fillStyle = "#ffffff";
    ctx.font = "38px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("☕", x, 240);

    // Text badges
    ctx.font = "bold 16px 'Courier New', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("★ ADIL COFFEE LAB ★", x, 280);

    ctx.font = "bold 11px 'Courier New', monospace";
    ctx.fillStyle = "#f3e8dc";
    ctx.fillText("CRAFTED FOR CODING", x, 205);
    ctx.fillText("EST. 2026 • 100% ARABICA", x, 305);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const getMaterialForPart = (
  name: string,
  screenTexture: THREE.CanvasTexture | null,
  blogTexture: THREE.CanvasTexture | null,
  clockTexture: THREE.CanvasTexture | null,
  laptopBaseTexture: THREE.CanvasTexture | null,
  laptopScreenTexture: THREE.CanvasTexture | null,
  cupTexture: THREE.CanvasTexture | null,
  keyboardMaterial: THREE.Material,
  mousepadMaterial?: THREE.Material | null,
  theme?: "light" | "dark",
) => {
  const lowerName = name.toLowerCase();

  const neonColor = theme === "dark" ? 0xeab308 : 0x38bdf8; // Yellow for dark, Blue for light

  // Primary Curved Monitor
  if (
    lowerName.includes("display") ||
    (lowerName.includes("screen") &&
      !lowerName.includes("plane.002") &&
      !lowerName.includes("plane002"))
  ) {
    if (screenTexture) {
      screenTexture.anisotropy = 16;
      screenTexture.minFilter = THREE.LinearFilter;
      screenTexture.magFilter = THREE.LinearFilter;
      return new THREE.MeshStandardMaterial({
        map: screenTexture,
        roughness: 0.8, // Matte to avoid glare/focus
        metalness: 0.1,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: screenTexture,
        emissiveIntensity: 1.0,
      });
    }
  }

  // Laptop Screen (plane.002 / o_plane002)
  if (lowerName.includes("plane.002") || lowerName.includes("plane002")) {
    if (laptopScreenTexture) {
      laptopScreenTexture.anisotropy = 16;
      laptopScreenTexture.minFilter = THREE.LinearFilter;
      laptopScreenTexture.magFilter = THREE.LinearFilter;
      return new THREE.MeshStandardMaterial({
        map: laptopScreenTexture,
        roughness: 0.2,
        metalness: 0.1,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: laptopScreenTexture,
        emissiveIntensity: 1.1,
      });
    }
  }

  // Tablet Screen (MY BLOG) (plane.001 / o_plane001 / o_plane)
  if (
    lowerName.includes("plane.001") ||
    lowerName.includes("plane001") ||
    lowerName === "plane" ||
    lowerName === "o_plane"
  ) {
    if (blogTexture) {
      return new THREE.MeshStandardMaterial({
        map: blogTexture,
        roughness: 0.2,
        metalness: 0.1,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: blogTexture,
        emissiveIntensity: 0.8,
      });
    }
  }

  // S-Pen / Remote
  if (lowerName.includes("pen") || lowerName.includes("usb")) {
    return new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8,
    });
  }

  // Digital Clock Screen (SAMSUNG_low.001 on the desk next to the monitor stand)
  if (
    lowerName.includes("samsung") ||
    lowerName.includes("clock") ||
    lowerName.includes("timer")
  ) {
    if (clockTexture) {
      return new THREE.MeshStandardMaterial({
        map: clockTexture,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: clockTexture,
        emissiveIntensity: 1.8,
        roughness: 0.2,
        metalness: 0.8,
      });
    }
  }

  // Digital Clock Housing Body (Remote_low.001)
  if (lowerName.includes("remote")) {
    return new THREE.MeshStandardMaterial({
      color: 0x111827, // Sleek matte black clock chassis
      roughness: 0.4,
      metalness: 0.6,
    });
  }

  // LED Glow Behind Monitor
  if (
    lowerName.includes("ring") ||
    lowerName.includes("led_glow") ||
    lowerName.includes("led_cover") ||
    lowerName.includes("glow")
  ) {
    return new THREE.MeshStandardMaterial({
      color: neonColor,
      emissive: new THREE.Color(neonColor),
      emissiveIntensity: 2.0, // Animated in useFrame
      roughness: 0.2,
      metalness: 0.5,
    });
  }

  // Coffee Cup Lid (Cover_Ring) - Matte Black (NO MORE BROWN)
  if (lowerName.includes("cover_ring") || lowerName === "lid") {
    return new THREE.MeshStandardMaterial({
      color: 0x111827, // Matte black barista lid
      roughness: 0.35,
      metalness: 0.2,
    });
  }

  // Coffee Cup Body
  if (lowerName.includes("cup")) {
    return new THREE.MeshStandardMaterial({
      map: cupTexture || undefined,
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.1,
    });
  }

  // Main Desk / Table Body
  if (lowerName.includes("table") || lowerName.includes("desk")) {
    return new THREE.MeshStandardMaterial({
      color: 0x3e2723, // Rich dark wood color
      roughness: 0.6,
      metalness: 0.1,
    });
  }

  // Table Border (Side)
  if (lowerName.includes("side.001")) {
    return new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Slate border
      roughness: 0.3,
      metalness: 0.8,
    });
  }

  // Mousepad / Desk mat (Clean dark obsidian mat, no neon border)
  if (lowerName.includes("mouse_map")) {
    return new THREE.MeshStandardMaterial({
      color: 0x0a0f1d, // Clean deep obsidian matte desk mat
      roughness: 0.9,
      metalness: 0.05,
    });
  }

  // Mouse Main Body Shell (MainForm) - Vibrant Cyber Gaming Mouse
  if (lowerName === "mainform") {
    return new THREE.MeshStandardMaterial({
      color: theme === "dark" ? 0x0ea5e9 : 0x2563eb, // Electric cyan/blue metallic shell
      emissive: new THREE.Color(theme === "dark" ? 0x0284c7 : 0x1d4ed8),
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.6,
      side: THREE.DoubleSide,
    });
  }

  // Mouse Left / Right / Top Click Buttons
  if (
    lowerName.includes("left_button") ||
    lowerName.includes("right_button") ||
    lowerName.includes("top_button") ||
    lowerName.includes("middle_button")
  ) {
    return new THREE.MeshStandardMaterial({
      color: theme === "dark" ? 0x38bdf8 : 0x1e40af, // Contrasting vibrant accent buttons
      emissive: new THREE.Color(neonColor),
      emissiveIntensity: 0.25,
      roughness: 0.25,
      metalness: 0.5,
      side: THREE.DoubleSide,
    });
  }

  // Mouse Scroll Wheel (Middle_Switcher)
  if (lowerName.includes("middle_switcher")) {
    return new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: new THREE.Color(neonColor), // Glowing wheel matching theme
      emissiveIntensity: 2.5,
      roughness: 0.2,
      metalness: 0.8,
      side: THREE.DoubleSide,
    });
  }

  // Mouse DPI & Side Buttons (Switches)
  if (lowerName.includes("switches")) {
    return new THREE.MeshStandardMaterial({
      color: 0x334155, // Sleek slate accent switches
      roughness: 0.3,
      metalness: 0.6,
      side: THREE.DoubleSide,
    });
  }

  // Desktop Mechanical Gaming Keyboard (Flowing RGB underglow)
  if (lowerName.includes("led+keyboard") || lowerName.includes("keyboard")) {
    return keyboardMaterial;
  }

  // Monitor Stand / Base / Shaft Arm ("Danda") / Metals (Matching Monitor Back Panel)
  if (
    lowerName.includes("stand") ||
    lowerName.includes("base") ||
    lowerName.includes("hinge") ||
    lowerName.includes("joi")
  ) {
    return new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Dark metallic titanium/gunmetal matching the monitor back panel (NO MORE BROWN)
      roughness: 0.25,
      metalness: 0.85,
    });
  }

  // Monitor Bezel & Rear Chassis
  if (
    lowerName.includes("vesel") ||
    lowerName.includes("penul") ||
    lowerName.includes("object001") ||
    lowerName.includes("air_holl") ||
    lowerName.includes("bottom_low")
  ) {
    return new THREE.MeshStandardMaterial({
      color: 0x242e3d, // Metallic slate monitor rear panel matching the user screenshot
      roughness: 0.45,
      metalness: 0.7,
    });
  }

  // Default fallback
  return new THREE.MeshStandardMaterial({
    color: 0x64748b, // Slate gray
    roughness: 0.5,
    metalness: 0.3,
  });
};

useGLTF.preload("/WorkspaceIllustration.glb");

const Model = React.forwardRef(
  (
    {
      url,
      position,
      rotation,
      maxDimension,
      children,
      typingLines,
      theme,
    }: any,
    ref: any,
  ) => {
    const gltf = useGLTF(url) as any;
    const obj = gltf.scene as THREE.Group;

    // Custom Mechanical Gaming Keyboard Shader Material with flowing RGB between keys
    const { keyboardMaterial, keyboardUniforms } = useMemo(() => {
      const uniforms = {
        uTime: { value: 0 },
      };

      const mat = new THREE.MeshStandardMaterial({
        color: 0x090d16, // Matte deep dark keycaps
        roughness: 0.4,
        metalness: 0.15,
      });

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = uniforms.uTime;

        shader.vertexShader = `
        varying vec3 vCustomPos;
        varying vec3 vCustomNormal;
        ${shader.vertexShader}
      `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
        vCustomPos = position;
        vCustomNormal = normal;
        `,
        );

        shader.fragmentShader = `
        uniform float uTime;
        varying vec3 vCustomPos;
        varying vec3 vCustomNormal;
        ${shader.fragmentShader}
      `.replace(
          `#include <emissivemap_fragment>`,
          `#include <emissivemap_fragment>
        // Flowing RGB wave diagonally across the keyboard
        float wave = (vCustomPos.x * 0.022 - vCustomPos.z * 0.016) - uTime * 2.2;
        
        // Vivid rainbow RGB spectrum
        vec3 rgbWave = vec3(
          sin(wave) * 0.5 + 0.5,
          sin(wave + 2.094) * 0.5 + 0.5,
          sin(wave + 4.188) * 0.5 + 0.5
        );
        
        // Keycaps top is Y > 185.0 -> pure matte dark keycaps
        // Base and between keys is Y < 184.8 -> glowing vibrant RGB light!
        float underglow = smoothstep(185.1, 183.0, vCustomPos.y);
        
        // Subtle glow to keycap edges and vertical faces
        float sideFactor = 1.0 - abs(normalize(vCustomNormal).y);
        float rimGlow = sideFactor * smoothstep(183.0, 186.0, vCustomPos.y) * 0.4;
        
        // Total emissive radiance flowing strictly between and under the keys!
        vec3 finalEmissive = rgbWave * (underglow * 3.0 + rimGlow);
        totalEmissiveRadiance += finalEmissive;
        `,
        );
      };

      return { keyboardMaterial: mat, keyboardUniforms: uniforms };
    }, []);

    // Laptop Base Material: Keyboard RGB glow ONLY on keys + Touchpad glowing border
    const { laptopBaseMaterial, laptopKeyboardUniforms } = useMemo(() => {
      const uniforms = {
        uTime: { value: 0 },
      };

      const mat = new THREE.MeshStandardMaterial({
        color: 0x1e293b, // Dark aluminum laptop chassis
        roughness: 0.35,
        metalness: 0.75,
      });

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = uniforms.uTime;

        shader.vertexShader = `
        varying vec3 vLaptopPos;
        varying vec3 vLaptopNormal;
        ${shader.vertexShader}
      `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
        vLaptopPos = position;
        vLaptopNormal = normal;
        `,
        );

        shader.fragmentShader = `
        uniform float uTime;
        varying vec3 vLaptopPos;
        varying vec3 vLaptopNormal;
        ${shader.fragmentShader}
      `.replace(
          `#include <emissivemap_fragment>`,
          `#include <emissivemap_fragment>
        // Flowing RGB wave
        float wave = (vLaptopPos.x * 0.05 - vLaptopPos.z * 0.04) - uTime * 2.2;
        vec3 rgbWave = vec3(
          sin(wave) * 0.5 + 0.5,
          sin(wave + 2.094) * 0.5 + 0.5,
          sin(wave + 4.188) * 0.5 + 0.5
        );

        // STRICT TOP-SURFACE CHECK: Only upwards-facing top surfaces (vLaptopNormal.y > 0.4) and Y > 193.5
        // Bottom panel is at Y < 193.0 with normal pointing down -> ZERO emission on bottom panel!
        float isTopSurface = step(193.5, vLaptopPos.y) * step(0.4, vLaptopNormal.y);

        // 1. KEYPAD BOUNDS: Z in [-514.0, -421.4], X in [-215.5, -189.0]
        float inKeysX = step(-215.5, vLaptopPos.x) * step(vLaptopPos.x, -189.0);
        float inKeysZ = step(-514.0, vLaptopPos.z) * step(vLaptopPos.z, -421.4);
        float inKeys = inKeysX * inKeysZ * isTopSurface;

        // Procedural Grid for individual keys (6 rows, 15 columns roughly)
        float keyGridX = smoothstep(0.15, 0.3, abs(fract(vLaptopPos.x / 4.4) - 0.5));
        float keyGridZ = smoothstep(0.15, 0.3, abs(fract(vLaptopPos.z / 6.1) - 0.5));
        
        // The gaps between the keys glow, simulating an RGB backlight grid
        float keyBorders = 1.0 - (keyGridX * keyGridZ);
        
        float keyBacklight = inKeys * keyBorders * 2.5;

        // 2. TOUCHPAD THIN OUTLINE: Center X ~ -174.0, Center Z ~ -471.0
        // Razor-thin thickness
        float padNormX = abs(vLaptopPos.x - (-174.0)) / 11.5;
        float padNormZ = abs(vLaptopPos.z - (-471.0)) / 24.0;
        float padDist = max(padNormX, padNormZ);
        float inPalmRest = step(-187.0, vLaptopPos.x) * step(vLaptopPos.x, -161.0) * step(-498.0, vLaptopPos.z) * step(vLaptopPos.z, -444.0);
        float touchpadThinBorder = isTopSurface * inPalmRest * smoothstep(0.96, 0.99, padDist) * (1.0 - smoothstep(1.01, 1.04, padDist));

        // ONLY individual keys glow on the keypad + thin touchpad outline
        vec3 finalGlow = rgbWave * (keyBacklight + touchpadThinBorder * 1.5);
        totalEmissiveRadiance += finalGlow;
        `,
        );
      };

      return { laptopBaseMaterial: mat, laptopKeyboardUniforms: uniforms };
    }, []);

    // Create canvases for dynamic textures
    const screenCanvas = useMemo(() => {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 512;
      return c;
    }, []);
    const blogCanvas = useMemo(() => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 1024;
      return c;
    }, []);
    const clockCanvas = useMemo(() => {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 512;
      return c;
    }, []);

    // Static textures
    const laptopBaseTexture = useMemo(() => createLaptopBaseTexture(), []);
    const laptopScreenTexture = useMemo(() => createLaptopScreenTexture(), []);
    const cupTexture = useMemo(() => createCupTexture(), []);

    // Custom Laptop Screen Material: Code on INNER display, clean dark aluminum on OUTER lid!
    const laptopScreenMaterial = useMemo(() => {
      const mat = new THREE.MeshStandardMaterial({
        map: laptopScreenTexture || undefined,
        roughness: 0.8, // Matte to avoid unwanted specular focus on top of monitor
        metalness: 0.1,
        side: THREE.DoubleSide,
      });

      mat.onBeforeCompile = (shader) => {
        shader.vertexShader = `
        varying vec3 vScreenNormal;
        varying vec3 vScreenPos;
        ${shader.vertexShader}
      `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
        vScreenNormal = normal;
        vScreenPos = position;
        `,
        );

        shader.fragmentShader = `
        varying vec3 vScreenNormal;
        varying vec3 vScreenPos;
        ${shader.fragmentShader}
      `
          .replace(
            `#include <map_fragment>`,
            `
        // When normal points +X (towards keyboard), it is the inner display -> show code!
        // When normal points -X (towards outside/back), it is the outer lid -> clean dark aluminum!
        if (vScreenNormal.x > 0.1) {
          #include <map_fragment>
        } else {
          diffuseColor = vec4(0.12, 0.16, 0.23, 1.0);
        }
        `,
          )
          .replace(
            `#include <emissivemap_fragment>`,
            `
        if (vScreenNormal.x > 0.9) {
          #include <emissivemap_fragment>
          totalEmissiveRadiance *= 1.2;
        } else {
          totalEmissiveRadiance = vec3(0.0);
        }
        `,
          );
      };

      return mat;
    }, [laptopScreenTexture]);

    // Custom Coffee Cup Material: Distinct Matte Charcoal/Black Barista Lid (dhakkan) on top (Y >= 205),
    // with barista logo & kraft paper sleeve on the cup body (Y < 205)
    const cupMaterial = useMemo(() => {
      const mat = new THREE.MeshStandardMaterial({
        map: cupTexture || undefined,
        color: 0xffffff,
        roughness: 0.35,
        metalness: 0.1,
      });

      mat.onBeforeCompile = (shader) => {
        shader.vertexShader = `
        varying vec3 vCupPos;
        ${shader.vertexShader}
      `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
        vCupPos = position;
        `,
        );

        shader.fragmentShader = `
        varying vec3 vCupPos;
        ${shader.fragmentShader}
      `.replace(
          `#include <map_fragment>`,
          `#include <map_fragment>
        // Separate Coffee Cup Dhakkan (Lid) from Cup Body:
        // Lid starts at Y >= 205.0 -> distinct matte dark barista lid
        if (vCupPos.y >= 205.0) {
          diffuseColor = vec4(0.08, 0.10, 0.14, 1.0); // Distinct dark charcoal barista lid
        }
        `,
        );
      };

      return mat;
    }, [cupTexture]);

    // Custom Mouse Material: Metallic Platinum/Silver body with contrasting dark obsidian seams & borders + luminous cyber accent
    // Perfectly centered around scroll wheel and center seam at X = -179.25
    // Driven by dynamic uniforms for instant theme reactivity
    const { mouseMaterial, mouseUniforms } = useMemo(() => {
      const uniforms = {
        uAccentColor: { value: new THREE.Vector3(0.92, 0.70, 0.05) },
        uBorderBaseColor: { value: new THREE.Vector3(0.08, 0.10, 0.14) },
      };

      const mat = new THREE.MeshStandardMaterial({
        color: 0xBFC3C7,
        emissive: new THREE.Color(0x22262B),
        emissiveIntensity: 0.15,
        metalness: 0.25,
        roughness: 0.35,
        side: THREE.DoubleSide,
      });

      mat.customProgramCacheKey = () => "custom_mouse_material_v3";

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uAccentColor = uniforms.uAccentColor;
        shader.uniforms.uBorderBaseColor = uniforms.uBorderBaseColor;

        shader.vertexShader = `
        varying vec3 vMousePos;
        varying vec3 vMouseNormal;
        ${shader.vertexShader}
      `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
        vMousePos = position;
        vMouseNormal = normal;
        `,
        );

        shader.fragmentShader = `
        uniform vec3 uAccentColor;
        uniform vec3 uBorderBaseColor;
        varying vec3 vMousePos;
        varying vec3 vMouseNormal;
        ${shader.fragmentShader}
      `
          .replace(
            `#include <map_fragment>`,
            `#include <map_fragment>
        // Mouse Coordinate Space: X: [-193.3, -160.3], Y: [178.2, 196.6], Z: [-248.3, -190.7]
        // Dead center of scroll wheel and mouse center line is exactly X = -179.25

        // 1. Bottom perimeter border / base skirt where mouse touches mousepad
        float isBaseBorder = step(vMousePos.y, 181.2);

        // 2. Center seam / gap between left & right click buttons (aligned dead center at X = -179.25)
        float inButtonArea = step(-226.0, vMousePos.z);
        float isCenterGap = step(abs(vMousePos.x - (-179.25)), 0.75) * inButtonArea;

        // 3. Scroll wheel well / cutout gap (aligned dead center around wheel at X = -179.25)
        float inWheelWell = step(abs(vMousePos.x - (-179.25)), 2.8) * 
                            step(-214.5, vMousePos.z) * 
                            step(vMousePos.z, -195.0) * 
                            step(vMousePos.y, 189.5);

        // 4. Side grip borders / waistline
        float isSideBorder = (step(vMousePos.x, -191.2) + step(-162.3, vMousePos.x)) * step(vMousePos.y, 185.0);

        // 5. Transverse groove between main buttons and palm arch
        float isTransverseGap = step(abs(vMousePos.z - (-224.0)), 0.65) * step(185.0, vMousePos.y);

        float isMouseGap = max(isBaseBorder, max(isCenterGap, max(inWheelWell, max(isSideBorder, isTransverseGap))));

        // Contrasting color for gaps & borders:
        if (isMouseGap > 0.5) {
          // Deep contrasting groove
          diffuseColor = vec4(uBorderBaseColor, 1.0);
        }
        `,
          )
          .replace(
            `#include <emissivemap_fragment>`,
            `#include <emissivemap_fragment>
        if (isMouseGap > 0.5) {
          // Luminous accent color along the gaps, seams, wheel well, and base skirt border
          totalEmissiveRadiance = uAccentColor * 0.95;
        }
        `,
          );
      };

      return { mouseMaterial: mat, mouseUniforms: uniforms };
    }, []);

    // Mousepad Materials: Pitch black surface with flowing illuminated theme border line
    const {
      mousepadSurfaceMaterial,
      mousepadBorderMaterial,
      mousepadBorderUniforms,
    } = useMemo(() => {
      const uniforms = {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xeab308) },
      };

      // 1. Mousepad Top Surface: Solid Jet Black with illuminated flowing border line around the perimeter
      const surfaceMat = new THREE.MeshStandardMaterial({
        color: 0x050508,
        roughness: 0.92,
        metalness: 0.08,
      });

      surfaceMat.customProgramCacheKey = () => "custom_mousepad_surface_v2";

      surfaceMat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = uniforms.uTime;
        shader.uniforms.uColor = uniforms.uColor;

        shader.vertexShader = `
        varying vec3 vPadPos;
        ${shader.vertexShader}
      `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
        vPadPos = position;
        `,
        );

        shader.fragmentShader = `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vPadPos;
        ${shader.fragmentShader}
      `.replace(
          `#include <emissivemap_fragment>`,
          `#include <emissivemap_fragment>
        // Mousepad bounds: X in [-215.28, -69.48] (center -142.38, halfWidth 72.9)
        //                  Z in [-271.82, -159.21] (center -215.52, halfDepth 56.3)
        float dx = abs(vPadPos.x - (-142.38)) / 72.9;
        float dz = abs(vPadPos.z - (-215.52)) / 56.3;
        float distEdge = max(dx, dz);
        
        // Border line is a glowing outline right at the edge [0.91, 0.99]
        float borderMask = smoothstep(0.91, 0.98, distEdge);
        
        // Continuous flowing neon wave circulating along the border line
        float angle = atan(vPadPos.z - (-215.52), vPadPos.x - (-142.38));
        float wave = sin(angle * 2.0 - uTime * 3.5) * 0.5 + 0.5;
        float flowBeam = pow(wave, 3.0);
        
        // Border line flowing theme color (yellow in dark, blue in light)
        // Interior (borderMask == 0) has ZERO emissive -> 100% solid jet black mouse pad!
        vec3 flowingBorder = uColor * (0.8 + flowBeam * 3.0) * borderMask;
        totalEmissiveRadiance += flowingBorder;
        `,
        );
      };

      // 2. Mousepad Outer Rim / Bevel
      const rimMat = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        roughness: 0.35,
        metalness: 0.5,
        side: THREE.DoubleSide,
      });

      rimMat.customProgramCacheKey = () => "custom_mousepad_rim_v2";

      rimMat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = uniforms.uTime;
        shader.uniforms.uColor = uniforms.uColor;

        shader.vertexShader = `
        varying vec3 vPadPos;
        ${shader.vertexShader}
      `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
        vPadPos = position;
        `,
        );

        shader.fragmentShader = `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vPadPos;
        ${shader.fragmentShader}
      `.replace(
          `#include <emissivemap_fragment>`,
          `#include <emissivemap_fragment>
        float angle = atan(vPadPos.z - (-215.52), vPadPos.x - (-142.38));
        float wave = sin(angle * 2.0 - uTime * 3.5) * 0.5 + 0.5;
        float flowBeam = pow(wave, 3.0);
        vec3 flowingEmissive = uColor * (0.9 + flowBeam * 3.5);
        totalEmissiveRadiance += flowingEmissive;
        `,
        );
      };

      return {
        mousepadSurfaceMaterial: surfaceMat,
        mousepadBorderMaterial: rimMat,
        mousepadBorderUniforms: uniforms,
      };
    }, []);

    // Dynamic textures
    const screenTexture = useMemo(() => {
      const tex = new THREE.CanvasTexture(screenCanvas);
      tex.anisotropy = 16;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    }, [screenCanvas]);
    const blogTexture = useMemo(() => {
      const tex = new THREE.CanvasTexture(blogCanvas);
      tex.anisotropy = 16;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    }, [blogCanvas]);
    const clockTexture = useMemo(() => {
      const tex = new THREE.CanvasTexture(clockCanvas);
      tex.anisotropy = 16;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    }, [clockCanvas]);

    // Initial render of dynamic textures
    useMemo(() => {
      updateScreenTexture(screenCanvas, typingLines || []);
      screenTexture.needsUpdate = true;
      updateBlogTexture(blogCanvas, theme);
      blogTexture.needsUpdate = true;
      updateClockTexture(clockCanvas, theme);
      clockTexture.needsUpdate = true;
    }, [
      typingLines,
      screenCanvas,
      blogCanvas,
      clockCanvas,
      screenTexture,
      blogTexture,
      clockTexture,
      theme,
    ]);

    const cloned = useMemo(() => {
      const c = (obj as THREE.Group).clone(true);

      // Remove junk Simbol, Remote, Samsung, USB hub, Nails, Glass, and obsolete gadget meshes (MainForm/buttons)
      const toRemove: any[] = [];
      c.traverse((child: any) => {
        const lower = (child.name || "").toLowerCase();
        if (
          lower.includes("simbol") ||
          lower.includes("remote") ||
          lower.includes("samsung") ||
          lower.includes("usb") ||
          lower.includes("glass") ||
          lower.includes("nail") ||
          lower.includes("mainform") ||
          lower.includes("button") ||
          lower.includes("switcher") ||
          lower.includes("switches")
        ) {
          toRemove.push(child);
        }
      });
      toRemove.forEach((child) => child.parent && child.parent.remove(child));

      const neonColor = theme === "dark" ? 0xeab308 : 0x38bdf8;

      c.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          const lowerName = child.name.toLowerCase();
          const parentLower = child.parent?.name?.toLowerCase() || "";
          const matName =
            (child.material && !Array.isArray(child.material)
              ? child.material.name
              : "") || "";

          // The actual Gaming Mouse is built into mouse_map_Cube.002 / o_mouse_map_Cube002:
          if (
            parentLower.includes("mouse_map") ||
            lowerName.includes("mouse_map")
          ) {
            if (child.geometry) {
              child.geometry.computeVertexNormals();
            }

            // In GLB, child is one of the separate sub-meshes:
            if (matName.includes("Leather.001")) {
              // 0: Pad top surface - Solid Jet Black with illuminated flowing border line around the rim
              child.material = mousepadSurfaceMaterial;
              return;
            }
            if (matName.includes("Elastic_Rubber.001")) {
              // 1: REAL MOUSE BODY - Metallic Platinum/Silver with contrasting dark obsidian seams, borders, and luminous cyber accent
              child.material = mouseMaterial;
              return;
            }
            if (matName === "Elastic_Rubber") {
              // 2: MOUSE SCROLL WHEEL - Vibrant glowing accent locked in the yellow center
              child.material = new THREE.MeshStandardMaterial({
                color: 0x090d16,
                emissive: new THREE.Color(neonColor),
                emissiveIntensity: 2.5,
                roughness: 0.2,
                metalness: 0.8,
                side: THREE.DoubleSide,
              });
              return;
            }
            if (matName.includes("Leather.002")) {
              // 3: Pad outer rim / border bevel - Flowing theme color yellow (or theme blue)
              child.material = mousepadBorderMaterial;
              return;
            }

            // Fallback if child is multi-material array (OBJ format)
            child.material = [
              // 0: Pad top surface - Jet black with glowing yellow border line
              mousepadSurfaceMaterial,
              // 1: REAL MOUSE BODY
              mouseMaterial,
              // 2: MOUSE SCROLL WHEEL
              new THREE.MeshStandardMaterial({
                color: 0x090d16,
                emissive: new THREE.Color(neonColor),
                emissiveIntensity: 2.5,
                roughness: 0.2,
                metalness: 0.8,
                side: THREE.DoubleSide,
              }),
              // 3: Pad outer rim - Flowing theme color yellow
              mousepadBorderMaterial,
            ];
            return;
          }

          // Laptop base: keypad area light + touchpad border light only
          if (
            lowerName.includes("cube_cube") ||
            parentLower.includes("cube_cube")
          ) {
            child.material = laptopBaseMaterial;
            return;
          }

          // Laptop screen: code ONLY on inner display, outer lid is clean dark aluminum!
          if (
            lowerName.includes("plane.002") ||
            lowerName.includes("plane002") ||
            parentLower.includes("plane002")
          ) {
            child.material = laptopScreenMaterial;
            return;
          }

          // Coffee Cup: distinct dark barista lid ("dhakkan") + dev kraft paper body
          if (lowerName.includes("cup") || parentLower.includes("cup")) {
            child.material = cupMaterial;
            return;
          }

          child.material = getMaterialForPart(
            child.name,
            screenTexture,
            blogTexture,
            clockTexture,
            laptopBaseTexture,
            laptopScreenTexture,
            cupTexture,
            keyboardMaterial,
            null,
            theme,
          );
        }
      });
      return c;
    }, [
      obj,
      screenTexture,
      blogTexture,
      clockTexture,
      laptopBaseTexture,
      laptopScreenTexture,
      cupTexture,
      cupMaterial,
      keyboardMaterial,
      laptopBaseMaterial,
      laptopScreenMaterial,
      mouseMaterial,
      mousepadSurfaceMaterial,
      mousepadBorderMaterial,
      theme,
    ]);

    // Dynamically update mouse shader uniforms and material properties on theme toggle
    useEffect(() => {
      const isDark = theme === "dark";
      if (isDark) {
        // Dark theme: Sleek metallic silver body + vibrant yellow/gold gaps & borders
        mouseMaterial.color.setHex(0xBFC3C7);
        mouseMaterial.emissive.setHex(0x22262B);
        mouseUniforms.uAccentColor.value.set(0.92, 0.70, 0.05);
        mouseUniforms.uBorderBaseColor.value.set(0.08, 0.10, 0.14);
      } else {
        // Light theme: Sleek pearl platinum body + vibrant cyber blue gaps & borders
        mouseMaterial.color.setHex(0xE5E4E2);
        mouseMaterial.emissive.setHex(0x475569);
        mouseUniforms.uAccentColor.value.set(0.05, 0.60, 0.95);
        mouseUniforms.uBorderBaseColor.value.set(0.18, 0.22, 0.28);
      }
      mouseMaterial.needsUpdate = true;
    }, [theme, mouseMaterial, mouseUniforms]);

    useFrame((state) => {
      const time = state.clock.elapsedTime;
      const isDark = theme === "dark";
      const neonColor = isDark ? 0xeab308 : 0x38bdf8;

      // Animate clock every frame with live time
      updateClockTexture(clockCanvas, theme);
      clockTexture.needsUpdate = true;

      // Animate blinking cursor on screen
      updateScreenTexture(screenCanvas, typingLines || []);
      screenTexture.needsUpdate = true;

      // Animate keyboard flowing RGB wave
      if (keyboardUniforms) {
        keyboardUniforms.uTime.value = time;
      }
      if (laptopKeyboardUniforms) {
        laptopKeyboardUniforms.uTime.value = time;
      }

      // Animate flowing theme color beam around mousepad border
      if (mousepadBorderUniforms) {
        mousepadBorderUniforms.uTime.value = time;
        mousepadBorderUniforms.uColor.value.set(isDark ? 0xeab308 : 0x38bdf8);
      }

      // Animate materials
      if (ref && (ref as any).current) {
        (ref as any).current.traverse((child: any) => {
          if (child.isMesh && child.material) {
            const lowerName = child.name.toLowerCase();
            const mat = child.material as THREE.MeshStandardMaterial;

            // Animate mouse scroll wheel pulse locked in the yellow center (or theme blue)
            if (
              lowerName.includes("middle_switcher") ||
              mat?.name === "Elastic_Rubber" ||
              child.name === "mesh_20_2"
            ) {
              if (mat?.emissive) {
                mat.emissive.setHex(neonColor);
                mat.emissiveIntensity = 2.2 + Math.sin(time * 2.5) * 0.4;
              }
            }


            // Breathing monitor backlight
            if (lowerName.includes("led_glow") || lowerName.includes("ring")) {
              mat.color.setHex(neonColor);
              if (mat?.emissiveIntensity !== undefined) {
                mat.emissiveIntensity = 2.0 + Math.sin(time * 3) * 1.5;
              }
            }
          }
        });
      }
    });

    return (
      <group ref={ref} position={position} rotation={rotation}>
        <Resize scale={maxDimension}>
          <Center>
            <primitive key={theme} object={cloned} />
          </Center>
        </Resize>
        {children}
      </group>
    );
  },
);

const Scene = ({
  typingLines,
  theme,
}: WorkspaceIllustrationProps & { theme: "light" | "dark" }) => {
  const deskSetupRef = useRef<THREE.Group>(null);
  const tileTexture = useMemo(() => createTileTexture(theme), [theme]);

  // Clock canvas for dedicated 3D desk clock
  const clockCanvas = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    return c;
  }, []);
  const clockTexture = useMemo(() => {
    const tex = new THREE.CanvasTexture(clockCanvas);
    tex.anisotropy = 16;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [clockCanvas]);

  useMemo(() => {
    updateClockTexture(clockCanvas, theme);
    clockTexture.needsUpdate = true;
  }, [clockCanvas, clockTexture, theme]);

  // GSAP 3D Animation for intro and floating
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    if (deskSetupRef.current) {
      // Intro scale pop
      tl.fromTo(
        deskSetupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1.2, ease: "back.out(1.2)" },
        0,
      );

      // Floating effect centered smoothly around y=0
      gsap.to(deskSetupRef.current.position, {
        y: 0.25,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
    }
  }, []);

  useFrame(() => {
    updateClockTexture(clockCanvas, theme);
    clockTexture.needsUpdate = true;
  });

  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={1.8} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Rim/Accent light - Yellow in Dark, Blue in Light */}
      <pointLight
        position={[-8, 6, -4]}
        intensity={3.5}
        color={theme === "dark" ? "#eab308" : "#38bdf8"}
      />
      {/* Strong Backlight to separate black table from dark background in Dark Mode */}
      <directionalLight
        position={[0, 5, -15]}
        intensity={3.0}
        color={theme === "dark" ? "#ffffff" : "#e2e8f0"}
      />
      {/* Soft warm fill light */}
      <pointLight position={[6, 8, 8]} intensity={1.5} color="#ffffff" />
      {/* Bottom up-light */}
      <pointLight position={[0, -2, 5]} intensity={1.2} color="#818cf8" />

      {/* Main Single Model - Positioned and oriented perfectly to face the user */}
      <Model
        ref={deskSetupRef}
        url="/WorkspaceIllustration.glb"
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        maxDimension={22}
        typingLines={typingLines}
        theme={theme}
      >
        {/* Dedicated 3D Digital Desk Clock with Live Current Time - Positioned firmly on the front edge of the desk */}
        <group
          position={[-4.5, 0.42, 5.8]}
          rotation={[0.22, Math.PI - 0.22, 0]}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.0, 0.9, 0.25]} />
            <meshStandardMaterial
              color={0x090d16}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          <mesh position={[0, 0, 0.14]}>
            <planeGeometry args={[1.9, 0.82]} />
            <meshStandardMaterial
              map={clockTexture}
              emissive={new THREE.Color(0xffffff)}
              emissiveMap={clockTexture}
              emissiveIntensity={1.9}
              roughness={0.1}
            />
          </mesh>
          {/* Angled kickstand wedge firmly resting on desk surface */}
          <mesh position={[0, -0.22, -0.16]} rotation={[0.45, 0, 0]} castShadow>
            <boxGeometry args={[0.9, 0.45, 0.1]} />
            <meshStandardMaterial
              color={0x1e293b}
              roughness={0.4}
              metalness={0.8}
            />
          </mesh>
        </group>
      </Model>

      {/* Tiled Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5.8, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          map={tileTexture || undefined}
          roughness={theme === "dark" ? 0.25 : 0.45}
          metalness={theme === "dark" ? 0.35 : 0.1}
        />
      </mesh>
    </>
  );
};

const LoadingFallback = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center opacity-20">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  </Html>
);

const WorkspaceIllustration: React.FC<WorkspaceIllustrationProps> = (props) => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-[38vh] sm:h-[52vh] md:h-[65vh] xl:h-[80vh] min-h-[270px] sm:min-h-[380px] md:min-h-[450px] relative cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-transparent touch-pan-y">
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 2.5, 17], fov: 42 }}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minDistance={1}
          maxDistance={30}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
        />
        <Suspense fallback={<LoadingFallback />}>
          <Scene {...props} theme={theme} />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 text-white text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md pointer-events-none z-10 border border-white/15">
        Drag to rotate 3D
      </div>
    </div>
  );
};

export default WorkspaceIllustration;
