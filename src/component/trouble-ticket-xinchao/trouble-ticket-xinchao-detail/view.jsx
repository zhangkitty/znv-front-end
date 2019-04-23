import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(this.props));
  }
  render() {
    const { ready } = this.props;
    const {dataSource:{
      deviceId,
    }} = this.props
    if (ready) {
      return (
        <div>
          <h1>工单信息</h1>
          <div style={{ display: 'flex' }}>
            <span>设备编码:</span>
            <span></span>
          </div>
          <div>
            <span>项目名称:</span>
          </div>
          <div>
            <span>物业类型:</span>
          </div>
          <div>
            <span>省市区:</span>
          </div>
          <div>
            <span>详细地址:</span>
          </div>
          <div>
            <span>故障类型:</span>
          </div>
          <div>
            <span>处理结果:</span>
          </div>
          <hr />
          <h1>操作日志</h1>

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

Container.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

const stateToProp = state => state['trouble-ticket-xinchao/trouble-ticket-xinchao-detail'];
export default connect(stateToProp)(Container);
