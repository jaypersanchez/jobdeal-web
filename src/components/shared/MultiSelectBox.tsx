import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IOption } from "@/types";

interface Props {
  options: IOption[];
  values: (number | string)[];
  onChange: (values: (number | string)[]) => void;
  placeholder?: string;
}

export default function MultiSelectBox({ options, values, onChange, placeholder }: Props) {
  // const [selected, setSelected] = useState(people[0]);

  const selected = useMemo(() => {
    return options.filter((option) => values.includes(option.value));
  }, [options, values]);

  return (
    <Listbox value={values} onChange={onChange} multiple>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full bg-[#202123] cursor-default rounded-lg py-3 pl-3 pr-10 text-left focus:outline-none">
          <span className="block truncate">
            {selected.map((op) => op.label).join(", ") || placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 bg-[#232426] mt-1 max-h-80 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "font-medium" : "text-white"
                  }`
                }
                value={option.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "text-primary" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
