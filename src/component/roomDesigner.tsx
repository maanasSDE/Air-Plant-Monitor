import React, { useState } from "react";
import {
  Sun,
  DoorOpen as Door,
  AppWindow as Window,
  CookingPot,
  Fan,
  Plane as Plant,
  Square,
  Trash2,
  Save,
} from "lucide-react";

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

  const tools = [
    { type: "wall", icon: Square, label: "Wall" },
    { type: "door", icon: Door, label: "Door" },
    { type: "window", icon: Window, label: "Window" },
    { type: "cooking", icon: CookingPot, label: "Cooking Area" },
  ] as const;

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = { type: selectedTool };
    setGrid(newGrid);
    setSelectedCell(null);
  };

  const calculateLightLevels = () => {
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) => {
        let lightLevel: LightLevel = "low";

        // Check proximity to windows
        const windowDistance = findNearestDistance(i, j, "window");
        if (windowDistance < 2) lightLevel = "high";
        else if (windowDistance < 4) lightLevel = "medium";

        // Get random plant recommendation for the light level
        const recommendations = plantRecommendations[lightLevel];
        const randomIndex = Math.floor(Math.random() * recommendations.length);
        const plantRecommendation = recommendations[randomIndex].name;

        return { ...cell, lightLevel, plantRecommendation };
      })
    );
    return newGrid;
  };

  const calculatePollutionLevels = () => {
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) => {
        let pollutionLevel: "low" | "medium" | "high" = "low";

        // Check proximity to pollution sources
        const doorDistance = findNearestDistance(i, j, "door");
        const cookingDistance = findNearestDistance(i, j, "cooking");

        if (doorDistance < 2 || cookingDistance < 2) pollutionLevel = "high";
        else if (doorDistance < 4 || cookingDistance < 4)
          pollutionLevel = "medium";

        return { ...cell, pollutionLevel };
      })
    );
    return newGrid;
  };

  const findNearestDistance = (row: number, col: number, type: CellType) => {
    let minDistance = Infinity;

    grid.forEach((gridRow, i) => {
      gridRow.forEach((cell, j) => {
        if (cell.type === type) {
          const distance = Math.sqrt(
            Math.pow(row - i, 2) + Math.pow(col - j, 2)
          );
          minDistance = Math.min(minDistance, distance);
        }
      });
    });

    return minDistance;
  };

  const generateRecommendations = () => {
    const lightLevels = calculateLightLevels();
    const pollutionLevels = calculatePollutionLevels();

    const newGrid = lightLevels.map((row, i) =>
      row.map((cell, j) => {
        const light = cell.lightLevel;
        const pollution = pollutionLevels[i][j].pollutionLevel;

        if (cell.type === "empty") {
          // Recommend air purifiers near high pollution areas
          if (pollution === "high") {
            return { ...cell, type: "purifier" };
          }
          // Recommend plants based on light levels
          if (light) {
            return { ...cell, type: "plant" };
          }
        }
        return cell;
      })
    );

    setGrid(newGrid);
    setShowRecommendations(true);
  };

  const resetGrid = () => {
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() =>
          Array(GRID_SIZE)
            .fill(null)
            .map(() => ({ type: "empty" }))
        )
    );
    setShowRecommendations(false);
    setSelectedCell(null);
  };

  const getCellColor = (cell: GridCell) => {
    if (cell.type === "empty") return "bg-white";
    if (cell.type === "wall") return "bg-gray-800";
    if (cell.type === "door") return "bg-amber-700";
    if (cell.type === "window") return "bg-sky-300";
    if (cell.type === "cooking") return "bg-red-500";
    if (cell.type === "plant") {
      if (cell.lightLevel === "high") return "bg-emerald-500";
      if (cell.lightLevel === "medium") return "bg-emerald-400";
      return "bg-emerald-300";
    }
    if (cell.type === "purifier") return "bg-purple-500";
    return "bg-white";
  };

  const getCellIcon = (cell: GridCell) => {
    if (cell.type === "plant") return <Plant className="w-4 h-4 text-white" />;
    if (cell.type === "purifier") return <Fan className="w-4 h-4 text-white" />;
    return null;
  };

  const handleCellInfo = (row: number, col: number) => {
    if (grid[row][col].type === "plant") {
      setSelectedCell({ row, col });
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Room Layout Designer
      </h2>

      {/* Toolbar */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {tools.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setSelectedTool(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedTool === type
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[2fr,1fr] gap-8">
        {/* Grid */}
        <div>
          <div className="grid grid-cols-10 gap-1 mb-6">
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <button
                  key={`${i}-${j}`}
                  onClick={() => handleCellClick(i, j)}
                  onMouseEnter={() => handleCellInfo(i, j)}
                  className={`w-full pt-[100%] relative ${getCellColor(cell)} 
                    hover:opacity-75 transition-all rounded-md`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {getCellIcon(cell)}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={generateRecommendations}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold 
                hover:bg-emerald-700 transition-all hover:scale-105 transform flex items-center gap-2"
            >
              <Plant className="w-5 h-5" />
              Generate Recommendations
            </button>
            <button
              onClick={resetGrid}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold 
                hover:bg-gray-300 transition-all flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Light Levels Panel */}
        {showRecommendations && (
          <div className="bg-gray-50 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Light Levels
            </h3>
            <div className="space-y-6">
              {/* High Light */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <span className="font-semibold">High Light Areas</span>
                </div>
                <p className="text-sm text-gray-600 pl-6">
                  Areas close to windows receiving bright, indirect sunlight
                  throughout the day.
                </p>
              </div>

              {/* Medium Light */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                  <span className="font-semibold">Medium Light Areas</span>
                </div>
                <p className="text-sm text-gray-600 pl-6">
                  Areas receiving moderate light, typically 4-6 feet from
                  windows.
                </p>
              </div>

              {/* Low Light */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-emerald-300 rounded-full"></div>
                  <span className="font-semibold">Low Light Areas</span>
                </div>
                <p className="text-sm text-gray-600 pl-6">
                  Areas far from windows or receiving minimal natural light.
                </p>
              </div>

              {/* Air Purifiers */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="font-semibold">Air Purifier Locations</span>
                </div>
                <p className="text-sm text-gray-600 pl-6">
                  Recommended near doors, windows, and cooking areas to filter
                  incoming air and pollutants.
                </p>
              </div>
            </div>

            {selectedCell &&
              grid[selectedCell.row][selectedCell.col].plantRecommendation && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Selected Location
                  </h4>
                  <p className="text-sm text-gray-600">
                    Recommended plant:{" "}
                    {
                      grid[selectedCell.row][selectedCell.col]
                        .plantRecommendation
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    Light level:{" "}
                    {grid[selectedCell.row][selectedCell.col].lightLevel}
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
