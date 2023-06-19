import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function JobPostingForm() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="rounded-xl bg-[#17181A] pt-8 px-4 md:px-12 pb-4 dark:text-white">
      <div className="flex justify-between">
        <p className="font-medium text-[20px]">Create a Job Posting</p>
        <button>
          <XMarkIcon className="w-8 h-8" />
        </button>
      </div>
      <form className="mt-8">
        <div>
          <label htmlFor="title">Give this job a title</label>
          <div className="mt-2 mb-1">
            <input id="title" className="w-full" />
          </div>
          <p className="opacity-50 font-light text-[14px] ml-2">
            Please shorten the title to a maximum of 10 words.
          </p>
        </div>
        <div className="mt-4">
          <label htmlFor="description">Describe what you want done</label>
          <div className="mt-2 mb-1">
            <textarea id="description" className="w-full" rows={3} />
          </div>
          <p className="opacity-50 font-light text-[14px] ml-2">
            Keep it brief and understandable, include relevant details so
            freelancers can understand you.
          </p>
        </div>
        <div className="mt-4">
          <label htmlFor="images">Upload images (Optional)</label>
          <div
            className="mt-2 mb-2 py-10 border-dashed rounded-md border-gray-600 border-2"
            {...getRootProps()}
          >
            <input id="images" {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <PhotoIcon className="w-16 text-gray-500" />
                <div>
                  <p>
                    Drop your image(s) here, or{" "}
                    <button
                      type="button"
                      className="primary-gradient-text font-semibold"
                    >
                      upload from your device
                    </button>
                  </p>
                  <p className="opacity-50 font-light text-[14px]">
                    Max of 4 images. Supports png, jpg
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="primary-background mt-4 mb-2 py-4 w-full dark:text-black rounded font-semibold"
        >
          Send a Message to this Client
        </button>
      </form>
    </div>
  );
}
