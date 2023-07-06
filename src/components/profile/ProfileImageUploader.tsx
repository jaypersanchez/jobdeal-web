import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useApi } from "@/contexts/ApiContext";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../shared/Loading";

interface Props {
  onUploaded: () => void;
  onImageChange: (blob: string) => void;
  userId: number;
}

export default function ProfileImageUploader({
  userId,
  onUploaded,
  onImageChange,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { api } = useApi();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return;
      }

      setLoading(true);

      try {
        const file = acceptedFiles[0];
        onImageChange(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        await api.patchForm(`/users/${userId}`, formData);

        toast.success("Updated Profile Image", {
          id: "profile-avatar",
        });
        onUploaded();
      } catch (err) {
        console.error(err);
        toast.error("Failed to update the profile");
      }
      setLoading(false);
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

  return (
    <div {...getRootProps()}>
      <button
        type="button"
        disabled={loading}
        className="w-[300px] h-[48px] border-primary border primary-gradient-text rounded-sm font-semibold disabled:border-none disabled:text-white flex justify-center items-center"
        onClick={open}
      >
        {loading ? <LoadingSpinner size={8} /> : "Change Profile Picture"}
      </button>
      <input {...getInputProps()} />
    </div>
  );
}
