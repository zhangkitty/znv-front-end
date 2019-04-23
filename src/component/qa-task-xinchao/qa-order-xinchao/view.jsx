import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import Header from './jsx/header';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(this.props));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <div>
          <Header {...this.props} />
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

const stateToProp = state => state['inspection-task-xinchao/qa-order-xinchao'];
export default connect(stateToProp)(Container);