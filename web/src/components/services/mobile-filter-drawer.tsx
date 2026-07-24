"use client";

import { X } from "lucide-react";
import { ServiceFilterSidebar } from "@/components/services/service-filter-sidebar";
import type { FilterState } from "@/lib/services/filter";

type Props = {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
};

export function MobileFilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onClear,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button
        type="button"
        aria-label="Close filters"
        className="absolute inset-0 bg-[#083B66]/45"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[20px] bg-[#F7F9FC] p-4 shadow-[0_-12px_40px_rgba(8,59,102,0.2)]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#083B66]">ตัวกรองบริการ</p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#083B66]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ServiceFilterSidebar
          filters={filters}
          onChange={onChange}
          onClear={onClear}
          onApply={onClose}
        />
      </div>
    </div>
  );
}
