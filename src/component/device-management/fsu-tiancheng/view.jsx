import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import { defaultState } from './reducers';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init({ defaultState }));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <div>
          sdafafa
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

const stateToProp = state => state['device-management/fsu-tiancheng'];
export default connect(stateToProp)(Container);
