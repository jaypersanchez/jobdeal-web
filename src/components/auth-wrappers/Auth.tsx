"use client";

import React, { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth({ children }: PropsWithChildren) {
  const { loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : redirect("/login");
}
