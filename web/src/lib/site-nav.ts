import navJson from "@/data/site-nav.json";

export type NavLeaf = {
  id: string;
  label: string;
  href: string;
  heroTitle?: string;
  description?: string;
  bullets?: string[];
  gallery?: boolean;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  kind?: "link" | "section" | "cta";
  external?: boolean;
  showInNav?: boolean;
  heroTitle?: string;
  description?: string;
  /** Pages under this section (hub cards + leaf routes). */
  children?: NavLeaf[];
  /** Mega-menu links (may include cross-section pages). Falls back to children. */
  navChildren?: NavLeaf[];
};

export type SiteNavData = {
  items: NavItem[];
};

export const siteNav = navJson as SiteNavData;

export function getNavItems(): NavItem[] {
  return siteNav.items.filter(
    (item) => item.showInNav !== false && item.kind !== "cta"
  );
}

export function getMegaChildren(item: NavItem): NavLeaf[] {
  return item.navChildren ?? item.children ?? [];
}

export function getSectionItems(): NavItem[] {
  return siteNav.items.filter((item) => item.kind === "section");
}

/** Sections handled by the dynamic (ia)/[section] routes (excludes about — uses dedicated pages). */
export const DYNAMIC_SECTIONS = [
  "travel-services",
  "mice",
  "events",
  "india-market",
  "destination-weddings",
  "destinations",
  "gallery",
] as const;

export type DynamicSectionId = (typeof DYNAMIC_SECTIONS)[number];

export function getSection(sectionId: string): NavItem | undefined {
  return siteNav.items.find(
    (item) => item.id === sectionId && item.kind === "section"
  );
}

export function getLeaf(
  sectionId: string,
  slug: string
): { section: NavItem; leaf: NavLeaf } | undefined {
  const section = getSection(sectionId);
  if (!section?.children) return undefined;
  const leaf = section.children.find((c) => c.id === slug);
  if (!leaf) return undefined;
  return { section, leaf };
}

export function allSectionParams(): { section: string }[] {
  return DYNAMIC_SECTIONS.map((section) => ({ section }));
}

export function allLeafParams(): { section: string; slug: string }[] {
  const params: { section: string; slug: string }[] = [];
  for (const sectionId of DYNAMIC_SECTIONS) {
    const section = getSection(sectionId);
    for (const child of section?.children ?? []) {
      params.push({ section: sectionId, slug: child.id });
    }
  }
  return params;
}

export function allAboutLeafParams(): { slug: string }[] {
  const about = getSection("about");
  return (about?.children ?? []).map((c) => ({ slug: c.id }));
}

/** Relative href for static HTML (strip leading slash, keep trailing). */
export function staticHref(href: string, fromDepth = 0): string {
  if (href === "/") {
    return fromDepth === 0 ? "index.html" : "../".repeat(fromDepth) + "index.html";
  }
  const clean = href.replace(/^\//, "");
  const prefix = fromDepth > 0 ? "../".repeat(fromDepth) : "";
  return prefix + clean;
}
