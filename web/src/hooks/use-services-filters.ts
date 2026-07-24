"use client";

import { useCallback, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_FILTERS,
  PAGE_SIZE,
  filterServices,
  type FilterState,
} from "@/lib/services/filter";
import { SERVICES } from "@/lib/services/data";
import type {
  DestinationId,
  DurationId,
  ServiceCategoryId,
  SortId,
  TravelTypeId,
  ViewMode,
} from "@/lib/services/types";

function parseList<T extends string>(value: string | null): T[] {
  if (!value) return [];
  return value.split(",").filter(Boolean) as T[];
}

function parseFilters(params: URLSearchParams): FilterState {
  const category = (params.get("category") as ServiceCategoryId | "all") || "all";
  return {
    q: params.get("q") || "",
    category: category === "all" ? "all" : category,
    categories: parseList<ServiceCategoryId>(params.get("categories")),
    destinations: parseList<DestinationId>(params.get("destination")),
    travelTypes: parseList<TravelTypeId>(params.get("travelType")),
    durations: parseList<DurationId>(params.get("duration")),
    features: parseList<string>(params.get("features")),
    priceMin: Number(params.get("priceMin") || 0),
    priceMax: Number(params.get("priceMax") || 100000),
    sort: (params.get("sort") as SortId) || "recommended",
    page: Math.max(1, Number(params.get("page") || 1)),
  };
}

function toParams(filters: FilterState, view: ViewMode) {
  const p = new URLSearchParams();
  if (filters.q) p.set("q", filters.q);
  if (filters.category !== "all") p.set("category", filters.category);
  if (filters.categories.length) p.set("categories", filters.categories.join(","));
  if (filters.destinations.length) p.set("destination", filters.destinations.join(","));
  if (filters.travelTypes.length) p.set("travelType", filters.travelTypes.join(","));
  if (filters.durations.length) p.set("duration", filters.durations.join(","));
  if (filters.features.length) p.set("features", filters.features.join(","));
  if (filters.priceMin > 0) p.set("priceMin", String(filters.priceMin));
  if (filters.priceMax < 100000) p.set("priceMax", String(filters.priceMax));
  if (filters.sort !== "recommended") p.set("sort", filters.sort);
  if (filters.page > 1) p.set("page", String(filters.page));
  if (view !== "grid") p.set("view", view);
  return p;
}

export function useServicesFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const view = (searchParams.get("view") as ViewMode) || "grid";

  const setFilters = useCallback(
    (next: Partial<FilterState> & { view?: ViewMode }, replacePage = true) => {
      const merged: FilterState = {
        ...filters,
        ...next,
        page: replacePage && next.page === undefined ? 1 : (next.page ?? filters.page),
      };
      const nextView = next.view ?? view;
      const qs = toParams(merged, nextView).toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [filters, pathname, router, view]
  );

  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  const filtered = useMemo(() => filterServices(SERVICES, filters), [filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const featured = SERVICES.filter((s) => s.isFeatured);

  return {
    filters,
    view,
    setFilters,
    clearFilters,
    filtered,
    pageItems,
    featured,
    total: filtered.length,
    totalPages,
    page,
    pending,
    all: SERVICES,
  };
}

export { DEFAULT_FILTERS };
