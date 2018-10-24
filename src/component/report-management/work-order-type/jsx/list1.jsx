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
      render: () => ('广告机'),
    },
    {
      title: '每种工单类型的工单数',
      width: 100,
      render: 'incrOrder',
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
