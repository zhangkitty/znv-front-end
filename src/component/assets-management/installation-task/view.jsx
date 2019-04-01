import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { init } from './action';
import Header from './jsx/header';


class Container extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(init(this.props));
  }

  render() {
    const { ready } = this.props;

    if (ready) {
      return (
        <div>
          <Header {...this.props} />
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }
}


const stateToProp = state => state['assets-management/installation-task'];
export default connect(stateToProp)(Container);
