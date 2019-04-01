import React from 'react';
import { connect } from 'react-redux';
import Header from './jsx/header';
import { init } from './action';
import List from './jsx/list';


class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(this.props));
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


const stateToProp = state => state['assets-management/QR-Code-query'];
export default connect(stateToProp)(Container);
