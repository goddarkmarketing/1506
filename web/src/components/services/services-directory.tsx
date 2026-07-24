"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ServicesHero } from "@/components/services/services-hero";
import { ServiceCategoryNav } from "@/components/services/service-category-nav";
import { ServiceFilterSidebar } from "@/components/services/service-filter-sidebar";
import { MobileFilterDrawer } from "@/components/services/mobile-filter-drawer";
import { ServiceResultsHeader } from "@/components/services/service-results-header";
import { ActiveFilterChips } from "@/components/services/active-filter-chips";
import { FeaturedServices } from "@/components/services/featured-services";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceListItem } from "@/components/services/service-list-item";
import { ServicePagination } from "@/components/services/service-pagination";
import { ServiceTrustSection } from "@/components/services/service-trust-section";
import {
  ServiceCardSkeleton,
  ServicesEmptyState,
} from "@/components/services/service-states";
import { useServicesFilters } from "@/hooks/use-services-filters";

export function ServicesDirectory() {
  const {
    filters,
    view,
    setFilters,
    clearFilters,
    pageItems,
    featured,
    total,
    totalPages,
    page,
    pending,
  } = useServicesFilters();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (!pending) {
      setShowSkeleton(false);
      return;
    }
    const t = setTimeout(() => setShowSkeleton(true), 120);
    return () => clearTimeout(t);
  }, [pending]);

  return (
    <>
      <ServicesHero
        initialQuery={filters.q}
        onSearch={(q) => setFilters({ q })}
        onPopular={(q) => setFilters({ q })}
      />
      <ServiceCategoryNav
        active={filters.category}
        onChange={(category) => setFilters({ category })}
      />

      <section className="bg-[#F7F9FC] py-10 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 lg:grid-cols-[280px_1fr] lg:px-8">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ServiceFilterSidebar
                filters={filters}
                onChange={(patch) => setFilters(patch)}
                onClear={clearFilters}
              />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
              <p className="text-sm font-semibold text-[#083B66]">
                พบ {total} บริการ
              </p>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-[14px] border border-[#E5EAF0] bg-white px-4 text-sm font-semibold text-[#083B66]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                ตัวกรอง
              </button>
            </div>

            <ServiceResultsHeader
              total={total}
              sort={filters.sort}
              view={view}
              onSort={(sort) => setFilters({ sort })}
              onView={(nextView) => setFilters({ view: nextView })}
            />
            <ActiveFilterChips
              filters={filters}
              onChange={(patch) => setFilters(patch)}
              onClear={clearFilters}
            />

            {!filters.categories.length &&
              filters.category === "all" &&
              !filters.q &&
              !filters.destinations.length && (
                <div className="mt-8">
                  <FeaturedServices items={featured} />
                </div>
              )}

            <div className="mt-8">
              {showSkeleton ? (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ServiceCardSkeleton key={i} />
                  ))}
                </div>
              ) : total === 0 ? (
                <ServicesEmptyState onClear={clearFilters} />
              ) : view === "list" ? (
                <div className="space-y-5">
                  {pageItems.map((item) => (
                    <ServiceListItem key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                  {pageItems.map((item) => (
                    <ServiceCard
                      key={item.id}
                      item={item}
                      favorite={favorites[item.id]}
                      onToggleFavorite={(id) =>
                        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            <ServicePagination
              page={page}
              totalPages={totalPages}
              onChange={(nextPage) => setFilters({ page: nextPage }, false)}
            />
          </div>
        </div>
      </section>

      <ServiceTrustSection />

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={(patch) => setFilters(patch)}
        onClear={clearFilters}
      />
    </>
  );
}
