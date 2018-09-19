import React from 'react';
import Page from 'shein-lib/pagination';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import Header from './jsx/header';
import List1 from './jsx/list1';
import List2 from './jsx/list2';
import { changePage, changePageSize, changeValue, init } from './action';


class Container extends React.Component {
  componentWillMount() {
    this.props.dispatch(init(this.props));
  }
  render() {
    const {
      ready,
      chooseValue,
      dispatch,
      total,
      page,
      pageSize,
    } = this.props;
    if (ready) {
      return (
        <div>
          <Header {...this.props} />
          {
            (+chooseValue === 1) && <List1 {...this.props} />
          }
          {
            (+chooseValue === 2) && <List2 {...this.props} />
          }
          <Page
            total={total}
            onChange={(pageValue) => {
              dispatch(changeValue('page', pageValue));
              dispatch(changePage(Object.assign({}, props, {
                page: pageValue,
                pageSize,
              })));
            }}
            onShowSizeChange={(current, size) => {
              dispatch(changeValue('pageSize', size));
              dispatch(changePageSize(Object.assign({}, props, {
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
  chooseValue: PropTypes.number,
};

const stateToProp = state => state['report-management/asset-receipt'];
export default connect(stateToProp)(Container);
