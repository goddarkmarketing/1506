import type {
  DestinationId,
  DurationId,
  ServiceCategoryId,
  ServiceItem,
  SortId,
  TravelTypeId,
} from "./types";

export type FilterState = {
  q: string;
  category: ServiceCategoryId | "all";
  categories: ServiceCategoryId[];
  destinations: DestinationId[];
  travelTypes: TravelTypeId[];
  durations: DurationId[];
  features: string[];
  priceMin: number;
  priceMax: number;
  sort: SortId;
  page: number;
};

export const DEFAULT_FILTERS: FilterState = {
  q: "",
  category: "all",
  categories: [],
  destinations: [],
  travelTypes: [],
  durations: [],
  features: [],
  priceMin: 0,
  priceMax: 100000,
  sort: "recommended",
  page: 1,
};

export const PAGE_SIZE = 9;

export function filterServices(
  items: ServiceItem[],
  filters: FilterState
): ServiceItem[] {
  const q = filters.q.trim().toLowerCase();

  let result = items.filter((item) => {
    if (q) {
      const hay = `${item.title} ${item.description} ${item.subcategory}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    if (filters.category !== "all" && item.category !== filters.category) {
      return false;
    }

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(item.category)
    ) {
      return false;
    }

    if (
      filters.destinations.length > 0 &&
      !filters.destinations.some((d) => item.destination.includes(d))
    ) {
      return false;
    }

    if (
      filters.travelTypes.length > 0 &&
      !filters.travelTypes.some((t) => item.travelType.includes(t))
    ) {
      return false;
    }

    if (
      filters.durations.length > 0 &&
      !filters.durations.includes(item.duration)
    ) {
      return false;
    }

    if (
      filters.features.length > 0 &&
      !filters.features.every((f) => item.features.includes(f))
    ) {
      return false;
    }

    if (item.price !== null) {
      if (item.price < filters.priceMin) return false;
      if (filters.priceMax < 100000 && item.price > filters.priceMax) return false;
    }

    return true;
  });

  result = [...result].sort((a, b) => {
    switch (filters.sort) {
      case "popular":
        return b.reviewCount - a.reviewCount;
      case "price-asc":
        return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
      case "price-desc":
        return (b.price ?? -1) - (a.price ?? -1);
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.createdAt.localeCompare(a.createdAt);
      case "recommended":
      default:
        return Number(b.isFeatured) - Number(a.isFeatured) || b.rating - a.rating;
    }
  });

  return result;
}

export function formatPrice(price: number | null, unit: string) {
  if (price === null) return unit;
  return `เริ่มต้น ${price.toLocaleString("th-TH")} ${unit}`;
}

export function countByCategory(items: ServiceItem[]) {
  return items.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<ServiceCategoryId, number>>
  );
}
