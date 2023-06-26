"use client";

import JobCard from "@/components/shared/JobCard";
import { useEffect, useState } from "react";
import { IJob } from "@/types";
import { useApi } from "@/contexts/ApiContext";
import { LoadingSection } from "@/components/shared/Loading";
import BlackLogo from "@/components/shared/BlackLogo";
import AuthWrapper from "@/components/auth-wrappers/Auth";

const Onboarding = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const { api } = useApi();
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<IJob[]>("/jobs");
      setJobs(
        data.map((item) => ({
          ...item,
          images: item.images.map(
            (image) => `${process.env.NEXT_PUBLIC_API_URL}/${image}`
          ),
        }))
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[100vh] primary-background py-16 lg:basis-full px-8">
      <div className="max-w-4xl mx-auto">
        <BlackLogo />

        <p className="mt-24 text-[28px] lg:text-[43px] font-semibold">
          {"There's a job for you"}
        </p>
        <p className="font-medium mt-4">
          {`We've simplified job search, now you can earn whether you have a remote skill or not.`}
          <br />
          {`Head over to the "Near you Section" and start applying!`}
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
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                background="#202123"
                imageSize={200}
                job={job}
              />
            ))}
            {loading && <LoadingSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

const Wrapper = () => (
  <AuthWrapper>
    <Onboarding />
  </AuthWrapper>
);

export default Wrapper;
