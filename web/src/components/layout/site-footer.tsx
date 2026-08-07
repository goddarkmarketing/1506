import Link from "next/link";
import { FooterEmailSignup } from "@/components/layout/footer-email-signup";

const payments = [
  "1736409068278-213734dd376baa9642331bf4620bcb41.png",
  "1736479220958-0c6dae87da47bf1bbf6ae51ab5150617.webp",
  "1736479521542-46cd24bde2c3910f5fa4e2d653eb6c23.webp",
  "1736480785634-7bd7a1c50dc24a0853b644f46c8b01df.png",
  "1736479507703-3399918fb9e71924ef2dddd4f8ccd947.png",
  "1736479511814-8264416bfb67d4a902623644c401b394.png",
  "1736480762727-aef62311a0107a1e58dac9b3492b4f4c.png",
  "1736480766464-76cce31dad31e2f72b89f4aea6c934b3.png",
  "1736480772015-8e13294a9e031c44af797d68c3a36299.png",
  "1736480775437-d4b01a73d59cf9b29a2197aaf6a8d26f.png",
  "1736480778815-598c66ec3869ba9cd2275e123b9aaaac.png",
  "1736409268808-110a2a25fce25ddc7943d10b4f0edde4.png",
];

export function SiteFooter() {
  return (
    <footer
      className="bg-[#03121A] bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/dg-footer-bg.png')" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_2fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dg-holiday-logo.svg"
              alt="D&G Holiday"
              width={200}
              height={90}
              className="mb-2 h-auto w-[200px]"
            />
            <h3 className="mt-6 text-base font-black tracking-wide">ข้อมูลติดต่อ</h3>
            <p className="mt-3 text-sm leading-[1.9] text-white/90">
              D&G Holiday (Thailand) Co., Ltd.
              <br />
              852/7 พฤกษาวิลล์ 60/2 ถนนหลวงแพ่ง
              <br />
              แขวงทับยาว เขตลาดกระบัง กรุงเทพฯ 10520
              <br />
              โทร:{" "}
              <a href="tel:+66821479553" className="text-[#FFC48A] hover:underline">
                +66 82 147 9553
              </a>
              <br />
              อีเมล:{" "}
              <a
                href="mailto:dgholidaythailand@gmail.com"
                className="text-[#FFC48A] hover:underline"
              >
                dgholidaythailand@gmail.com
              </a>
              <br />
              LINE:{" "}
              <a
                href="https://page.line.me/354ejhoo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFC48A] hover:underline"
              >
                @354ejhoo
              </a>
              <br />
              Facebook:{" "}
              <a
                href="https://www.facebook.com/dgholidaythailand"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFC48A] hover:underline"
              >
                dgholidaythailand
              </a>
            </p>
            <p className="mt-4 border-t border-white/20 pt-3 text-[12.5px] leading-[1.75] text-[#FFF5E6]/90">
              <strong className="font-semibold text-[#FFE7A8]">
                ใบอนุญาต / Tourism Business License No.:
              </strong>{" "}
              11/12868
              <br />
              <strong className="font-semibold text-[#FFE7A8]">
                Company Registration No.:
              </strong>{" "}
              0105561154132
              <br />
              <strong className="font-semibold text-[#FFE7A8]">ATTA Member:</strong>{" "}
              05614
            </p>
            <h3 className="mt-8 text-base font-black tracking-wide">ช่องทางชำระเงิน</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {payments.map((file) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={file}
                  src={`/images/payments/${file}`}
                  alt=""
                  width={84}
                  height={28}
                  className="h-7 w-[84px] rounded bg-white object-contain p-0.5"
                />
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
            <div>
              <h3 className="text-base font-black tracking-wide">เกี่ยวกับ D&G Holiday</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/90">
                <li>
                  <Link href="/travel-services" className="hover:underline">
                    Travel Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    ติดต่อเรา
                  </Link>
                </li>
                <li>
                  <Link href="/proposal" className="hover:underline">
                    Request a Proposal
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    เกี่ยวกับ D&G Holiday
                  </Link>
                </li>
              </ul>
              <h3 className="mt-8 text-base font-black tracking-wide">ติดตามเราได้ทาง</h3>
              <ul className="mt-4 flex gap-3">
                {[
                  {
                    href: "https://www.facebook.com/dgholidaythailand",
                    src: "/images/social/facebook.svg",
                    label: "Facebook",
                  },
                  {
                    href: "https://www.instagram.com/dg.holiday",
                    src: "/images/social/instagram.svg",
                    label: "Instagram",
                  },
                  {
                    href: "https://page.line.me/354ejhoo",
                    src: "/images/social/line.png",
                    label: "LINE",
                  },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.src} alt="" width={22} height={22} />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="https://page.line.me/354ejhoo"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex flex-col gap-2"
                aria-label="SCAN QR LINE"
              >
                <span className="text-base font-medium tracking-wide">SCAN QR</span>
                <span className="inline-block rounded-lg bg-white p-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/dg-line-qr.png"
                    alt="LINE QR"
                    width={140}
                    height={140}
                    className="h-[140px] w-[140px] object-contain"
                  />
                </span>
              </a>
            </div>

            <div className="min-w-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h3 className="text-base font-black tracking-wide">EXPLORE</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/90">
                    <li>
                      <Link href="/about" className="hover:underline">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/travel-services" className="hover:underline">
                        Travel Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/destinations" className="hover:underline">
                        Destinations
                      </Link>
                    </li>
                    <li>
                      <Link href="/gallery" className="hover:underline">
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link href="/articles" className="hover:underline">
                        Blog & Travel Guide
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-black tracking-wide">BUSINESS</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/90">
                    <li>
                      <Link href="/mice" className="hover:underline">
                        MICE & Events
                      </Link>
                    </li>
                    <li>
                      <Link href="/events" className="hover:underline">
                        Event Management
                      </Link>
                    </li>
                    <li>
                      <Link href="/india-market" className="hover:underline">
                        India Market
                      </Link>
                    </li>
                    <li>
                      <Link href="/destination-weddings" className="hover:underline">
                        Weddings
                      </Link>
                    </li>
                    <li>
                      <Link href="/proposal" className="hover:underline">
                        Request a Proposal
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-black tracking-wide">SUPPORT</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/90">
                    <li>
                      <Link href="/contact" className="hover:underline">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/about/partners-certifications" className="hover:underline">
                        Partners & Certifications
                      </Link>
                    </li>
                    <li>
                      <Link href="/travel-services/visa-travel-support" className="hover:underline">
                        Visa & Travel Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <FooterEmailSignup />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-3 text-center text-sm text-[#F0F1F2]">
        Copyright © 2026 D&G Holiday. All rights reserved
      </div>
    </footer>
  );
}
