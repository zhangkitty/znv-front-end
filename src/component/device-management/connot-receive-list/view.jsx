import React from 'react';
import { connect } from 'react-redux';
import TableList from './jsx/list';
import { init } from './action';

class Container extends React.Component {
  constructor(props) {
    super();
    console.log(13241);
    props.dispatch(init(props));
  }


  render() {
    return (
      <div>
        <TableList {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['device-management/connot-receive-list'];
export default connect(stateToProp)(Container);
