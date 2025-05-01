export function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-amber-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-amber-900 font-medium">Loading the pyramids...</p>
      </div>
    </div>
  )
}
