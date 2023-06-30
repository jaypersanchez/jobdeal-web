import { Gallery } from "react-grid-gallery";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { IJob } from "@/types";
import Dialog from "./Dialog";
import JobAddressTag from "./JobAddressTag";
import { useApi } from "@/contexts/ApiContext";
import OverlayLoading from "./OverlayLoading";

interface Props {
  job: IJob;
  onClose: () => void;
  onApply?: () => void;
}

interface FormInputs {
  price: number;
  coverLetter: string;
}

export default function ApplyToJobDialog({ job, onClose, onApply }: Props) {
  const [showGallery, setShowGallery] = useState(false);
  const { register, handleSubmit } = useForm<FormInputs>();
  const [loading, setLoading] = useState(false);
  const { api } = useApi();
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);

    try {
      await api.post(`jobs/${job.id}/apply`, data);
      toast.success("Message has been sent.");
      onApply && onApply();
    } catch (err) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const setImageSizes = async () => {
    const imgs = await Promise.all(
      job.images.map((image) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve(img);
          };
          img.src = image;
        });
      })
    );
    setImages(imgs);
  };

  useEffect(() => {
    setImageSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job]);

  return (
    <Dialog width="lg" open onClose={onClose} title={job.title}>
      {loading && <OverlayLoading />}
      <p className="mt-8 text-sm md:text-base whitespace-pre-line">{job.description}</p>
      <div className="flex justify-between items-end sm:items-center mt-12 flex-col sm:flex-row gap-4">
        <JobAddressTag address={job.address} />
        {job.images?.length > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-primary font-semibold">See All pictures</span>
            <button
              className="rounded p-6"
              style={{
                background: `url(${job.images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => {
                setShowGallery(true);
              }}
            />
          </div>
        )}
      </div>
      <div className="border-b border-gray-700 my-10" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="price">Bid</label>
          <div className="relative mt-2">
            <input
              id="price"
              type="number"
              className="rounded pl-8 text-right w-full sm:w-auto"
              {...register("price", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <span className="absolute left-4 top-4">$</span>
          </div>
        </div>
        <div className="mt-12">
          <label htmlFor="coverletter">
            Let this person know you are available
          </label>
          <div className="mt-2 mb-1">
            <textarea
              id="coverletter"
              className="w-full"
              rows={6}
              placeholder="Hello, I'd love to help out, I'm 5 minutes away...."
              {...register("coverLetter", {
                required: true,
              })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="primary-background mt-4 mb-2 py-4 w-full dark:text-black rounded font-semibold"
        >
          Send a Message to this Client
        </button>
      </form>
      <Dialog
        open={showGallery}
        width="lg"
        onClose={() => setShowGallery(false)}
        title=""
        padding={1}
        hidePanel
      >
        <div>
          {images.length > 0 && (
            <Gallery
              images={images.map((image) => ({
                src: image.src,
                width: image.width,
                height: image.height,
              }))}
              rowHeight={400}
              enableImageSelection={false}
            />
          )}
        </div>
      </Dialog>
    </Dialog>
  );
}
