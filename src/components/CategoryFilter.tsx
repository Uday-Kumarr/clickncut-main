
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Camera, Component, Film, PaintBucket, Grid, Lightbulb, Plane } from "lucide-react";

type CategoryFilterProps = {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
};

const categories: { value: Category; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All", icon: <Grid className="h-4 w-4" /> },
  { value: "camera", label: "Cameras", icon: <Camera className="h-4 w-4" /> },
  { value: "lens", label: "Lenses", icon: <Component className="h-4 w-4" /> },
  { value: "accessory", label: "Accessories", icon: <Film className="h-4 w-4" /> },
  { value: "lighting", label: "Lighting", icon: <Lightbulb className="h-4 w-4" /> },
  { value: "drone", label: "Drones", icon: <Plane className="h-4 w-4" /> },
  { value: "editing", label: "Editing", icon: <PaintBucket className="h-4 w-4" /> },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-none space-x-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={activeCategory === category.value ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full",
            activeCategory === category.value
              ? "bg-primary text-white"
              : "bg-transparent hover:text-primary"
          )}
          onClick={() => onCategoryChange(category.value)}
        >
          {category.icon}
          <span className="ml-2">{category.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
