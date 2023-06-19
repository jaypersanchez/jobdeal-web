"use client";

import Image from "next/image";
import LogoBlackImage from "@/assets/images/logo-black.png";
import JobPostingForm from "@/components/onboarding/hire/JobPostingForm";
import Link from "next/link";

export default function Onboarding() {
  return (
    <div className="min-h-[100vh] primary-background py-16 lg:basis-full px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src={LogoBlackImage} alt="" />
            <p className="text-[27px] font-semibold">JOBDEAL</p>
          </div>
        </Link>

        <p className="mt-24 text-[28px] lg:text-[43px] font-semibold">
          {"Hire reliable hands in minutes!"}
        </p>
        <p className="font-medium mt-4">
          {`You can easily post jobs and hire the right hands to handle your tasks.`}
          <br />
          {`Jobdeal is built with to help you easily find the help you need.`}
          <br />
          {`Simply describe what you want done, and upload pictures if any.`}
        </p>
        <div className="flex gap-3 mt-8">
          <div className="bg-[#202123] opacity-50 rounded-full w-[11px] h-[11px]" />
          <div className="bg-[#202123] rounded-full w-[52px] h-[11px]" />
          <div className="bg-[#202123] opacity-50 rounded-full w-[11px] h-[11px]" />
        </div>
        <div className="relative mt-16">
          <div
            className="absolute w-full flex justify-center"
            style={{ top: -14, left: 0, zIndex: 0 }}
          >
            <div className="bg-[#202123] opacity-50 rounded-xl h-[114px] w-4/5"></div>
          </div>
          <div
            className="absolute w-full flex justify-center"
            style={{ top: -24, left: 0, zIndex: 0 }}
          >
            <div className="bg-[#202123] opacity-20 rounded-xl h-[114px] w-3/4"></div>
          </div>
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
          <div className="flex flex-col gap-3 max-w-3xl mx-auto relative">
            <JobPostingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
