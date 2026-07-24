import { redirect } from "next/navigation";
import { HOME_URL } from "@/lib/site";

/** Homepage lives on the static site — skip this Next.js stub. */
export default function HomePage() {
  redirect(HOME_URL);
}
