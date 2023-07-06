import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { LoadingSection } from "../shared/Loading";
import JobCard from "../shared/JobCard";
import JobCategories from "./JobCategories";
import { useApi } from "@/contexts/ApiContext";
import { IJob } from "@/types";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function JobsList() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const { api } = useApi();
  const [loading, setLoading] = useState(true);
  const q = useSearchParams();

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const params: any = {};

      q.get("category") && (params.categoryid = q.get("category"));

      const { data } = await api.get<IJob[]>("/jobs", {
        params,
      });
      setJobs(
        data.map((item) => ({
          ...item,
          images: item.images.map(
            (image) => `${process.env.NEXT_PUBLIC_API_URL}/${image}`
          ),
          applied: item.applicants?.length > 0,
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
  }, [q.get("category")]);

  return (
    <div className="bg-[#1B1D1E] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4 text-[24px] md:text-[36px] font-semibold">
          Available Jobs Near you
        </div>

        <div className="flex gap-12 flex-col lg:flex-row">
          <div className="visible lg:hidden w-full p-2 bg-[#1B1D1E] rounded-sm">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex bg-[#1B1D1E] w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span>Categories</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-10 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-10 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <JobCategories />
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
          <div className="hidden lg:block flex-basis-[300px]">
            <JobCategories />
          </div>
          <div className="flex-grow">
            <div className="flex justify-end mb-2">
              <button>Filter Search</button>
            </div>
            <div className="flex flex-col gap-4 relative">
              {!loading && !jobs.length && (
                <p className="bg-[#202123] rounded py-8 text-center">No Data</p>
              )}
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
    </div>
  );
}
