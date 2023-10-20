export default function Skeleton() {
  return Array(4)
    .fill((index) => (
      <div className="w-full" key={index}>
        <div className="flex gap-4 pb-0 px-5 pt-4 xs:px-0">
          <div className="w-[96px] h-[96px] xs:w-[70px] xs:h-[70px] xs:shrink-0 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="h-[16px] w-[50%] xs:w-[75%] bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex justify-between">
              <div className="h-[16px] w-[120px] bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-[16px] w-[300px] xs:hidden bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div className="h-[16px] w-[100px] bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
        <div className="flex gap-4 pb-5 px-5 xs:px-0 pt-3">
          <div className="w-[96px] h-[60px] xs:hidden"></div>
          <div className="flex flex-1 justify-between items-center">
            <div className="w-[200px] xs:w-[150px] h-[18px] bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex gap-4 xs:pr-4">
              <div className="w-[120px] h-[30px] bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="w-[120px] h-[30px] xs:hidden bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    ))
    .map((item, index) => item(index));
}
