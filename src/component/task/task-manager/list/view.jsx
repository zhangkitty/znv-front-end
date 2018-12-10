import React from 'react';
import { connect } from 'react-redux';
import Header from './jsx/header';
import List from './jsx/list';
import { init } from './action';


class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header {...this.props} />
        <List {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['task/task-manager/list'];
export default connect(stateToProp)(Container);
