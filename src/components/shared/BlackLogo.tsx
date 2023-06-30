import Image from "next/image";
import Link from "next/link";
import LogoBlackImage from "@/assets/images/logo-black.png";

export default function BlackLogo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-4">
        <Image src={LogoBlackImage} alt="" />
        <p className="text-[27px] hidden md:block font-semibold">
          JOBDEAL
        </p>
      </div>
    </Link>
  );
}
