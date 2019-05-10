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
            faultDesc,
            resultDesc,
          },
        },
      } = this.props;
      const columns = [{
        title: '时间',
        dataIndex: 'transTime',
        key: 'transTime',
        width: 200,
      }, {
        title: '操作用户',
        dataIndex: 'staffName',
        key: 'staffName',
        width: 200,
      }, {
        title: '操作内容',
        dataIndex: 'busiNodeDesc',
        key: 'busiNodeDesc',
        width: 200,
      }];

      return (
        <div>
          <h1>工单信息</h1>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <span
              style={{
 flexBasis: 100, textAlign: 'left', marginRight: 20, marginLeft: 20,
}}
            >设备编码:
            </span>
            <span style={{ fontWeight: 'bold' }}>{deviceId}</span>
          </div>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <span style={{
 flexBasis: 100, textAlign: 'left', marginRight: 20, marginLeft: 20,
}}
            >项目名称:
            </span>
            <span style={{ fontWeight: 'bold' }}>{itemName}</span>
          </div>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <span style={{
 flexBasis: 100, textAlign: 'left', marginRight: 20, marginLeft: 20,
}}
            >物业类型:
            </span>
            <span style={{ fontWeight: 'bold' }}>{propertyName}</span>
          </div>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <span style={{
 flexBasis: 100, textAlign: 'left', marginRight: 20, marginLeft: 20,
}}
            >省市区:
            </span>
            <span style={{ fontWeight: 'bold' }}>{`${city}${area}`}</span>
          </div>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <span style={{
 flexBasis: 100, textAlign: 'left', marginRight: 20, marginLeft: 20,
}}
            >详细地址:
            </span>
            <span style={{ fontWeight: 'bold' }}>{address}</span>
          </div>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <span style={{
 flexBasis: 100, textAlign: 'left', marginRight: 20, marginLeft: 20,
}}
            >故障类型:
            </span>
            <span style={{ fontWeight: 'bold' }}>{faultDesc}</span>
          </div>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <span style={{
 flexBasis: 100, textAlign: 'left', marginRight: 20, marginLeft: 20,
}}
            >处理结果:
            </span>
            <span style={{ fontWeight: 'bold' }}>{resultDesc}</span>
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
