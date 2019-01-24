import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { init } from './action';
import { defaultState } from './reducers';
import Left from './jsx/left'

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(defaultState));
  }
  render() {
    return (
      <div>
        <Left {...this.props}></Left>
      </div>
    );
  }
}


const stateToProp = state => state['authority-management/role-management'];
export default connect(stateToProp)(Container);
