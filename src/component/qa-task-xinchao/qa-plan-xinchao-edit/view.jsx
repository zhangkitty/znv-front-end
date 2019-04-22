import React from 'react';
import { connect } from 'react-redux';
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


const stateToProp = state => state['qa-task-xinchao/qa-plan-xinchao-edit'];
export default connect(stateToProp)(Container);
