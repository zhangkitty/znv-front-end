import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { getOrgTree } from './action';
import Left from './jsx/left';
import Right from './jsx/right';
import styles from './style.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(getOrgTree(props));
  }


  render() {
    const {
      ready,
      clickedId,
      clickedOrgLevel,
      dispatch,
    } = this.props;
    if (ready) {
      return (
        <div className={styles.all}>
          <Left {...this.props} />
          <Right {...this.props} />
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

const stateToProp = state => state['system-management/user-management'];
export default connect(stateToProp)(Container);
