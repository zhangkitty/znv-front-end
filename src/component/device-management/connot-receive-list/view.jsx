import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import Header from './jsx/header';
import TableList from './jsx/list';
import { init } from './action';

class Container extends React.Component {
  constructor(props) {
    super();
    console.log(13241);
    props.dispatch(init(props));
  }


  render() {
    const { ready } = this.props;
    if (ready === false) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      );
    }

    return (

      <div>
        <Header {...this.props} />
        <TableList {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['device-management/connot-receive-list'];
export default connect(stateToProp)(Container);
