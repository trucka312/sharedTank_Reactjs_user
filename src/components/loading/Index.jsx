import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Spin />
    </div>
  );
}
