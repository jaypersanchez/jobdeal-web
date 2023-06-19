import Image from "next/image";
import Link from "next/link";
import LogoGreenImage from "@/assets/images/logo-green.png";

export default function WhiteLogo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-4">
        <Image src={LogoGreenImage} alt="" />
        <p className="text-[24px] font-semibold">JOBDEAL</p>
      </div>
    </Link>
  );
}
