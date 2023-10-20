export default function SkeletonPopup() {
  return Array(3)
    .fill((index) => (
      <div key={index} className="px-2 py-4 w-[400px]">
        <div className="flex justify-between items-center mb-[8px]">
          <div className="h-[18px] w-[150px] bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        <div className="h-[16px] w-[250px] bg-gray-200 animate-pulse rounded-lg mb-2"></div>
        <div className="h-[16px] w-[100px] bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    ))
    .map((item, index) => item(index));
}
