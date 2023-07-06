import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { NAV_LINKS } from "./nav_links";
import Link from "next/link";

export default function MobileNav() {
  return (
    <Menu as="div" className="relative inline-block lg:hidden text-left">
      <Menu.Button className="mt-1">
        <Bars3Icon className="w-6" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-[99] right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#232426] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-[2px] divide-y divide-gray-300">
            {NAV_LINKS.map((link) => (
              <Link href={link.link} key={link.text}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "opacity-50 text-primary" : "text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                    >
                      {link.text}
                    </button>
                  )}
                </Menu.Item>
              </Link>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
