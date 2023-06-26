"use client";

import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

import WhiteLogo from "./WhiteLogo";
import { useAuth } from "@/contexts/AuthContext";
import { Fragment } from "react";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const NAV_LINKS = [
  {
    text: "Find a Job",
    link: "/",
  },
  {
    text: "Hire someone",
    link: "/",
  },
  {
    text: "How It Works",
    link: "/",
  },
  {
    text: "About Us",
    link: "/",
  },
  {
    text: "Partners",
    link: "/",
  },
];

export default function TopBar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-[#1B1D1E]">
      <div className="flex py-8 items-center justify-between max-w-7xl mx-auto px-4">
        <WhiteLogo />
        <div className="flex gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.text} href={link.link}>
              {link.text}
            </Link>
          ))}
        </div>
        {user ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button>
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
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#232426] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-[2px]">
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
        ) : (
          <div>
            <Link href="/login">
              <button className="primary-gradient-border p-2 px-4 rounded text-white font-semibold">
                <span className="relative primary-gradient-text">Login</span>
              </button>
            </Link>
            <Link href="/signup">
              <button className="primary-background p-2 px-4 rounded text-black font-semibold ml-2">
                <span className="relative">Create Account</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
