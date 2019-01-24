import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import AssetInfo from './jsx/assetInfo';

class Container extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, params: { id } } = this.props;
    console.log(id);
    dispatch(init(this.props, id));
  }

  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <div>
          <AssetInfo {...this.props} />
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


const stateToProp = state => state['device-management/detail-tiancheng'];
export default connect(stateToProp)(Container);
