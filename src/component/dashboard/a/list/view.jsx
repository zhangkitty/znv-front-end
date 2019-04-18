import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import Header from './jsx/header';
import List from './jsx/list';
import { defaultState } from './reducers';
import styles from './style.css';
import { Popover, Button } from 'shineout';


class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init({ defaultState }));
  }
  render() {
    const { ready } = this.props;
    if (!ready) {
      return (
        <div>
          <Header {...this.props} />
          <List {...this.props} />
          <Popover content="sdaff" trigger="click" style={{ marginRight: 12 }}>
            <Button onClick={() => console.log('indexppp')}>Click me</Button>
          </Popover>

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

const stateToProp = state => state['dashboard/a/list'];
export default connect(stateToProp)(Container);
