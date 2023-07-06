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

const Profile = () => {
  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { api } = useApi();

  const { register, handleSubmit, setValue } = useForm<Partial<IUser>>();

  const onSubmit = async (data: Partial<IUser>) => {
    setLoading(true);

    try {
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

  useEffect(() => {
    setValue("firstName", user?.firstName || "");
    setValue("lastName", user?.lastName || "");
    setValue("address", user?.address || "");
    setValue("email", user?.email || "");
    setValue("title", user?.title || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const name = useMemo(
    () =>
      ((user?.firstName || "") + " " + (user?.lastName || "")).trim() ||
      "Unnamed",
    [user?.firstName, user?.lastName]
  );

  return (
    <>
      {loading && <OverlayLoading />}
      <form
        className="flex flex-col md:flex-row gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="basis-2/3">
          <p className="font-medium text-[32px]">My Profile</p>
          <div className="flex flex-col sm:flex-row gap-12 mt-8 text-[#cccccc]">
            <ProfileImageUploader
              userId={user?.id || 0}
              image={user?.avatar || ""}
              onUploaded={() => null}
            />
            <div>
              <p className="font-medium text-[22px] flex items-center">
                <span className="text-white">{name}</span>
                <span className="ml-2 text-[18px] ">
                  ({user?.title || "No title"})
                </span>
              </p>
              <div className="flex items-center gap-2 mt-4">
                <MapPinIcon className="w-6 h-6" />
                <span className="text-[14px] ">
                  {user?.address || "No Address"}
                </span>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <span className="text-white text-[18px] mt-1">9.0/10</span>
                <StarRating value={4.0} />
              </div>
              <div className="mt-2 text-[#999]">
                Completed 750 jobs on Jobdeal
              </div>
              <div className="mt-8">
                <label htmlFor="bio" className="font-semibold">
                  Bio
                </label>
                <div className="mt-2 mb-1 flex justify-center items-center gap-4">
                  <textarea
                    id="bio"
                    className="w-full"
                    placeholder="Nadia"
                    {...register("timezone")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/3 text-[#ccc]">
          <p className="mt-6 font-medium text-[24px]">Edit Profile</p>
          <p className="mt-2 text-[14px]">
            Update your personal information here
          </p>
          <div className="mt-8">
            <label htmlFor="firstName" className="text-[14px]">
              First Name
            </label>
            <div className="mt-2 mb-1 flex justify-center items-center gap-4">
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
            <div className="mt-2 mb-1 flex justify-center items-center gap-4">
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
            <div className="mt-2 mb-1 flex justify-center items-center gap-4">
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
            <div className="mt-2 mb-1 flex justify-center items-center gap-4">
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
            <div className="mt-2 mb-1 flex justify-center items-center gap-4">
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
          <button className="rounded primary-background px-4 py-3 text-black mt-8 font-semibold">
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
