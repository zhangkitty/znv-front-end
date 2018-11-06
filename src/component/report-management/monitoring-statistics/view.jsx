import React from 'react';
import PropTypes from 'prop-types';
import Page from 'shein-lib/pagination';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init, changePage, changePageSize, changeValue } from './action';
import Header from './jsx/header';
import List1 from './jsx/list1';
import List2 from './jsx/list2';

class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(this.props));
  }
  render() {
    const {
      ready,
      chooseValue,
      total,
      dispatch,
      page,
      pageSize,
      submitChooseValue,
    } = this.props;
    if (ready) {
      return (
        <div>
          <Header {...this.props} />
          {
            +submitChooseValue === 1 && <List1 {...this.props} />

          }
          {
            +submitChooseValue === 2 && <List2 {...this.props} />

          }
          <Page
            total={total}
            onChange={(pageValue) => {
              dispatch(changeValue('page', pageValue));
              dispatch(changePage(Object.assign({}, this.props, {
                page: pageValue,
                pageSize,
              })));
            }}
            onShowSizeChange={(current, size) => {
              dispatch(changeValue('pageSize', size));
              dispatch(changePageSize(Object.assign({}, this.props, {
                page: current,
                pageSize: size,
              })));
            }}
            current={page}
            pageSize={pageSize}
          />
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

const stateToProp = state => state['report-management/monitoring-statistics'];
export default connect(stateToProp)(Container);
