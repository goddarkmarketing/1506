export function ServiceCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[16px] border border-[#E5EAF0] bg-white">
      <div className="aspect-[4/3] bg-[#EEF5FA]" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-[80%] rounded bg-[#EEF5FA]" />
        <div className="h-3 w-[40%] rounded bg-[#EEF5FA]" />
        <div className="h-3 w-full rounded bg-[#EEF5FA]" />
        <div className="h-3 w-[75%] rounded bg-[#EEF5FA]" />
        <div className="mt-4 h-10 rounded-[14px] bg-[#EEF5FA]" />
      </div>
    </div>
  );
}

export function ServicesEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-[16px] border border-dashed border-[#E5EAF0] bg-white px-6 py-16 text-center">
      <h3 className="text-xl font-bold text-[#083B66]">ไม่พบบริการที่ตรงกับตัวกรอง</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#52667A]">
        ลองปรับหมวดหมู่ จุดหมายปลายทาง หรือช่วงราคาใหม่อีกครั้ง
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex h-11 items-center rounded-[14px] bg-[#FF6B21] px-5 text-sm font-semibold text-white hover:bg-[#E85E18]"
      >
        ล้างตัวกรองทั้งหมด
      </button>
    </div>
  );
}
