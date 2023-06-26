import { useState } from "react";
import { toast } from "react-hot-toast";

import { IJob } from "@/types";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import JobAddressTag from "./JobAddressTag";
import ApplyToJobDialog from "./ApplyToJobDialog";
import { useAuth } from "@/contexts/AuthContext";
interface Props {
  background?: string;
  imageSize?: number;
  job: IJob;
}

export default function JobCard({ background, job }: Props) {
  const [apply, setApply] = useState(false);
  const { user } = useAuth();

  const handleApply = () => {
    if (!user) {
      toast.error("Please login first", {
        id: "login-first",
        icon: <ExclamationTriangleIcon className="w-6 h-6" />,
      });
      return;
    }
    setApply(true);
  };

  return (
    <div
      className={`rounded-xl bg-[${
        background || "#17181A"
      }] p-3 flex flex-col md:flex-row gap-4 items-start`}
    >
      {job.images.length && (
        <div
          className="min-w-[200px] rounded"
          style={{
            aspectRatio: "1/1",
            backgroundImage: `url(${job.images[0]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      )}
      <div className="flex-grow px-3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mt-3">
            <div className="text-white text-[18px] font-semibold">
              {job.title}
            </div>
            <div className="primary-gradient-text text-[18px] font-semibold rounded">
              ${job.price}
            </div>
          </div>
          <div
            className="mt-4 opacity-50 text-white text-[12px]"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              boxOrient: "vertical",
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              WebkitLineClamp: 6,
              lineClamp: 6,
              minHeight: 50,
            }}
          >
            {job.description}
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <JobAddressTag address={job.address} />
          <button
            className="primary-background p-2 rounded font-semibold text-[14px] text-black"
            onClick={handleApply}
            disabled={job.applied}
          >
            {job.applied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
        {apply && (
          <ApplyToJobDialog job={job} onClose={() => setApply(false)} />
        )}
      </div>
    </div>
  );
}
