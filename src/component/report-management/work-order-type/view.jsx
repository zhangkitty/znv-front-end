import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import Header from './jsx/header';
import List1 from './jsx/list1';
import { defaultState } from './reducers';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init({ defaultState }));
  }
  render() {
    const { ready } = this.props;
    if (!ready) {
      return (
        <div>
          <Header {...this.props} />
          <List1 {...this.props} />
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
  chooseValue: PropTypes.string,
};

const stateToProp = state => state['report-management/work-order-type'];
export default connect(stateToProp)(Container);
