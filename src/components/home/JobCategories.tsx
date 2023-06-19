import { useState } from "react";
import { CATEGORY } from "./category";

export default function JobCategories() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto overflow-x-hidden pr-3">
      {CATEGORY.map((c) => (
        <button
          key={c.name}
          onClick={() => setSelected(c)}
          className={`flex gap-2 py-3 px-3 items-center w-[240px] rounded-sm ${
            selected === c
              ? "primary-background text-black font-semibold"
              : "text-white bg-[#202123]"
          }`}
        >
          <span>{c.icon}</span>
          <span>{c.name}</span>
        </button>
      ))}
    </div>
  );
}
