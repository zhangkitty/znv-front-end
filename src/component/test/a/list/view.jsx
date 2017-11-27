/**
 * Created by zhanyaqi on 2017/9/7.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import Header from './components/header';
import List from './components/list';
import { defaultState } from './reducers';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(defaultState));
  }
  render() {
    const props = this.props;
    if (!props.ready) {
      return (
        <div>
          <Header {...props} />
          <List {...props}/>
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
};

const stateToProp = state => state['test/a/list'];
export default connect(stateToProp)(Container);
