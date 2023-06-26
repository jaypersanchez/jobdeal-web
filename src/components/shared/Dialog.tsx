import { Transition, Dialog as HeadlessDialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string | ReactNode;
  width?: "md" | "xl" | "lg" | "2xl" | "3xl" | "4xl";
  hideTitle?: boolean;
  padding?: number;
  hidePanel?: boolean;
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
  width = "md",
  hideTitle = false,
  padding = 12,
  hidePanel = false,
}: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 bg-black bg-opacity-70`}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={`w-full max-w-screen-${width} transform overflow-hidden rounded-xl ${
                  hidePanel ? "" : "bg-[#17181A]"
                } px-4 md:px-${padding} pb-4 dark:text-white text-left align-middle shadow-xl transition-all`}
              >
                {!hideTitle && (
                  <HeadlessDialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    <div className="flex justify-between pt-10">
                      <p className="font-medium text-[20px]">{title}</p>
                      <button onClick={onClose}>
                        <XMarkIcon className="w-8 h-8" />
                      </button>
                    </div>
                  </HeadlessDialog.Title>
                )}
                <div className="mt-2">{children}</div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}
