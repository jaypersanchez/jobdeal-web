import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import PfpPlaceholder from "@/assets/images/avatar_placeholder.png";
import { useApi } from "@/contexts/ApiContext";
import { toast } from "react-hot-toast";

interface Props {
  image: string;
  onUploaded: () => void;
  userId: number;
}

export default function ProfileImageUploader({
  userId,
  image,
  onUploaded,
}: Props) {
  const [profileImage, setProfileImage] = useState("");
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
        setProfileImage(URL.createObjectURL(file));

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

  useEffect(() => {
    setProfileImage(image ? `${process.env.NEXT_PUBLIC_API_URL}/${image}` : "");
  }, [image]);

  return (
    <div {...getRootProps()}>
      <div
        className="rounded-sm overflow-hidden border-2 border-primary w-[300px] h-[300px] relative bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${profileImage || PfpPlaceholder.src})`,
        }}
      />
      <button
        type="button"
        disabled={loading}
        className="mt-4 px-3 py-2 border-primary border primary-gradient-text rounded-sm font-semibold"
        onClick={open}
      >
        Change Profile Picture
      </button>
      <input {...getInputProps()} />
    </div>
  );
}
