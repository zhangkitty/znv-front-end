import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import Header from './jsx/header';
import List from './jsx/list';


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init(this.props));
  }

  render() {
    const { ready } = this.props;
    if (ready) {
      return (

        <div>
          <Header {...this.props} />
          <List {...this.props} />
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

const stateToProp = state => state['data-statistics-xinchao-company/inspection-order-xinchao'];
export default connect(stateToProp)(Container);
