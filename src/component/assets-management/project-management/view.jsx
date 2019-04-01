import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';
import { defaultState } from './reducers';
import Header from './jsx/header';
import List from './jsx/list';
import AddModal from './jsx/addModal';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init({ defaultState }));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <div>
          <Header {...this.props} />
          <List {...this.props} />
          <AddModal {...this.props} />
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


const stateToProp = state => state['assets-management/project-management'];
export default connect(stateToProp)(Container);
