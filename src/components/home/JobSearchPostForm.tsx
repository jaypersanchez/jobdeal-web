import { IOption } from "@/types";
import { useState } from "react";
import OptionButtons from "../shared/OptionButtons";
import JobPostingDialog from "../shared/JobPostingDialog";

const OPTIONS: IOption[] = [
  {
    value: 0,
    label: "I want to hire someone",
  },
  {
    value: 1,
    label: "I’m looking for a job",
  },
];

export default function JobSearchPostForm() {
  const [tab, setTab] = useState<number | string>(0);
  const [openJobPosting, setOpenJobPosting] = useState(false);

  const handleAction = () => {
    if (tab === 0) {
      setOpenJobPosting(true);
    }
  };

  return (
    <div>
      <OptionButtons
        options={OPTIONS}
        value={tab}
        onChange={(op) => setTab(op.value)}
        highlight
      />
      <div className="mt-2 relative">
        <input
          className="w-full py-3 pl-2 pr-20"
          placeholder={
            tab === 0 ? "What's the job you want done?" : "Find a job"
          }
        />
        <button
          className="primary-background px-3 py-2 rounded-sm absolute right-1 top-1 text-black font-semibold"
          onClick={handleAction}
        >
          {tab === 0 ? "Post a Job" : "Find a job"}
        </button>
      </div>
      <JobPostingDialog
        open={openJobPosting}
        onClose={() => setOpenJobPosting(false)}
      />
    </div>
  );
}
