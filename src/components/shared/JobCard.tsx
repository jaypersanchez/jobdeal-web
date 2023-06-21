import Image from "next/image";
import Link from "next/link";

interface Props {
  background?: string;
  imageSize?: number;
}

export default function JobCard({ background, imageSize = 300 }: Props) {
  return (
    <div
      className={`rounded-xl bg-[${
        background || "#17181A"
      }] p-3 flex flex-col md:flex-row gap-4 items-stretch`}
    >
      <div
        className="basis-full rounded"
        style={{
          aspectRatio: "1/1",
          backgroundImage: `url(${`https://picsum.photos/300/300`})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="px-3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mt-3">
            <div className="text-white text-[18px] font-semibold">
              Pickup Truck Needed for IKEA Delivery
            </div>
            <div className="primary-gradient-text text-[18px] font-semibold rounded">
              $100
            </div>
          </div>
          <div className="mt-4 opacity-50 text-white text-[12px]">
            {`I recently purchased some furniture from IKEA and require assistance
            with its delivery to my apartment. If you have a pickup truck and can
            help transport the furniture, please get in touch. Compensation will
            be provided for your time and effort. Contact me with your
            availability and let's make this delivery a breeze!`}
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div
            className="text-white px-6 py-3 flex items-center gap-2"
            style={{
              background:
                "linear-gradient(97.24deg, rgba(123, 220, 181, 0.06) 10.19%, rgba(0, 208, 132, 0.06) 63.33%)",
              backdropFilter: "blur(48.9375px)",
              borderRadius: "2.25px",
            }}
          >
            <svg
              width="8"
              height="11"
              viewBox="0 0 8 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.125 1.18762C2.26172 1.18762 0.75 2.51584 0.75 4.15171C0.75 6.03402 3 9.01693 3.82617 10.0472C3.86047 10.0907 3.90541 10.1261 3.95735 10.1505C4.00928 10.1749 4.06673 10.1876 4.125 10.1876C4.18327 10.1876 4.24072 10.1749 4.29265 10.1505C4.34459 10.1261 4.38953 10.0907 4.42383 10.0472C5.25 9.01736 7.5 6.03553 7.5 4.15171C7.5 2.51584 5.98828 1.18762 4.125 1.18762Z"
                stroke="white"
                strokeWidth="0.865427"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.125 5.40637C4.74632 5.40637 5.25 4.87672 5.25 4.30316C5.25 3.72961 4.74632 3.26465 4.125 3.26465C3.50368 3.26465 3 3.72961 3 4.30316C3 4.87672 3.50368 5.40637 4.125 5.40637Z"
                stroke="white"
                strokeWidth="0.865427"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[12px]">Storgatan 123, 123 45 Stockholm</span>
          </div>
          <Link href="/onboarding/hire">
            <button className="primary-background p-2 rounded font-semibold text-[14px] text-black">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
