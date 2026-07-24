export function ContactMap() {
  const query = encodeURIComponent(
    "852/7 พฤกษาวิลล์ 60/2 ถนนหลวงแพ่ง แขวงทับยาว เขตลาดกระบัง กรุงเทพมหานคร 10520"
  );

  return (
    <section className="border-t border-[#E5EAF0] bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF7A1A]">Location</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[#0B2E59]">
          แผนที่สำนักงาน
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#52667A] md:text-base">
          ลาดกระบัง กรุงเทพฯ — นัดหมายล่วงหน้าผ่าน LINE หรือโทรก่อนเดินทางมาพบ
        </p>

        <div className="mt-8 overflow-hidden rounded-[20px] border border-[#E5EAF0] shadow-[0_12px_40px_rgba(8,59,102,0.08)]">
          <iframe
            title="แผนที่ D&G Holiday Thailand"
            src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
            className="h-[320px] w-full border-0 md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
