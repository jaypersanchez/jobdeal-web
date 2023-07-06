"use client";

import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";

import WhiteLogo from "../WhiteLogo";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { NAV_LINKS } from "./nav_links";
import MobileNav from "./MobileNav";

export default function TopBar() {
  const { user, logout } = useAuth();

  const profileImage = useMemo(
    () =>
      user?.avatar
        ? `url(${process.env.NEXT_PUBLIC_API_URL}/${user?.avatar})`
        : "",
    [user?.avatar]
  );

  return (
    <div className="bg-[#1B1D1E] dark:text-white">
      <div className="flex py-8 items-center justify-between max-w-7xl mx-auto px-4">
        <WhiteLogo />
        <div className="gap-8 hidden lg:flex lg:visible">
          {NAV_LINKS.map((link) => (
            <Link key={link.text} href={link.link}>
              {link.text}
            </Link>
          ))}
        </div>
        {user ? (
          <div className="flex items-center gap-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button>
                  {profileImage ? (
                    <div
                      className="overflow-hidden border-2 border-primary rounded-full w-12 h-12 relative bg-no-repeat bg-center bg-cover"
                      style={{
                        backgroundImage: profileImage,
                      }}
                    />
                  ) : (
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <svg
                        className="absolute w-12 h-12 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#232426] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-[2px]">
                    <Link href="/profile">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "opacity-50 text-primary" : "text-white"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <UserCircleIcon className="w-6 h-6 mr-4 ml-2" />
                            Profile
                          </button>
                        )}
                      </Menu.Item>
                    </Link>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "opacity-50 text-primary" : "text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={logout}
                        >
                          <ArrowLeftOnRectangleIcon className="w-6 h-6 ml-2 mr-4" />
                          Log out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <MobileNav />
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <Link href="/login">
              <button className="hidden lg:block primary-gradient-border p-2 px-4 rounded text-white font-semibold">
                <span className="relative primary-gradient-text">Login</span>
              </button>
              <span className="block lg:hidden primary-gradient-text font-semibold">
                Login
              </span>
            </Link>
            <Link href="/signup">
              <button className="hidden lg:block primary-background p-2 px-4 rounded text-black font-semibold">
                <span className="relative">Create Account</span>
              </button>
              <span className="block lg:hidden primary-gradient-text font-semibold">
                Sign up
              </span>
            </Link>
            <MobileNav />
          </div>
        )}
      </div>
    </div>
  );
}
