import NavLayout from "@/components/layouts/NavLayout";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <NavLayout>{children}</NavLayout>;
}
