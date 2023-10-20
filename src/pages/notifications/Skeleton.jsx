export default function Skeleton() {
  return Array(4).fill((index) => (
    <div key={index} className="p-4 xs:py-2">
        <div className='flex justify-between items-center mb-[8px]'>
            <div className='h-[18px] xs:h-[16px] w-[250px] xs:w-[60%] bg-gray-200 animate-pulse rounded-lg'></div>
            <div className='h-[32px] w-[120px] xs:hidden bg-gray-200 animate-pulse rounded-lg'></div>
        </div>
        <div className='h-[16px] xs:h-[14px] w-[500px] xs:w-[80%] bg-gray-200 animate-pulse rounded-lg mb-2'></div>
        <div className='h-[16px] xs:h-[12px] w-[150px] xs:w-[100px] bg-gray-200 animate-pulse rounded-lg'></div>
    </div>
  )).map((item, index) => item(index));
}
