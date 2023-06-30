/* eslint-disable @next/next/no-img-element */
import {
  ArrowUpTrayIcon,
  MapPinIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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

function ImageUploader({ onAccept, preview, onRemove }: any) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return;
      }
      const file = acceptedFiles[0];
      onAccept(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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

  return preview ? (
    <>
      <img src={preview} alt="" width={"100%"} className="rounded" />
      <button
        className="absolute top-2 right-2 text-primary"
        onClick={() => onRemove()}
        type="button"
      >
        <XMarkIcon className="w-5 h-5" strokeWidth={3} />
      </button>
    </>
  ) : (
    <div
      className="w-full pb-[100%] rounded relative uploader"
      {...getRootProps()}
    >
      <Image src={PlaceHolderImg} fill sizes="100vw" alt="" />

      <div
        className="opacity-0 hover:opacity-50 rounded-lg bg-black absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center cursor-pointer"
        onClick={open}
      >
        <ArrowUpTrayIcon className="w-10" />
      </div>
      <input {...getInputProps()} />
    </div>
  );
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

  const handleUploadImage = (file: File) => {
    setPreviews((v) => {
      const index = v.findIndex((item) => !item);
      v[index] = URL.createObjectURL(file);
      console.log(v);
      return v;
    });
    console.log(watch("files"));
    setValue("files", [...watch("files"), file]);
  };

  const removeImage = (index: number) => {
    const files = watch("files");

    setValue(
      "files",
      files.filter((file) => file !== files[index])
    );
    const newPreviews = previews.filter((p) => p !== previews[index]);
    newPreviews.push("");
    setPreviews(newPreviews);
  };

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

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {previews.map((p, index) => (
            <div key={index} className="basis-1/2 relative overflow-hidden">
              <ImageUploader
                preview={p}
                onRemove={() => removeImage(index)}
                onAccept={(file: File) => handleUploadImage(file)}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="primary-background mt-4 mb-2 py-4 w-full dark:text-black rounded font-semibold"
      >
        Post Job
      </button>
      <button
        type="button"
        className="block sm:hidden bg-[#202123] mt-2 mb-2 py-4 w-full dark:text-white rounded"
      >
        Cancel
      </button>
    </form>
  );
}
