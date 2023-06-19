import JobCard from "../shared/JobCard";
import JobCategories from "./JobCategories";

export default function JobsList() {
  return (
    <div className="bg-[#17181A] py-8">
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
              <JobCard background="#202123" imageSize={200} />
              <JobCard background="#202123" imageSize={200} />
              <JobCard background="#202123" imageSize={200} />
              <JobCard background="#202123" imageSize={200} />
              <JobCard background="#202123" imageSize={200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
