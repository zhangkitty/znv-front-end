import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';

class Container extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(init(props));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      const {
        dataSource: {
          transEntitys,
          deviceId,
          repairDetail: {
            itemName,
            propertyName,
            address,
            area,
            city,
            faultType,
            resultDesc,
          },
        },
      } = this.props;
      const columns = [{
        title: '时间',
        dataIndex: 'transTime',
        key: 'transTime',
      }, {
        title: '操作用户',
        dataIndex: 'staffName',
        key: 'staffName',
      }, {
        title: '操作内容',
        dataIndex: 'busiNodeDesc',
        key: 'busiNodeDesc',
      }];

      return (
        <div>
          <h1>工单信息</h1>
          <div style={{ display: 'flex' }}>
            <span style={{ flexBasis: 100, textAlign: 'right', marginRight: 10 }}>设备编码:</span>
            <span>{deviceId}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ flexBasis: 100, textAlign: 'right', marginRight: 10 }}>项目名称:</span>
            <span>{itemName}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ flexBasis: 100, textAlign: 'right', marginRight: 10 }}>物业类型:</span>
            <span>{propertyName}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ flexBasis: 100, textAlign: 'right', marginRight: 10 }}>省市区:</span>
            <span>{`${city}${area}`}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ flexBasis: 100, textAlign: 'right', marginRight: 10 }}>详细地址:</span>
            <span>{address}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ flexBasis: 100, textAlign: 'right', marginRight: 10 }}>故障类型:</span>
            <span>{faultType}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ flexBasis: 100, textAlign: 'right', marginRight: 10 }}>处理结果:</span>
            <span>{resultDesc}</span>
          </div>
          <hr />
          <h1>操作日志</h1>
          <Table
            dataSource={transEntitys}
            columns={columns}
            pagination={false}
          />
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }
}


const stateToProp = state => state['trouble-ticket-xinchao/trouble-ticket-xinchao-detail'];
export default connect(stateToProp)(Container);
