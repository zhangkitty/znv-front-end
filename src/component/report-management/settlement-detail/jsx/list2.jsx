import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const List1 = (props) => {
  const {
    list,
    dataLoading,
    dataSource,
    choosedMonth,
  } = props;

  const columns = [
    {
      title: '人员',
      render: 'name',
    },
    {
      title: '在线记录点位数',
      render: 'onlineNum',
    },
    {
      title: '故障点位数',
      render: 'serviceNum',
    },
    {
      title: '协调点位数',
      render: 'coordinateNum',
    },
    {
      title: '故障点位且在协调流程点位数',
      render: 'serviceCoordinateNum',
    },
    {
      title: '每日设备在线数',
      render: 'onlineTotalNum',
    },
    {
      title: '已交接设备数',
      render: 'handoverNum',
    },
    {
      title: '近20天交接未安装FSU设备数',
      render: 'handoverUninstalNum',
    },
    {
      title: '未安装FSU设备数',
      render: 'uninstalNum',
    },
    {
      title: '当日拆机数',
      render: 'todayDismantleNum',
    },
    {
      title: '运营中设备总数',
      render: 'inoperationTotalNum',
    },
    {
      title: '每日在线率',
      render: 'onlineRate',
    },
  ];


  return (
    <div>
      <Table
        bordered
        keygen="id"
        columns={columns}
        data={dataSource}
        style={{ maxHeight: 400 }}
      />
    </div>
  );
};

List1.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List1;
