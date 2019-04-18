import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import List from './jsx/list';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(this.props));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <List {...this.props} />
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }
}


const stateToProp = state => state['inspection-task-xinchao/template-edit'];
export default connect(stateToProp)(Container);
