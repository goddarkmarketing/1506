import type { Article, ArticleCategory, DestinationGuideItem } from "./types";

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "10-phuket-places-must-visit",
    title: "10 ที่เที่ยวภูเก็ตที่ต้องไปสักครั้งในชีวิต",
    excerpt:
      "แนะนำสถานที่ท่องเที่ยวชื่อดังในจังหวัดภูเก็ต ทั้งชายหาด จุดชมวิว และร้านอาหารที่ไม่ควรพลาด",
    content: [
      "ภูเก็ตยังคงเป็นจุดหมายยอดนิยมของนักเดินทางที่มองหาทะเลสวย ที่พักระดับพรีเมียม และประสบการณ์ที่ครบครันในทริปเดียว",
      "จากหาดป่าตองและหาดกะตะ ไปจนถึงจุดชมวิวโปรเมเทอุสและเกาะรอบ ๆ — การวางแพลนที่ดีช่วยให้คุณได้ทั้งพักผ่อนและสำรวจอย่างลงตัว",
      "ทีม D&G Holiday แนะนำให้จองที่พักและเรือล่วงหน้าในช่วงไฮซีซัน และเผื่อเวลาสำหรับมื้ออาหารริมทะเลยามเย็น",
    ],
    category: "ประเทศไทย",
    tags: ["Beach", "Island", "Resort", "Luxury Travel"],
    image: "/images/dg-phuket.jpg",
    ogImage: "/images/dg-phuket.jpg",
    author: "ทีมบรรณาธิการ D&G",
    authorRole: "Travel Editor",
    publishedAt: "2026-06-12",
    updatedAt: "2026-06-18",
    readingTime: 6,
    featured: true,
    metaTitle: "10 ที่เที่ยวภูเก็ตที่ต้องไป | D&G Holiday Travel Journal",
    metaDescription:
      "รวม 10 ที่เที่ยวภูเก็ต ทั้งชายหาด จุดชมวิว และร้านอาหาร ที่ควรไปสักครั้งในชีวิต พร้อมเคล็ดลับจากทีม D&G Holiday",
    destination: "ภูเก็ต",
  },
  {
    id: "2",
    slug: "chiang-mai-3-days-2-nights-guide",
    title: "คู่มือเที่ยวเชียงใหม่ 3 วัน 2 คืน แบบครบทุกไฮไลต์",
    excerpt:
      "รวมสถานที่ท่องเที่ยว คาเฟ่ วัด และธรรมชาติ พร้อมแพลนเที่ยวแบบใช้งานได้จริง",
    content: [
      "เชียงใหม่เหมาะกับทริปสั้นที่อยากได้ทั้งวัฒนธรรม ธรรมชาติ และคาเฟ่ในวันเดียว",
      "แพลน 3 วัน 2 คืนนี้ครอบคลุมเมืองเก่า ดอยสุเทพ และย่านนิมมาน — จัดจังหวะไม่เร่งเกินไป",
      "หากเดินทางเป็นครอบครัวหรือกรุ๊ปองค์กร สามารถปรับเส้นทางและที่พักให้เหมาะกับงบได้โดยตรงกับที่ปรึกษาของเรา",
    ],
    category: "Destination Guide",
    tags: ["Culture", "Family", "Food", "Adventure"],
    image: "/images/dg-samui.jpg",
    ogImage: "/images/dg-samui.jpg",
    author: "กานต์ธีรา ส.",
    authorRole: "Destination Specialist",
    publishedAt: "2026-05-28",
    updatedAt: "2026-06-02",
    readingTime: 8,
    metaTitle: "คู่มือเที่ยวเชียงใหม่ 3 วัน 2 คืน | D&G Holiday",
    metaDescription:
      "แพลนเที่ยวเชียงใหม่ 3 วัน 2 คืน ครบวัด คาเฟ่ และธรรมชาติ พร้อมใช้จริงได้ทันที",
    destination: "เชียงใหม่",
  },
  {
    id: "3",
    slug: "5-tips-choosing-hotel-travel-style",
    title: "5 เคล็ดลับการเลือกโรงแรมให้เหมาะกับทุกสไตล์การเดินทาง",
    excerpt:
      "แนะนำวิธีเลือกโรงแรมสำหรับคู่รัก ครอบครัว นักธุรกิจ และนักเดินทางแบบ Luxury",
    content: [
      "โรงแรมที่ดีไม่ใช่แค่ราคา แต่คือความพอดีกับวัตถุประสงค์ของทริป",
      "คู่รักอาจเน้นวิวและบรรยากาศ ส่วนครอบครัวต้องการพื้นที่และสิ่งอำนวยความสะดวกเด็ก",
      "สำหรับทริปธุรกิจและ MICE ทำเล การเชื่อมต่ออินเทอร์เน็ต และห้องประชุมคือหัวใจสำคัญ",
    ],
    category: "Travel Tips",
    tags: ["Hotel", "Resort", "Luxury Travel", "Family"],
    image: "/images/dg-krabi.jpg",
    ogImage: "/images/dg-krabi.jpg",
    author: "นภัสสร พ.",
    authorRole: "Hospitality Advisor",
    publishedAt: "2026-05-10",
    updatedAt: "2026-05-15",
    readingTime: 5,
    metaTitle: "5 เคล็ดลับเลือกโรงแรมให้เหมาะกับสไตล์การเดินทาง | D&G Holiday",
    metaDescription:
      "เลือกโรงแรมอย่างไรให้เหมาะกับคู่รัก ครอบครัว นักธุรกิจ และทริป Luxury — เคล็ดลับจาก D&G Holiday",
  },
  {
    id: "4",
    slug: "what-is-corporate-mice",
    title: "Corporate MICE คืออะไร ทำไมองค์กรชั้นนำถึงเลือกใช้",
    excerpt:
      "อธิบายบริการประชุม สัมมนา Incentive และ Team Building พร้อมประโยชน์ที่องค์กรจะได้รับ",
    content: [
      "MICE ครอบคลุม Meetings, Incentives, Conferences และ Exhibitions — เครื่องมือสำคัญขององค์กรที่ต้องการสร้าง engagement",
      "การออกแบบโปรแกรมที่ดีช่วยให้ทีมได้ทั้งผลลัพธ์ทางธุรกิจและประสบการณ์ที่น่าจดจำ",
      "D&G Holiday ดูแลตั้งแต่สถานที่ ที่พัก โลจิสติกส์ ไปจนถึงกิจกรรม Team Building ในจุดหมายทั้งไทยและต่างประเทศ",
    ],
    category: "MICE",
    tags: ["MICE", "Business Travel", "Private Tour"],
    image: "/images/dg-phuket-sunset.png",
    ogImage: "/images/dg-phuket-sunset.png",
    author: "ธนพล ว.",
    authorRole: "MICE Consultant",
    publishedAt: "2026-04-22",
    updatedAt: "2026-04-30",
    readingTime: 7,
    metaTitle: "Corporate MICE คืออะไร | D&G Holiday Travel Journal",
    metaDescription:
      "ทำความเข้าใจ Corporate MICE และการออกแบบประชุม Incentive Team Building ให้ได้ผลสำหรับองค์กร",
  },
];

