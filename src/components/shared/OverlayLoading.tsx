import { LoadingSpinner } from "./Loading";

export default function OverlayLoading() {
  return (
    <div className="z-10 fixed top-0 left-0 bottom-0 right-0 bg-opacity-70 bg-black flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
