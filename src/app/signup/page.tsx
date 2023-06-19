"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import LoginBackImage from "@/assets/images/login-back-image.png";
import BlackLogo from "@/components/shared/BlackLogo";

export default function Signup() {
  const router = useRouter();

  return (
    <div className="min-h-[100vh] flex flex-col lg:flex-row">
      <div className="primary-background py-16 lg:basis-full px-8">
        <div className="max-w-3xl lg:max-w-2xl mx-auto">
          <BlackLogo />
          <p className="mt-16 text-[28px] lg:text-[43px] font-semibold">
            Get hired in your locality.
          </p>
          <p className="font-medium mt-4">
            Browse through our categories and find your niche. <br />
            The “Manual Jobs” section gives you gigs you can easily do and get
            paid. Skilled or not
          </p>
          <div className="flex gap-3 mt-8">
            <div className="bg-[#202123] rounded-full w-[52px] h-[11px]" />
            <div className="bg-[#202123] opacity-50 rounded-full w-[11px] h-[11px]" />
            <div className="bg-[#202123] opacity-50 rounded-full w-[11px] h-[11px]" />
          </div>
          <div className="flex mt-8 justify-center relative">
            <Image src={LoginBackImage} alt="" />
            <div
              className="absolute h-[131px] w-[431px]  opacity-10 rounded-full"
              style={{
                right: 0,
                transform: "rotate(-15deg)",
                background:
                  "linear-gradient(89.02deg, rgba(1, 18, 12, 0) 18.65%, #17181A 103.42%)",
              }}
            />
            <div
              className="absolute h-[131px] w-[431px]  opacity-10 rounded-full"
              style={{
                bottom: 0,
                left: 0,
                transform: "rotate(165deg)",
                background:
                  "linear-gradient(89.02deg, rgba(1, 18, 12, 0) 18.65%, #17181A 103.42%)",
              }}
            />
          </div>
        </div>
      </div>
      <div className="lg:basis-full py-24 px-8 dark:bg-black dark:text-white">
        <div className="max-w-3xl lg:max-w-2xl mx-auto">
          <h3 className=" text-[28px] lg:text-[43px] font-semibold">
            Create a new account
          </h3>
          <p className="text-gray-500 mt-6">
            This should only take a minute. But if you already have an account{" "}
            <br />
            you can just go ahead and{" "}
            <Link
              href="/login"
              className="primary-gradient-text text-[21px] font-bold"
            >
              Log in
            </Link>
          </p>

          <form className="mt-8 w-full lg:w-4/6">
            <label htmlFor="email">Email Address</label>
            <div className="mt-2 mb-6">
              <input
                id="email"
                type="email"
                placeholder="Your email address"
                className="w-full"
              />
            </div>

            <label htmlFor="password">Set a password</label>
            <div className="mt-2 mb-6">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full"
              />
            </div>

            <label htmlFor="confirm_password">Confirm your password</label>
            <div className="mt-2 mb-8">
              <input
                id="confirm_password"
                type="password"
                placeholder="Password confirmation"
                className="w-full"
              />
            </div>

            <button
              type="submit"
              className="primary-background py-4 w-full dark:text-black rounded font-semibold"
              onClick={(e) => {
                e.preventDefault();
                router.push("/onboarding");
              }}
            >
              Create an account
            </button>

            <p className="text-center my-3">Or</p>

            <button className="w-full rounded py-4 primary-gradient-border">
              <div className="relative flex items-center gap-2 justify-center">
                Continue with Google{" "}
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.1133 12.4666H13.8866V16.1066H22.5666C22.1266 21.1866 17.8999 23.3599 13.8999 23.3599C8.79327 23.3599 4.31327 19.3333 4.31327 13.6666C4.31327 8.19992 8.57994 3.97325 13.9133 3.97325C18.0333 3.97325 20.4466 6.59992 20.4466 6.59992L22.9799 3.95992C22.9799 3.95992 19.7266 0.333252 13.7799 0.333252C6.20661 0.333252 0.353271 6.73325 0.353271 13.6666C0.353271 20.3999 5.85994 26.9999 13.9799 26.9999C21.1133 26.9999 26.3133 22.1066 26.3133 14.8799C26.3133 13.3466 26.1133 12.4666 26.1133 12.4666Z"
                    fill="url(#paint0_linear_1_1322)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_1322"
                      x1="13.3333"
                      y1="0.333252"
                      x2="13.3333"
                      y2="26.9999"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#43DF9B" />
                      <stop offset="1" stop-color="#3DBAB5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
