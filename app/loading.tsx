export default function Loading() {
  return (
    <div className="bg-[#110c1f] text-gray-200 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
