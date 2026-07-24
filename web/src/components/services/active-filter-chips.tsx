"use client";

import { X } from "lucide-react";
import type { FilterState } from "@/lib/services/filter";
import {
  CATEGORY_META,
  DESTINATION_META,
  DURATION_META,
  TRAVEL_TYPE_META,
} from "@/lib/services/types";

type Chip = { key: string; label: string; onRemove: () => void };

type Props = {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
};

export function ActiveFilterChips({ filters, onChange, onClear }: Props) {
  const chips: Chip[] = [];

  if (filters.q) {
    chips.push({
      key: `q-${filters.q}`,
      label: filters.q,
      onRemove: () => onChange({ q: "" }),
    });
  }
  if (filters.category !== "all") {
    chips.push({
      key: `cat-nav-${filters.category}`,
      label: CATEGORY_META[filters.category].label,
      onRemove: () => onChange({ category: "all" }),
    });
  }
  filters.categories.forEach((c) => {
    chips.push({
      key: `cat-${c}`,
      label: CATEGORY_META[c].label,
      onRemove: () =>
        onChange({ categories: filters.categories.filter((x) => x !== c) }),
    });
  });
  filters.destinations.forEach((d) => {
    chips.push({
      key: `dest-${d}`,
      label: DESTINATION_META[d],
      onRemove: () =>
        onChange({ destinations: filters.destinations.filter((x) => x !== d) }),
    });
  });
  filters.travelTypes.forEach((t) => {
    chips.push({
      key: `travel-${t}`,
      label: TRAVEL_TYPE_META[t],
      onRemove: () =>
        onChange({ travelTypes: filters.travelTypes.filter((x) => x !== t) }),
    });
  });
  filters.durations.forEach((d) => {
    chips.push({
      key: `dur-${d}`,
      label: DURATION_META[d],
      onRemove: () =>
        onChange({ durations: filters.durations.filter((x) => x !== d) }),
    });
  });
  filters.features.forEach((f) => {
    chips.push({
      key: `feat-${f}`,
      label: f,
      onRemove: () =>
        onChange({ features: filters.features.filter((x) => x !== f) }),
    });
  });

  if (!chips.length) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5EAF0] bg-white px-3 py-1.5 text-xs font-semibold text-[#083B66] transition hover:border-[#FF6B21]/40"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-xs font-semibold text-[#FF6B21] hover:underline"
      >
        ล้างตัวกรองทั้งหมด
      </button>
    </div>
  );
}
