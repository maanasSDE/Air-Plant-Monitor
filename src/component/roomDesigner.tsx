import React, { useState } from "react";

type CellType =
  | "empty"
  | "wall"
  | "door"
  | "window"
  | "cooking"
  | "plant"
  | "purifier";
type LightLevel = "low" | "medium" | "high";
type GridCell = {
  type: CellType;
  lightLevel?: LightLevel;
  pollutionLevel?: "low" | "medium" | "high";
  plantRecommendation?: string;
};

const GRID_SIZE = 10;

// Plant recommendations based on light levels
const plantRecommendations: Record<
  LightLevel,
  Array<{ name: string; description: string }>
> = {
  high: [
    {
      name: "Fiddle Leaf Fig",
      description: "Thrives in bright, indirect sunlight",
    },
    {
      name: "Bird of Paradise",
      description: "Loves bright light and grows tall",
    },
    {
      name: "Monstera Deliciosa",
      description: "Perfect for bright, filtered light",
    },
    { name: "Rubber Plant", description: "Adapts well to bright conditions" },
  ],
  medium: [
    {
      name: "Peace Lily",
      description: "Tolerates moderate light, great air purifier",
    },
    {
      name: "Chinese Evergreen",
      description: "Adaptable to medium light conditions",
    },
    {
      name: "Philodendron",
      description: "Versatile, grows well in moderate light",
    },
    { name: "Spider Plant", description: "Easy-care plant for medium light" },
  ],
  low: [
    {
      name: "Snake Plant",
      description: "Excellent in low light, air purifying",
    },
    { name: "ZZ Plant", description: "Thrives in low light conditions" },
    { name: "Pothos", description: "Adaptable to low light areas" },
    { name: "Cast Iron Plant", description: "Very tolerant of low light" },
  ],
};

export default function RoomDesigner() {
  const [selectedTool, setSelectedTool] = useState<CellType>("wall");
  const [grid, setGrid] = useState<GridCell[][]>(
    Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => ({ type: "empty" }))
      )
  );
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
}
