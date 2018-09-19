import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List1 = (props) => {
  const {
    list,
    dataLoading,
  } = props;
  const columns = [
    {
      title: '运维',
      dataIndex: '',
      width: 80,
      fixed: 'left',
      align: 'center',
    },
    {
      title: '城市',
      dataIndex: '',
      width: 80,
      fixed: 'left',
      align: 'center',
    },
    {
      title: '团队',
      dataIndex: '',
      width: 80,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '1',
    },
    {
      title: '2',
    },
    {
      title: '3',
    },
    {
      title: '当月工单总数',
      dataIndex: '',
      width: 80,
      fixed: 'right',
      align: 'center',
    },
    {
      title: '当月出勤天数',
      dataIndex: '',
      width: 80,
      fixed: 'right',
      align: 'center',
    },
    {
      title: '日均处理数',
      dataIndex: '',
      width: 80,
      fixed: 'right',
      align: 'center',
    },
  ];
  return (
    <div>
      <Table
        bordered
        rowKey="id"
        columns={columns}
        scroll={{ x: 2000 }}
      />
    </div>
  );
};

List1.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List1;
