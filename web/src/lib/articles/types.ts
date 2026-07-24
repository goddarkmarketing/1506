export type ArticleCategory =
  | "ประเทศไทย"
  | "ต่างประเทศ"
  | "โรงแรม"
  | "กิจกรรม"
  | "MICE"
  | "Luxury Travel"
  | "Family Travel"
  | "Business Travel"
  | "Travel Tips"
  | "Visa"
  | "Airline"
  | "Restaurant"
  | "Destination Guide";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: ArticleCategory;
  tags: string[];
  image: string;
  ogImage: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured?: boolean;
  metaTitle: string;
  metaDescription: string;
  destination?: string;
};

export type DestinationGuideItem = {
  name: string;
  slug: string;
  image: string;
  blurb: string;
};
