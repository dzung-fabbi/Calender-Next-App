export default function LazyLoading() {
  return (
    <div className="h-[100vh] relative">
      <div className="bg-black/[.1] z-0 absolute inset-0"></div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="z-10 rounded-lg animate-flip w-28 h-28 bg-primary"></div>
      </div>
    </div>
  )
}
