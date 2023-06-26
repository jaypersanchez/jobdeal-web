import { useEffect, useState } from "react";
import JobCard from "../shared/JobCard";
import JobCategories from "./JobCategories";
import { useApi } from "@/contexts/ApiContext";
import { IJob } from "@/types";
import { LoadingSection } from "../shared/Loading";

export default function JobsList() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const { api } = useApi();
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<IJob[]>("/jobs");
      setJobs(data.map(item => ({
        ...item,
        images: item.images.map(image => `${process.env.NEXT_PUBLIC_API_URL}/${image}`)
      })));
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
    <div className="bg-[#131416] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4 text-[36px] font-semibold">
          Available Jobs Near you
        </div>

        <div className="flex gap-12">
          <div className="flex-basis-[300px]">
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
