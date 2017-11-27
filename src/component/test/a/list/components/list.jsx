/**
 * Created by zhanyaqi on 2017/9/7.
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import assign from 'object-assign';
import { Table, Pagination, Button, Modal } from 'antd';
import { Link } from 'react-router';
import {
  changeValue,
  search,
} from '../action';

const List = (props) => {
  const {
    dispatch,
    list,
    dataLoading,
    idList,
    pageIndex,
    pageSizeOptions,
    fromAddTime,
    toAddTime,
    alignedCheckTime,
    recordCount,
  } = props;
  const columns = [{
    title: '入库单号',
    dataIndex: 'inStorageNo',
    width: 100,
  }, {
    title: '生产制单',
    dataIndex: 'produceOrderId',
    width: 100,
  }, {
    title: '生产组',
    dataIndex: 'productionGroup',
    width: 100,
  }];
  return (
    <div>
      <Table
        bordered
        rowKey="id"
        dataSource={list}
        loading={dataLoading}
        columns={columns}
      />
    </div>
  );
};

List.defaultProps = {
  recordCount: 0,
  fromAddTime: null,
  toAddTime: null,
  alignedCheckTime: null,
};

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataLoading: PropTypes.bool.isRequired,
  idList: PropTypes.arrayOf(PropTypes.string).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  recordCount: React.PropTypes.number,
  pageIndex: PropTypes.number.isRequired,
  fromAddTime: PropTypes.instanceOf(moment),
  toAddTime: PropTypes.instanceOf(moment),
  alignedCheckTime: PropTypes.instanceOf(moment),
};

export default List;
