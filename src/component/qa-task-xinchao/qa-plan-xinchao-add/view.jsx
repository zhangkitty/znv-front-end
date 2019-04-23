import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { search } from './action';
import List from './jsx/list';
import MyModal from './jsx/modal';

class Container extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(search(this.props));
  }
  render() {
    return (
      <div>
        <List {...this.props} />
        <MyModal {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['qa-task-xinchao/qa-plan-xinchao-add'];
export default connect(stateToProp)(Container);
