import React from 'react';
import { connect } from 'react-redux';
import List from './jsx/list';
import { init } from './action';
import ErrorModal from './jsx/error-modal';

class Container extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(init(this.props));
  }
  render() {
    return (
      <div>
        <List {...this.props} />
        <ErrorModal {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['qa-task-xinchao/qa-plan-xinchao-edit'];
export default connect(stateToProp)(Container);
