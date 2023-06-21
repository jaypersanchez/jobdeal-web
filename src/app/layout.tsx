import "./globals.css";
import { Raleway } from "next/font/google";
import RenderContexts from "./contexts";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "JobDeal",
  description: "JobDeal MVP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${raleway.className} dark:bg-[#131416]`}>
        <RenderContexts>{children}</RenderContexts>
      </body>
    </html>
  );
}
