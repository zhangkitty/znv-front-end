import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init, search } from './action';
import List from './jsx/list';
import ModalError from './jsx/modal-error';

class Container extends React.Component {
  componentWillMount() {
    console.log('mdzz-sb');
    const { dispatch } = this.props;
    dispatch(search(this.props));
  }

  render() {
    return (
      <div>
        <List {...this.props} />
        <ModalError {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['inspection-task-xinchao/template-edit'];
export default connect(stateToProp)(Container);
