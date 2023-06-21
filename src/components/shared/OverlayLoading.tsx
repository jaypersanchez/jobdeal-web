export default function OverlayLoading() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-opacity-50 bg-white flex items-center justify-center">
      <div className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    </div>
  );
}
