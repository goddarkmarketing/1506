"use client";

import {
  BedDouble,
  Building2,
  CarFront,
  Compass,
  LayoutGrid,
  Plane,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_CATEGORIES, type ServiceCategoryId } from "@/lib/services/types";

const ICONS: Record<string, React.ElementType> = {
  all: LayoutGrid,
  hotel: BedDouble,
  tour: Compass,
  fit: Sparkles,
  mice: Building2,
  transfer: CarFront,
  ticket: Plane,
  activity: Ticket,
  extra: Users,
};

type Props = {
  active: ServiceCategoryId | "all";
  onChange: (id: ServiceCategoryId | "all") => void;
};

export function ServiceCategoryNav({ active, onChange }: Props) {
  return (
    <div className="border-b border-[#E5EAF0] bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.id] ?? LayoutGrid;
            const selected = active === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange(cat.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-[14px] border px-4 py-2.5 text-sm font-semibold transition",
                  selected
                    ? "border-[#FF6B21] bg-[#FF6B21] text-white shadow-[0_8px_20px_rgba(255,107,33,0.25)]"
                    : "border-[#E5EAF0] bg-white text-[#102A43] hover:border-[#083B66]/25"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
