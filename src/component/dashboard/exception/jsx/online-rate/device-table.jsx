import React from 'react';
import styles from './style.css';
import { Radio } from 'antd';
import { DatePicker, Table } from 'shineout';
import assign from 'object-assign';
import { getDevicedetail } from '../../action';


const RadioGroup = Radio.Group;

const DeviceTable = (props) => {
  const { dispatch } = props;
  const {
    onlineRate: {
      deviceTable: {
        imensiond, choosedData, showType, chooseType, dataSource,
      },
    },
  } = props;

  const { node } = props;
  const len = node.id.split('.').length;

  const columns = [
    {
      title: '人员',
      render: 'executorName',
    },
    {
      title: '设备名称',
      render: 'deviceName',
    },
    {
      title: '地区',
      render: 'areaName',
    },
    {
      title: '地址',
      render: 'address',
    },
    {
      title: '广告机当前状态',
      render: d => (d.deviceOnlineStatus ? '在线' : '离线'),
    },
    {
      title: 'FSU当前状态',
      render: d => (d.fsuOnlineStatus ? '在线' : '离线'),
    },
  ];

  const newColumns = (len > 3 && node.person === true) ? columns.slice(1) : columns;


  return (
    <div>
      <h3 style={{ marginLeft: 20 }}>明细数据</h3>

      <div className={styles.firstLine}>
        <div className={styles.firstTips}>请选择日期维度:</div>
        <RadioGroup
          data-bind="onlineRate.deviceTable.choosedImensiond"
        >
          {
            imensiond.map(v => <Radio value={v.value} disabled={v.disabled}>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>

      <div className={styles.secendLine}>
        <div className={styles.secendTips}>请选择日期:</div>
        <DatePicker
          placeholder="Select date"
          clearable={false}
          value={choosedData}
          onChange={v => dispatch(getDevicedetail(assign({}, props, {
            onlineRate: assign({}, props.onlineRate, {
              deviceTable: assign({}, props.onlineRate.deviceTable, {
                choosedData: v,
              }),
            }),
          })))}
        />
      </div>

      <div className={styles.thirdLine}>
        <div className={styles.thirdTips}>请选择指标:</div>
        <RadioGroup
          value={chooseType}
          onChange={e => dispatch(getDevicedetail(assign({}, props, {
            onlineRate: assign({}, props.onlineRate, {
              deviceTable: assign({}, props.onlineRate.deviceTable, {
                chooseType: e.target.value,
              }),
            }),
          })))}
        >
          {
            showType.map(v => <Radio value={v.value}>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>

      <Table
        style={{ marginTop: 10 }}
        striped
        bordered
        keygen="id"
        width={1500}
        columns={newColumns}
        data={dataSource}
      />


    </div>
  );
};

export default DeviceTable;
