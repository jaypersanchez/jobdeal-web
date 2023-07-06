import Image from "next/image";
import Link from "next/link";
import LogoGreenImage from "@/assets/images/logo-green.png";

export default function WhiteLogo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-4">
        <Image src={LogoGreenImage} alt="" />
        <p className="text-[24px] hidden md:block font-semibold">
          JOBDEAL <span className="primary-gradient-text">(BETA)</span>
        </p>
      </div>
    </Link>
  );
}
