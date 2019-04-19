import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import List from './jsx/list';

class Container extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>
        <List {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['inspection-task-xinchao/template-edit'];
export default connect(stateToProp)(Container);
