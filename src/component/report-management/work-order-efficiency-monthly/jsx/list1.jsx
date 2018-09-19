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
      title: '累计工单',
      dataIndex: '',
      width: 100,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '新增工单',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '关闭工单',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '超时关闭',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '完成率',
      width: 140,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '及时关闭率',
      width: 150,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '未关闭',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '超时关闭',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '平均处理时长',
      width: 120,
      fixed: 'left',
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
