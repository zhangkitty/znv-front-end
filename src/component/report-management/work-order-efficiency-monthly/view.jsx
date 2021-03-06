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
      formData,
      dispatch,
      total,
      page,
      pageSize,
      submitTrue,
      submitChooseValue,
    } = this.props;
    if (ready) {
      return (
        <div>
          <Header {...this.props} />
          {
            +submitChooseValue === 1 && submitTrue && <List1 {...this.props} />
          }
          {
            +submitChooseValue === 2 && submitTrue && <List2 {...this.props} />
          }
          {
            submitTrue &&
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
          }

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

const stateToProp = state => state['report-management/work-order-efficiency-monthly'];
export default connect(stateToProp)(Container);
