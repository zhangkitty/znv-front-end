import React from 'react';
import { connect } from 'react-redux';
import Header from './jsx/header';
import Content from './jsx/content';


class Container extends React.Component {
  componentWillMount() {

  }
  render() {
    return (
      <div>
        <Header {...this.props} />
        <Content {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['assets-management/QR-Code-generation'];
export default connect(stateToProp)(Container);
