import { IOption } from "@/types";
import { useState } from "react";
import OptionButtons from "../shared/OptionButtons";
import JobPostingDialog from "../shared/JobPostingDialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

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
  const [text, setText] = useState("");
  const { user } = useAuth();

  const handleAction = () => {
    if (tab === 0) {
      if (!user) {
        toast.error("Please login first", {
          id: "login-first",
          icon: <ExclamationTriangleIcon className="w-6 h-6" />,
        });
        return;
      }
      setOpenJobPosting(true);
    }
  };

  return (
    <div>
      {/* <OptionButtons
        options={OPTIONS}
        value={tab}
        onChange={(op) => setTab(op.value)}
        highlight
      /> */}
      <div className="mt-2 relative">
        <input
          className="w-full py-3 pl-2 pr-2 md:pr-20"
          placeholder={
            tab === 0 ? "What's the job you want done?" : "Find a job"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="primary-background px-3 py-2 rounded-sm md:absolute right-1 top-1 text-black font-semibold w-full md:w-auto"
          onClick={handleAction}
        >
          {tab === 0 ? "Post a Job" : "Find a job"}
        </button>
      </div>
      <JobPostingDialog
        title={text}
        open={openJobPosting}
        onClose={() => setOpenJobPosting(false)}
      />
    </div>
  );
}
