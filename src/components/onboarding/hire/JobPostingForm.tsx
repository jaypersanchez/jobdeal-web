/* eslint-disable @next/next/no-img-element */
import { MapPinIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "react-hot-toast";

import MapLocationSelection from "./MapLocationSelection";
import MultiSelectBox from "@/components/shared/MultiSelectBox";
import { useData } from "@/contexts/DataContext";
import PlaceHolderImg from "@/assets/images/placeholder-image.png";
import { useApi } from "@/contexts/ApiContext";
import OverlayLoading from "@/components/shared/OverlayLoading";

interface Inputs {
  title: string;
  description: string;
  price: number;
  lat: number;
  lng: number;
  address: string;
  categoryIds: number[];
  files: File[];
}

interface Props {
  title: string;
  onSubmit?: () => void;
}

export default function JobPostingForm({
  title,
  onSubmit: onPostingSubmit,
}: Props) {
  const [previews, setPreviews] = useState<string[]>(["", "", "", ""]);
  const { categories } = useData();
  const [showMap, setShowMap] = useState(false);
  const { api } = useApi();
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return;
      }
      const file = acceptedFiles[0];

      const emptyIndex = previews.findIndex((p) => !p);

      if (emptyIndex === -1) {
        toast.error("You can upload only max 4 images");
        return;
      }

      const newPreviews = [...previews];
      newPreviews[emptyIndex] = URL.createObjectURL(file);

      setPreviews(newPreviews);
      setValue("files", [...watch("files"), file]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previews]
  );

  const removeImage = (index: number) => {
    const files = watch("files");
    const newFiles = files.filter((file) => file !== files[index]);
    setValue("files", newFiles);

    const newPreviews = previews.filter((p) => p !== previews[index]);
    newPreviews.push("");
    setPreviews(newPreviews);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/jpg": [],
    },
    useFsAccessApi: false,
    noClick: true,
    multiple: false,
  });

  const { register, setValue, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title,
      categoryIds: [],
      files: [],
    },
  });

  const handleChangeLocation = ({ lng, lat }: { lng: number; lat: number }) => {
    setShowMap(false);
    setValue("lat", lat);
    setValue("lng", lng);
  };

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    const formdata = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files" || key === "categoryIds") {
        return;
      }
      formdata.append(key, (data as any)[key]);
    });

    data.files.forEach((file) => {
      formdata.append("files", file);
    });

    data.categoryIds.forEach((id) => {
      formdata.append("categoryIds", id.toString());
    });

    setLoading(true);

    try {
      const { data } = await api.postForm("/jobs", formdata);
      // toast.success("The job has been posted successfully.");
      onPostingSubmit && onPostingSubmit();
    } catch (err) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      {loading && <OverlayLoading />}
      <div>
        <label htmlFor="title">Give this job a title</label>
        <div className="mt-2 mb-1">
          <input
            id="title"
            className="w-full"
            {...register("title", {
              required: true,
            })}
          />
        </div>
        <p className="opacity-50 font-light text-[14px] ml-2">
          Please shorten the title to a maximum of 10 words.
        </p>
      </div>
      <div className="mt-8">
        <label htmlFor="description">Describe what you want done</label>
        <div className="mt-2 mb-1">
          <textarea
            id="description"
            className="w-full"
            rows={3}
            {...register("description", {
              required: true,
            })}
          />
        </div>
        <p className="opacity-50 font-light text-[14px] ml-2">
          Keep it brief and understandable, include relevant details so
          freelancers can understand you.
        </p>
      </div>
      <div className="mt-8">
        <label htmlFor="Categories">Categories</label>
        <div className="mt-2 mb-1">
          <MultiSelectBox
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            values={watch("categoryIds")}
            onChange={(v) => setValue("categoryIds", v as number[])}
            placeholder="Select Categories"
          />
        </div>
      </div>
      <div className="mt-8">
        <label htmlFor="price">Price ($)</label>
        <div className="mt-2 mb-1 flex justify-center items-center gap-4">
          <input
            id="price"
            className="w-full"
            type="number"
            placeholder="3000"
            {...register("price", {
              required: true,
            })}
          />
        </div>
      </div>
      <div className="mt-8">
        <label htmlFor="location">Address</label>
        <div className="mt-2 mb-1 flex justify-center items-center gap-4">
          <input
            id="location"
            className="w-full"
            placeholder="Hong Kong"
            {...register("address", {
              required: true,
            })}
          />
          {/* <div className="flex items-center gap-2">
            <span className="primary-gradient-text font-medium whitespace-nowrap">
              Select location on Map
            </span>
            <button
              onClick={() => setShowMap(true)}
              type="button"
              className="p-3 primary-background rounded text-black"
            >
              <MapPinIcon className="w-6 h-6" />
            </button>
          </div> */}
        </div>
        {/* <p className="opacity-50 font-light text-[14px] ml-2">
          Click the icon to select location on map
        </p> */}
        {/* {showMap && (
          <MapLocationSelection
            onClose={() => setShowMap(false)}
            onChange={handleChangeLocation}
          />
        )} */}
      </div>
      <div className="mt-8">
        <label htmlFor="images">Upload images (Optional)</label>

        <div className="flex gap-2 mt-4 items-start">
          {previews.map((p, index) => (
            <div key={index} className="basis-1/5 relative overflow-hidden">
              {p ? (
                <>
                  <img src={p} alt="" width={"100%"} className="rounded" />
                  <button
                    className="absolute top-2 right-2 text-primary"
                    onClick={() => removeImage(index)}
                    type="button"
                  >
                    <XMarkIcon className="w-5 h-5" strokeWidth={3} />
                  </button>
                </>
              ) : (
                <div className="w-full pb-[100%] rounded">
                  <Image src={PlaceHolderImg} fill sizes="100vw" alt="" />
                </div>
              )}
            </div>
          ))}

          <div
            className="basis-1/5 rounded overflow-hidden flex justify-center items-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {watch("files")?.length < 4 && (
              <button
                type="button"
                onClick={open}
                className="flex justify-center items-center text-gray-500 pt-[20%]"
              >
                <PlusIcon className="w-[50%]" />
              </button>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="primary-background mt-4 mb-2 py-4 w-full dark:text-black rounded font-semibold"
      >
        Post Job
      </button>
    </form>
  );
}
