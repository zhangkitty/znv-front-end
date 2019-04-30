import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import List from './jsx/list';
import MyModal from './jsx/modal';
import ErrorModal from './jsx/error-modal';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(this.props));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <div>
          <List {...this.props} />
          <MyModal {...this.props} />
          <ErrorModal {...this.props} />
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


const stateToProp = state => state['inspection-task-xinchao/template'];
export default connect(stateToProp)(Container);
