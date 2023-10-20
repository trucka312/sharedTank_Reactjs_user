
export default function ReviewSkeleton() {
  return Array(2).fill((index) => (
    <div key={index} className="p-4 flex gap-2">
        <div>
          <div className="w-[48px] h-[48px] rounded-full bg-gray-200 animate-pulse "></div>
        </div>
        <div>
        <div className='flex justify-between items-center mb-[8px]'>
            <div className='h-[18px] w-[150px] bg-gray-200 animate-pulse rounded-lg'></div>
        </div>
        <div className='h-[16px] w-[130px] bg-gray-200 animate-pulse rounded-lg mb-5'></div>
        <div className='h-[16px] w-[500px] bg-gray-200 animate-pulse rounded-lg '></div>
        </div>
    </div>
  )).map((item, index) => item(index));
}
