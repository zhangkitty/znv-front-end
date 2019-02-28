import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';
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
    dataSource,
  } = props;
  const columns = [
    {
      title: '城市',
      width: 80,
      render: 'areaName',
    },
    {
      title: '资产类型',
      width: 80,
      render: () => ('被监控设备'),
    },
    {
      title: '市电停电工单数',
      width: 100,
      render: 'powerOffNum',
    },
    {
      title: '监控单元中断工单数',
      width: 100,
      render: 'interruptNum',
    },
  ];
  return (
    <div>
      <Table
        bordered
        genkey="id"
        columns={columns}
        data={dataSource}
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
