import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import LineChart from './jsx/lineChart';
import Head from './jsx/header';
import Left from './jsx/left';
import Left1 from './jsx/left1';

class Container extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(init(props));
  }


  render() {
    const {
      ready,
    } = this.props;
    if (1) {
      return (
        <div>
          <Left1 {...this.props} />
          {/* <Left {...this.props} /> */}
          <LineChart {...this.props} />
          <Head {...this.props} />
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

const stateToProp = state => state['dashboard/exception'];
export default connect(stateToProp)(Container);
