"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { countByCategory, type FilterState } from "@/lib/services/filter";
import { SERVICES } from "@/lib/services/data";
import {
  CATEGORY_META,
  DESTINATION_META,
  DURATION_META,
  TRAVEL_TYPE_META,
  type DestinationId,
  type DurationId,
  type ServiceCategoryId,
  type TravelTypeId,
} from "@/lib/services/types";

type Props = {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
  onApply?: () => void;
  className?: string;
};

function Accordion({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E5EAF0] py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left text-sm font-bold text-[#083B66]"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  count,
  onChange,
}: {
  label: string;
  checked: boolean;
  count?: number;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-1 py-1.5 text-sm text-[#102A43] hover:bg-[#F7F9FC]">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-[#E5EAF0] accent-[#FF6B21]"
        />
        {label}
      </span>
      {typeof count === "number" && (
        <span className="text-xs text-[#52667A]">({count})</span>
      )}
    </label>
  );
}

export function ServiceFilterSidebar({
  filters,
  onChange,
  onClear,
  onApply,
  className,
}: Props) {
  const counts = useMemo(() => countByCategory(SERVICES), []);
  const [destQuery, setDestQuery] = useState("");
  const [showAllDest, setShowAllDest] = useState(false);

  const destinations = (
    Object.entries(DESTINATION_META) as [DestinationId, string][]
  ).filter(([, label]) => label.includes(destQuery.trim()));
  const visibleDest = showAllDest ? destinations : destinations.slice(0, 6);

  const toggle = <T extends string>(list: T[], value: T) =>
    list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

  return (
    <aside
      className={cn(
        "rounded-[16px] border border-[#E5EAF0] bg-white p-5 shadow-[0_8px_30px_rgba(8,59,102,0.05)]",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-base font-bold text-[#083B66]">ค้นหา</h2>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF6B21] hover:underline"
        >
          <X className="h-3.5 w-3.5" />
          ล้างทั้งหมด
        </button>
      </div>

      <div className="relative mb-2">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52667A]" />
        <input
          value={filters.q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="ค้นหาชื่อบริการ"
          className="h-11 w-full rounded-[14px] border border-[#E5EAF0] bg-[#F7F9FC] pl-10 pr-3 text-sm text-[#102A43] outline-none focus:border-[#FF6B21]/50"
        />
      </div>

      <Accordion title="หมวดหมู่บริการ">
        {(Object.keys(CATEGORY_META) as ServiceCategoryId[]).map((id) => (
          <CheckRow
            key={id}
            label={CATEGORY_META[id].label}
            count={counts[id] ?? 0}
            checked={filters.categories.includes(id)}
            onChange={() =>
              onChange({ categories: toggle(filters.categories, id) })
            }
          />
        ))}
      </Accordion>

      <Accordion title="จุดหมายปลายทาง">
        <div className="relative mb-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#52667A]" />
          <input
            value={destQuery}
            onChange={(e) => setDestQuery(e.target.value)}
            placeholder="ค้นหาจุดหมาย"
            className="h-9 w-full rounded-xl border border-[#E5EAF0] bg-white pl-9 pr-3 text-xs outline-none"
          />
        </div>
        {visibleDest.map(([id, label]) => (
          <CheckRow
            key={id}
            label={label}
            checked={filters.destinations.includes(id)}
            onChange={() =>
              onChange({ destinations: toggle(filters.destinations, id) })
            }
          />
        ))}
        {destinations.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAllDest((v) => !v)}
            className="mt-1 text-xs font-semibold text-[#083B66] hover:underline"
          >
            {showAllDest ? "แสดงน้อยลง" : "แสดงเพิ่มเติม"}
          </button>
        )}
      </Accordion>

      <Accordion title="รูปแบบการเดินทาง">
        {(Object.keys(TRAVEL_TYPE_META) as TravelTypeId[]).map((id) => (
          <CheckRow
            key={id}
            label={TRAVEL_TYPE_META[id]}
            checked={filters.travelTypes.includes(id)}
            onChange={() =>
              onChange({ travelTypes: toggle(filters.travelTypes, id) })
            }
          />
        ))}
      </Accordion>

      <Accordion title="ช่วงราคา">
        <div className="space-y-3 px-1">
          <input
            type="range"
            min={0}
            max={100000}
            step={500}
            value={filters.priceMax}
            onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
            className="w-full accent-[#FF6B21]"
          />
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => onChange({ priceMin: Number(e.target.value) })}
              className="h-10 w-full rounded-xl border border-[#E5EAF0] px-3 text-sm"
              placeholder="ต่ำสุด"
            />
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
              className="h-10 w-full rounded-xl border border-[#E5EAF0] px-3 text-sm"
              placeholder="สูงสุด"
            />
          </div>
          <p className="text-xs text-[#52667A]">
            {filters.priceMin.toLocaleString("th-TH")} –{" "}
            {filters.priceMax >= 100000
              ? "100,000+"
              : filters.priceMax.toLocaleString("th-TH")}{" "}
            บาท
          </p>
        </div>
      </Accordion>

      <Accordion title="ระยะเวลา" defaultOpen={false}>
        {(Object.keys(DURATION_META) as DurationId[]).map((id) => (
          <CheckRow
            key={id}
            label={DURATION_META[id]}
            checked={filters.durations.includes(id)}
            onChange={() =>
              onChange({ durations: toggle(filters.durations, id) })
            }
          />
        ))}
      </Accordion>

      <Accordion title="ประเภทบริการ" defaultOpen={false}>
        {[
          "พร้อมคนขับ",
          "พร้อมไกด์",
          "รวมอาหาร",
          "รวมที่พัก",
          "รวมตั๋วเข้าชม",
          "รองรับกรุ๊ปองค์กร",
          "ปรับแต่งโปรแกรมได้",
        ].map((label) => (
          <CheckRow
            key={label}
            label={label}
            checked={filters.features.includes(label)}
            onChange={() =>
              onChange({ features: toggle(filters.features, label) })
            }
          />
        ))}
      </Accordion>

      <Button
        type="button"
        onClick={onApply}
        className="mt-5 w-full rounded-[14px] bg-[#FF6B21] hover:bg-[#E85E18]"
      >
        แสดงผลลัพธ์
      </Button>
    </aside>
  );
}
