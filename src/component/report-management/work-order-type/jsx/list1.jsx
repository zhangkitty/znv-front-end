import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import Page from 'shein-lib/pagination';
import {
  changePage,
  changePageSize,
  changeValue,
} from '../action';

const List1 = (props) => {
  const {
    list,
    dataLoading,
    dispatch,
    total,
    page,
    pageSize,
  } = props;
  const columns = [
    {
      title: '城市',
      dataIndex: '',
      width: 80,
    },
    {
      title: '资产类型',
      dataIndex: '',
      width: 80,
    },
    {
      title: '每种工单类型的工单数',
      dataIndex: '',
      width: 100,
    },
  ];
  return (
    <div>
      <Table
        bordered
        rowKey="id"
        columns={columns}
      />

      <Page
        total={total}
        onChange={(pageValue) => {
          dispatch(changeValue('page', pageValue));
          dispatch(changePage(Object.assign({}, props, {
            page: pageValue,
            pageSize,
          })));
        }}
        onShowSizeChange={(current, size) => {
          dispatch(changeValue('pageSize', size));
          dispatch(changePageSize(Object.assign({}, props, {
            page: current,
            pageSize: size,
          })));
        }}
        current={page}
        pageSize={pageSize}
      />

    </div>
  );
};

List1.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List1;
