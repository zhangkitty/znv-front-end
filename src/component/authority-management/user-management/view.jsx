import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Button } from 'antd';
import { connect } from 'react-redux';
import Dept from './jsx/dept';
import User from './jsx/user';
import AddCustomer from './jsx/addCustomer';
import AddProvince from './jsx/addProvince';
import AddUser from './jsx/addUser';
import AddCity from './jsx/addCity';
import styles from './style.css';
import { changeValue, getDeptTree } from './action';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(getDeptTree(0));
  }
  render() {
    const { ready, dispatch } = this.props;
    if (ready) {
      return (
        <div className={styles.all}>
          <div className={styles.left}>

            <Dept {...this.props} />
          </div>
          <div className={styles.right}>
            <User {...this.props} />
          </div>
          <div />
          <AddCustomer {...this.props} />
          <AddProvince {...this.props} />
          <AddCity {...this.props} />
          <AddUser {...this.props} />
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

Container.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

const stateToProp = state => state['authority-management/user-management'];
export default connect(stateToProp)(Container);
