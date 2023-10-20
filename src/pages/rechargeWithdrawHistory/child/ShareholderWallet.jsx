import { Select, Table } from 'antd';
import React, { useState } from 'react';
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

const ShareholderWallet = () => {
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };
  const onChange = (key) => {
    console.log(key);
  };
  const columnsTable2 = [
    {
      title: 'Thời gian',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Số tiền',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Trạng thái',
      key: 'tags',
      dataIndex: 'tags',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div>
      <div className="flex justify-between mt-[30px]">
        <div className="flex justify-between align-middle items-center">
          <span>Hiển thị</span>
          <Select
            className="w-[70px] ml-[12px]"
            value={20}
            onChange={onSecondCityChange}
            options={[
              {
                value: '20',
                label: '20',
              },
              {
                value: '30',
                label: '30',
              },
              {
                value: '50',
                label: '50',
              },
            ]}
          />
        </div>
        <div>
          <Select
            style={{
              width: 120,
            }}
            value={secondCity}
            onChange={onSecondCityChange}
            options={[
              {
                value: 'Tuần này',
                label: 'Tuần này',
              },
              {
                value: 'Tháng này',
                label: 'Tháng này',
              },
              {
                value: 'Hôm nay',
                label: 'Hôm nay',
              },
            ]}
          />
          <Select
            style={{
              width: 120,
              margin: '0 12px',
            }}
            value={secondCity}
            onChange={onSecondCityChange}
            options={cities.map((city) => ({
              label: city,
              value: city,
            }))}
          />
          <Select
            style={{
              width: 120,
            }}
            value={secondCity}
            onChange={onSecondCityChange}
            options={cities.map((city) => ({
              label: city,
              value: city,
            }))}
          />
        </div>
      </div>

      {/* table */}
      <div className="mt-[20px]">
        <Table columns={columnsTable2} dataSource={data} />
      </div>
    </div>
  );
};

export default ShareholderWallet;
