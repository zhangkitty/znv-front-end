import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import { defaultState } from './reducers';
import Left from './jsx/left';
import Right from './jsx/right';
import styles from './style.css';


class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(defaultState));
  }
  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div
        className={styles.all}
      >
        <Left {...this.props} />
        <Right {...this.props} />
      </div>
    );
  }
}


const stateToProp = state => state['authority-management/role-management'];
export default connect(stateToProp)(Container);
