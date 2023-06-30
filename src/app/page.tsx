"use client";

import TopBar from "@/components/shared/TopBar";
import HomeBgImage from "@/assets/images/home-bg.png";
import JobSearchPostForm from "@/components/home/JobSearchPostForm";
import JobsList from "@/components/home/JobsList";

export default function Home() {
  return (
    <main className="min-h-screen dark:text-white relative">
      <TopBar />
      <div className="flex">
        <div className="pt-24 pb-12 mx-auto px-4">
          <div className="font-semibold text-[24px] md:text-[36px] lg:text-[48px] text-center mb-16">
            <p>The Fastest and Most Secure way to</p>
            <p className="primary-gradient-text">get any Job done well.</p>
          </div>
          <JobSearchPostForm />
        </div>
      </div>
      <JobsList />
      <div
        className="absolute top-0 left-0 right-0 bottom-0 mx-auto"
        style={{
          backgroundImage: `url(${HomeBgImage.src})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 80px",
          zIndex: -1,
          WebkitBackgroundSize: "1200px auto",
          backgroundColor: "#17181A",
        }}
      />
    </main>
  );
}
