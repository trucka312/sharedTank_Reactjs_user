import { Select, Table } from 'antd';
import  { useState } from 'react';

const RosePurse = () => {
  const [perPage, setPerPage] = useState(20);
  const [time, setTime] = useState();
  const [transaction, setTransaction] = useState();
  const [state, setState] = useState()

  const handlePerPageChange = (value) => {
    setPerPage(value);
  };

  const handleTimeChange = (value) => {
    setTime(value);
  };

  const handleTransactionChange = (value) => {
    setTransaction(value);
  }

  const handleStateChange = (value) => {
    setState(value)
  }

  const columnsTable = [
    {
      title: 'Thời gian',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Nguồn giao dịch',
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
            value={perPage}
            onChange={handlePerPageChange}
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
            placeholder='Tuần này'
            value={time}
            onChange={handleTimeChange}
            options={[
              {
                value: 'thisweek',
                label: 'Tuần này',
              },
              {
                value: 'thismonth',
                label: 'Tháng này',
              },
              {
                value: 'today',
                label: 'Hôm nay',
              },
            ]}
          />
          <Select
            style={{
              width: 180,
              margin: '0 12px',
            }}
            value={transaction}
            placeholder='Nguồn giao dịch'
            onChange={handleTransactionChange}
            options={[
              {
                value: 'All',
                label: 'Tất cả',
              },
              {
                value: 'sell',
                label: 'Từ bán hàng',
              },
              {
                value: 'shreholder',
                label: 'Từ bể đồng chia',
              },
            ]}
            
          />
          <Select
            style={{
              width: 120,
            }}
            value={state}
            placeholder='Trạng thái'
            onChange={handleStateChange}
            options={[
              {
                value: 'done',
                label: 'Đã duyệt',
              },
              {
                value: 'waiting',
                label: 'Chờ duyệt',
              },
              {
                value: 'cancel',
                label: 'Hủy',
              },
            ]}
          />
        </div>
      </div>

      {/* table */}
      <div className="mt-[20px]">
        <Table columns={columnsTable} dataSource={data} className="text-[#cf5763]" />
      </div>
    </div>
  );
};

export default RosePurse;
