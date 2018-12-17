import React from 'react';
import { connect } from 'react-redux';
import Test1 from './jsx/header';


class Container extends React.Component {
  render() {
    return (
      <div>
        <Test1 {...this.props} />

      </div>

    );
  }
}

const stateToProp = state => state['dashboard/xxxx/list'];
export default connect(stateToProp)(Container);
