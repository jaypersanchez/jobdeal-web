export default function JobAddressTag({ address }: { address: string }) {
  return (
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
      <span className="text-[12px]">{address}</span>
    </div>
  );
}