export const CATEGORY_COUNTS: { name: ArticleCategory; count: number }[] = [
  { name: "ประเทศไทย", count: 18 },
  { name: "ต่างประเทศ", count: 12 },
  { name: "โรงแรม", count: 9 },
  { name: "กิจกรรม", count: 14 },
  { name: "MICE", count: 7 },
  { name: "Luxury Travel", count: 11 },
  { name: "Family Travel", count: 8 },
  { name: "Business Travel", count: 6 },
  { name: "Travel Tips", count: 15 },
  { name: "Visa", count: 4 },
  { name: "Airline", count: 5 },
  { name: "Restaurant", count: 10 },
  { name: "Destination Guide", count: 13 },
];

export const POPULAR_DESTINATIONS = [
  "ประเทศไทย",
  "ภูเก็ต",
  "กระบี่",
  "สมุย",
  "เชียงใหม่",
  "กรุงเทพฯ",
  "หัวหิน",
  "พัทยา",
  "ญี่ปุ่น",
  "สิงคโปร์",
  "เวียดนาม",
];

export const POPULAR_TAGS = [
  "Luxury Travel",
  "Beach",
  "Family",
  "MICE",
  "Adventure",
  "Resort",
  "Hotel",
  "Island",
  "Private Tour",
  "Wellness",
  "Food",
  "Culture",
];

export const DESTINATION_GUIDES: DestinationGuideItem[] = [
  {
    name: "ประเทศไทย",
    slug: "thailand",
    image: "/images/dg-phuket.jpg",
    blurb: "ทะเล วัฒนธรรม และทริปองค์กรครบวงจร",
  },
  {
    name: "ญี่ปุ่น",
    slug: "japan",
    image: "/images/dg-samui.jpg",
    blurb: "เมือง ธรรมชาติ และฤดูกาลที่ไม่เหมือนใคร",
  },
  {
    name: "เกาหลี",
    slug: "korea",
    image: "/images/dg-krabi.jpg",
    blurb: "โซล ปูซาน และทริป Incentive ที่ทันสมัย",
  },
  {
    name: "เวียดนาม",
    slug: "vietnam",
    image: "/images/dg-trang.jpg",
    blurb: "ฮานอย ดานัง และชายหาดที่คุ้มค่า",
  },
  {
    name: "สิงคโปร์",
    slug: "singapore",
    image: "/images/dg-songkhla.jpg",
    blurb: "เมืองสั้น ๆ แต่เต็มไปด้วยประสบการณ์",
  },
  {
    name: "ยุโรป",
    slug: "europe",
    image: "/images/dg-phuket-sunset.png",
    blurb: "ทริปพรีเมียมสำหรับคู่รักและองค์กร",
  },
];

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticle() {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
}

export function getLatestArticles(excludeSlug?: string) {
  return ARTICLES.filter((a) => a.slug !== excludeSlug).sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
}

export function getRecommendedArticles(limit = 5) {
  return getLatestArticles().slice(0, limit);
}

export function getRelatedArticles(article: Article, limit = 3) {
  return ARTICLES.filter(
    (a) =>
      a.slug !== article.slug &&
      (a.category === article.category ||
        a.tags.some((t) => article.tags.includes(t)))
  ).slice(0, limit);
}

export function getAdjacentArticles(slug: string) {
  const ordered = getLatestArticles();
  const index = ordered.findIndex((a) => a.slug === slug);
  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function formatArticleDate(iso: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
