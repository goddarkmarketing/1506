"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SidebarSearch({
  onSearch,
  initialQuery = "",
}: {
  onSearch?: (q: string) => void;
  initialQuery?: string;
}) {
  const [q, setQ] = useState(initialQuery);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(q.trim());
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <div className="flex flex-1 items-center gap-2 rounded-[12px] border border-[#E5EAF0] bg-white px-3">
        <Search className="h-4 w-4 text-[#52667A]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหาบทความ"
          className="h-11 w-full bg-transparent text-sm text-[#03121A] outline-none placeholder:text-[#8A9AAB]"
        />
      </div>
      <Button type="submit" size="sm" className="h-11 rounded-[12px] px-4">
        ค้นหา
      </Button>
    </form>
  );
}
