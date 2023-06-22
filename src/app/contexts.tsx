"use client";

import ApiProvider from "@/contexts/ApiContext";
import AuthProvider from "@/contexts/AuthContext";
import DataProvider from "@/contexts/DataContext";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export default function RenderContexts({ children }: PropsWithChildren) {
  return (
    <>
      <AuthProvider>
        <ApiProvider>
          <DataProvider>{children}</DataProvider>
        </ApiProvider>
      </AuthProvider>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "rounded-sm",
          style: {
            borderRadius: 4,
            background: "#202123",
            color: "white",
            padding: "10px 24px",
          },
        }}
      />
    </>
  );
}
