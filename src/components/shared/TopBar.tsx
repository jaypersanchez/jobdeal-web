import Link from "next/link";
import WhiteLogo from "./WhiteLogo";

const NAV_LINKS = [
  {
    text: "Find a Job",
    link: "/",
  },
  {
    text: "Hire someone",
    link: "/",
  },
  {
    text: "How It Works",
    link: "/",
  },
  {
    text: "About Us",
    link: "/",
  },
  {
    text: "Partners",
    link: "/",
  },
];

export default function TopBar() {
  return (
    <div className="bg-[#17181A]">
      <div className="flex py-8 items-center justify-between max-w-7xl mx-auto px-4">
        <WhiteLogo />
        <div className="flex gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.text} href={link.link}>
              {link.text}
            </Link>
          ))}
        </div>
        <div>
          <Link href="/login">
            <button className="primary-gradient-border p-2 px-4 rounded text-white font-semibold">
              <span className="relative primary-gradient-text">Login</span>
            </button>
          </Link>
          <Link href="/signup">
            <button className="primary-background p-2 px-4 rounded text-black font-semibold ml-2">
              <span className="relative">Create Account</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
