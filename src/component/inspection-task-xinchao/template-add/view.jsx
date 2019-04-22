import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init, search } from './action';
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


const stateToProp = state => state['inspection-task-xinchao/template-add'];
export default connect(stateToProp)(Container);
