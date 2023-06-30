import { MapPinIcon } from "@heroicons/react/24/outline";

export default function JobAddressTag({ address }: { address: string }) {
  return (
    <div
      className="text-white px-6 py-2 flex items-center gap-2 w-full sm:w-auto text-center"
      style={{
        background:
          "linear-gradient(97.24deg, rgba(123, 220, 181, 0.06) 10.19%, rgba(0, 208, 132, 0.06) 63.33%)",
        backdropFilter: "blur(48.9375px)",
        borderRadius: "2.25px",
      }}
    >
      <MapPinIcon className="w-4 h-4" />
      <span className="text-[12px] mt-[3px]">{address}</span>
    </div>
  );
}
