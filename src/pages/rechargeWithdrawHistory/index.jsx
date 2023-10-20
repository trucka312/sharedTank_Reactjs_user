import { useState } from 'react';

import { Tabs } from 'antd';
import RosePurse from './child/RosePurse.jsx';
import ShareholderWallet from './child/ShareholderWallet.jsx';
import Mana from './child/Mana.jsx';

const WithdrawalHistory = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Ví hoa hồng',
      children: <RosePurse />,
    },
    {
      key: '2',
      label: 'Ví cổ đông',
      children: <ShareholderWallet />,
    },
    {
      key: '3',
      label: 'Mana',
      children: <Mana />,
    },
  ];

  function getWeek() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // Ngày trong tuần (0 - Chủ Nhật, 1 - Thứ Hai, ..., 6 - Thứ Bảy)
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Số ngày để đến ngày đầu tuần
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(diff);
  
    // Định dạng ngày đầu tuần
    const year = firstDayOfWeek.getFullYear();
    const month = (firstDayOfWeek.getMonth() + 1).toString().padStart(2, '0');
    const day = firstDayOfWeek.getDate().toString().padStart(2, '0');
    const firstDayFormatted = `${year}-${month}-${day}`;
  
    // Định dạng ngày hôm nay
    const todayYear = currentDate.getFullYear();
    const todayMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const todayDay = currentDate.getDate().toString().padStart(2, '0');
    const todayFormatted = `${todayYear}-${todayMonth}-${todayDay}`;
  
    return { firstDayOfWeek: firstDayFormatted, today: todayFormatted };
  }
  
  // Sử dụng hàm
  const { firstDayOfWeek, today } = getWeek();
  console.log("Ngày đầu tuần:", firstDayOfWeek);
  console.log("Ngày hôm nay:", today);

  return (
    <div className="bg-white p-[30px] gap-[26px] rounded-[8px]  ">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="middle" />
    </div>
  );
};

export default WithdrawalHistory;
