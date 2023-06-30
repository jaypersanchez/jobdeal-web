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

  const [applied, setApplied] = useState(job.applied);

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
          className="w-full sm:min-w-[200px] sm:w-auto rounded"
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
        <div className="flex justify-between items-center mt-8 flex-col sm:flex-row gap-4">
          <JobAddressTag address={job.address} />
          <button
            className="primary-background p-2 rounded font-semibold text-[14px] text-black w-full sm:w-auto"
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply Now"}
          </button>
        </div>
        {apply && (
          <ApplyToJobDialog
            job={job}
            onClose={() => setApply(false)}
            onApply={() => {
              setApplied(true);
              setApply(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
