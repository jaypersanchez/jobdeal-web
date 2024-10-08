import { PropsWithChildren } from "react";
import TopBar from "../shared/TopBar";
import Footer from "../shared/Footer";

export default function NavLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen dark:text-white">
      <TopBar />
      <main className="py-12 max-w-7xl mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
}
