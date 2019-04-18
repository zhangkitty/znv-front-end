import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import Header from './jsx/header';
import Left from './jsx/left';
import List from './jsx/list';
import styles from './style.css';


class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(this.props));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      return (

        <div className={styles.all}>
          <Left {...this.props} />
          <div style={{ width: '100%', marginRight: 10 }}>
            <Header {...this.props} />
            <hr style={{ marginTop: 10, marginBottom: 10 }} />
            <List {...this.props} />
          </div>
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

const stateToProp = state => state['data-statistics-xinchao/trouble-ticket-xinchao'];
export default connect(stateToProp)(Container);
