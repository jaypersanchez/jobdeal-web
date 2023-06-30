import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useData } from "@/contexts/DataContext";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

export default function JobCategories() {
  const q = useSearchParams();
  const { categories } = useData();

  return (
    <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto overflow-x-hidden pr-3">
      {categories.map((c) => (
        <Link
          key={c.name}
          href={{ pathname: "", query: c.id ? { category: c.id } : {} }}
        >
          <button
            className={`flex gap-2 py-3 px-3 items-center w-full lg:w-[240px] rounded-sm ${
              (q.get("category") || "") === `${c.id}`
                ? "primary-background text-black font-semibold"
                : "text-white bg-[#202123]"
            }`}
          >
            <span>
              <BriefcaseIcon className="w-5 h-5" />
            </span>
            <span>{c.name}</span>
          </button>
        </Link>
      ))}
    </div>
  );
}
