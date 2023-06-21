import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import OverlayLoading from "../shared/OverlayLoading";

export default function UnAuthWrapper({ children }: PropsWithChildren) {
  const { loading, user } = useAuth();

  if (loading) {
    return <OverlayLoading />;
  }

  return user ? redirect("/") : children;
}
