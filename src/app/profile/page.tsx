"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MapPinIcon } from "@heroicons/react/24/outline";

import AuthWrapper from "@/components/auth-wrappers/Auth";
import OverlayLoading from "@/components/shared/OverlayLoading";
import { useApi } from "@/contexts/ApiContext";
import { useAuth } from "@/contexts/AuthContext";
import { IUser } from "@/types";
import StarRating from "@/components/shared/StarRating";
import ProfileImageUploader from "@/components/profile/ProfileImageUploader";
import PfpPlaceholder from "@/assets/images/avatar_placeholder.png";

const Profile = () => {
  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { api } = useApi();

  const [profileImage, setProfileImage] = useState("");

  const { register, handleSubmit, setValue, watch } = useForm<Partial<IUser>>();

  const onSubmit = async (data: Partial<IUser>) => {
    setLoading(true);

    try {
      delete data.aboutMe;

      await api.patch(`/users/${user?.id}`, data);

      toast.success("Saved", {
        id: "profile-update",
      });
      fetchUser();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update the profile");
    }
    setLoading(false);
  };

  const onUpdateBio = async () => {
    setLoading(true);

    try {
      await api.patch(`/users/${user?.id}`, {
        aboutMe: watch("aboutMe") || "",
      });

      toast.success("Updated Bio", {
        id: "bio-update",
      });
      fetchUser();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update the bio");
    }
    setLoading(false);
  };

  useEffect(() => {
    setValue("firstName", user?.firstName || "");
    setValue("lastName", user?.lastName || "");
    setValue("address", user?.address || "");
    setValue("email", user?.email || "");
    setValue("title", user?.title || "");
    setValue("aboutMe", user?.aboutMe || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const name = useMemo(
    () =>
      ((user?.firstName || "") + " " + (user?.lastName || "")).trim() ||
      "Unnamed",
    [user?.firstName, user?.lastName]
  );

  useEffect(() => {
    setProfileImage(
      user?.avatar ? `${process.env.NEXT_PUBLIC_API_URL}/${user?.avatar}` : ""
    );
  }, [user?.avatar]);

  return (
    <>
      {loading && <OverlayLoading />}
      <form
        className="flex flex-col lg:flex-row gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="basis-full md:basis-2/3">
          <p className="font-medium text-[32px]">My Profile</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 mt-8 text-[#cccccc]">
            <div
              className="rounded-sm overflow-hidden border-2 border-primary w-[300px] h-[300px] relative bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `url(${profileImage || PfpPlaceholder.src})`,
              }}
            />
            <div className="flex flex-col gap-8">
              <div className="order-1">
                <p className="font-medium text-[22px] flex items-center text-white">
                  {name}
                </p>
                <p className="text-[18px] mt-2">
                  ({user?.title || "No title"})
                </p>
              </div>
              <div className="flex items-center gap-2 order-2">
                <MapPinIcon className="w-6 h-6" />
                <span className="text-[14px] ">
                  {user?.address || "No Address"}
                </span>
              </div>
              <div className="order-3">
                <div className="flex items-center gap-6">
                  <span className="text-white text-[18px] mt-1">9.0/10</span>
                  <StarRating value={4.0} />
                </div>
                <div className="mt-2 text-[#999]">
                  Completed 750 jobs on Jobdeal
                </div>
              </div>

              <div className="order-0 sm:order-4">
                <ProfileImageUploader
                  userId={user?.id || 0}
                  onImageChange={(img) => setProfileImage(img)}
                  onUploaded={() => fetchUser()}
                />
                </div>
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="bio" className="font-semibold text-[#999]">
              Bio
            </label>
            <div className="mt-2">
              <textarea
                id="bio"
                className="w-full lg:max-w-2xl"
                rows={6}
                placeholder="Creative designer crafting user-focused products with style and functionality. Bringing innovation to life through captivating and functional designs."
                {...register("aboutMe")}
              />
            </div>

            <button
              type="button"
              className="rounded primary-background px-4 py-3 text-black mt-6 font-semibold"
              onClick={onUpdateBio}
            >
              Update Bio
            </button>
          </div>
        </div>
        <div className="basis-1/3 text-[#ccc]">
          <p className="mt-6 font-medium text-[24px]">Edit Profile</p>
          <p className="mt-3 text-[14px]">
            Update your personal information here
          </p>
          <div className="mt-8">
            <label htmlFor="firstName" className="text-[14px]">
              First Name
            </label>
            <div className="mt-2 mb-1">
              <input
                id="firstName"
                className="w-full"
                placeholder="Nadia"
                {...register("firstName", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="lastName" className="text-[14px]">
              Last Name
            </label>
            <div className="mt-2 mb-1">
              <input
                id="lastName"
                className="w-full"
                placeholder="Sergey"
                {...register("lastName", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="title" className="text-[14px]">
              Job Title
            </label>
            <div className="mt-2 mb-1">
              <input
                id="title"
                className="w-full"
                placeholder="Frontend Developer"
                {...register("title", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-[14px]">
              Email Address
            </label>
            <div className="mt-2 mb-1">
              <input
                id="email"
                className="w-full"
                type="email"
                disabled
                placeholder="nadiasergeyy@gmail.com"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="location" className="text-[14px]">
              Location
            </label>
            <div className="mt-2 mb-1">
              <input
                id="location"
                className="w-full"
                placeholder="Uppsala, Sweden"
                {...register("address", {
                  required: true,
                })}
              />
            </div>
          </div>
          <button className="rounded primary-background px-4 py-3 text-black mt-6 font-semibold">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

const Page = () => (
  <AuthWrapper>
    <Profile />
  </AuthWrapper>
);

export default Page;
