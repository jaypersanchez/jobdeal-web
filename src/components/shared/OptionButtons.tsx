import { IOption } from "@/types";

interface Props {
  options: IOption[];
  value?: string | number;
  onChange: (option: IOption) => void;
  highlight?: boolean;
}

interface OptionButtonProps {
  option: IOption;
  selected: boolean;
  onClick: () => void;
  highlight?: boolean;
}

function OptionButton({
  option,
  selected,
  highlight,
  onClick,
}: OptionButtonProps) {
  return (
    <div className="relative">
      <button
        className={`rounded border px-3 py-2 flex items-center gap-2 text-[14px] relative ${
          selected ? "font-semibold" : "text-white border-1 border-white"
        }`}
        style={
          selected
            ? {
                background:
                  "linear-gradient(97.24deg, rgba(123, 220, 181, 0.06) 10.19%, rgba(0, 208, 132, 0.06) 63.33%)",
                borderColor: "#43DF9B",
                backdropFilter: "blur(2.7px)",
              }
            : {}
        }
        onClick={onClick}
      >
        <span
          className={`w-3 h-3 rounded-full ${
            selected
              ? "border-[3px] border-[#43DF9B]"
              : "border-slate-50 border-[1.3px]"
          }`}
        />
        <span className={selected ? "primary-gradient-text" : ""}>
          {option.label}
        </span>
      </button>

      {selected && highlight && (
        <span
          className="p-[6px] rounded-full absolute bg-[#43DF9B] top-[-4px] left-[0px]"
          style={{
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
}

export default function OptionButtons({
  options,
  value,
  onChange,
  highlight = false,
}: Props) {
  return (
    <div className="flex gap-1">
      {options.map((option) => (
        <OptionButton
          key={option.value}
          option={option}
          highlight={highlight}
          selected={option.value === value}
          onClick={() => onChange(option)}
        />
      ))}
    </div>
  );
}
