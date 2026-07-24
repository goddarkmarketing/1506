export type ServiceCategoryId =
  | "hotel"
  | "tour"
  | "fit"
  | "mice"
  | "transfer"
  | "ticket"
  | "activity"
  | "extra";

export type DestinationId =
  | "bangkok"
  | "pattaya"
  | "phuket"
  | "krabi"
  | "chiangmai"
  | "chiangrai"
  | "samui"
  | "huahin"
  | "khaolak"
  | "surat"
  | "international";

export type TravelTypeId =
  | "private"
  | "couple"
  | "family"
  | "group"
  | "corporate"
  | "student"
  | "vip";

export type DurationId =
  | "halfday"
  | "1day"
  | "2d1n"
  | "3d2n"
  | "4plus"
  | "custom";

export type SortId =
  | "recommended"
  | "popular"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export type ViewMode = "grid" | "list";

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategoryId;
  subcategory: string;
  destination: DestinationId[];
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number | null;
  priceUnit: string;
  duration: DurationId;
  travelType: TravelTypeId[];
  features: string[];
  badges: string[];
  isFeatured: boolean;
  isFavorite: boolean;
  createdAt: string;
};

export const CATEGORY_META: Record<
  ServiceCategoryId,
  { label: string; short: string }
> = {
  hotel: { label: "ที่พักและโรงแรม", short: "ที่พัก" },
  tour: { label: "แพ็กเกจทัวร์", short: "ทัวร์" },
  fit: { label: "ทัวร์ FIT", short: "FIT" },
  mice: { label: "อินเซนทีฟและ MICE", short: "MICE" },
  transfer: { label: "รถรับส่งและการเดินทาง", short: "รถรับส่ง" },
  ticket: { label: "ตั๋วเครื่องบิน", short: "ตั๋ว" },
  activity: { label: "กิจกรรมและสถานที่ท่องเที่ยว", short: "กิจกรรม" },
  extra: { label: "บริการอื่น ๆ", short: "อื่น ๆ" },
};

export const DESTINATION_META: Record<DestinationId, string> = {
  bangkok: "กรุงเทพฯ",
  pattaya: "พัทยา",
  phuket: "ภูเก็ต",
  krabi: "กระบี่",
  chiangmai: "เชียงใหม่",
  chiangrai: "เชียงราย",
  samui: "สมุย",
  huahin: "หัวหิน",
  khaolak: "เขาหลัก",
  surat: "สุราษฎร์ธานี",
  international: "ต่างประเทศ",
};

export const TRAVEL_TYPE_META: Record<TravelTypeId, string> = {
  private: "เดินทางส่วนตัว",
  couple: "คู่รัก",
  family: "ครอบครัว",
  group: "กรุ๊ปทัวร์",
  corporate: "องค์กร",
  student: "นักเรียนและสถาบัน",
  vip: "VIP และ Luxury",
};

export const DURATION_META: Record<DurationId, string> = {
  halfday: "ครึ่งวัน",
  "1day": "1 วัน",
  "2d1n": "2 วัน 1 คืน",
  "3d2n": "3 วัน 2 คืน",
  "4plus": "4 วันขึ้นไป",
  custom: "กำหนดเอง",
};

export const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: "recommended", label: "แนะนำ" },
  { id: "popular", label: "ยอดนิยม" },
  { id: "price-asc", label: "ราคา: ต่ำไปสูง" },
  { id: "price-desc", label: "ราคา: สูงไปต่ำ" },
  { id: "rating", label: "คะแนนรีวิว" },
  { id: "newest", label: "ใหม่ล่าสุด" },
];

export const NAV_CATEGORIES: { id: ServiceCategoryId | "all"; label: string }[] = [
  { id: "all", label: "บริการทั้งหมด" },
  { id: "hotel", label: "ที่พักและโรงแรม" },
  { id: "tour", label: "แพ็กเกจทัวร์" },
  { id: "fit", label: "ทัวร์ FIT" },
  { id: "mice", label: "อินเซนทีฟและ MICE" },
  { id: "transfer", label: "รถรับส่งและการเดินทาง" },
  { id: "ticket", label: "ตั๋วเครื่องบิน" },
  { id: "activity", label: "กิจกรรมและสถานที่ท่องเที่ยว" },
  { id: "extra", label: "บริการอื่น ๆ" },
];
