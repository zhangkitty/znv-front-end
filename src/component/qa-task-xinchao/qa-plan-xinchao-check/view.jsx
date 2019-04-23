import React from 'react';
import { connect } from 'react-redux';
import List from './jsx/list';
import { search } from './action';

class Container extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(search(this.props));
  }
  render() {
    return (
      <div>
        <List {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['qa-task-xinchao/qa-plan-xinchao-check'];
export default connect(stateToProp)(Container);
